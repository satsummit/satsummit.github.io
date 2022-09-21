exports.onCreatePage = async ({ page, actions: { deletePage } }) => {
  // Remove sandbox in production.
  if (process.env.NODE_ENV === 'production') {
    if (page.path.match(/^\/sandbox/)) {
      deletePage(page);
    }
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        stream: require.resolve('stream-browserify')
      }
    }
  });
};

const capitalize = (v) => `${v[0].toUpperCase()}${v.slice(1)}`;

// Add custom url pathname for blog posts.
exports.onCreateNode = ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  getNode
}) => {
  // const { createNodeField, createNode, createParentChildLink } = actions;
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const slug = fileNode.name.toLowerCase();
    const nodeType = capitalize(fileNode.sourceInstanceName);

    const nodeProps = {
      published: true,
      ...node.frontmatter,
      cId: slug.replace(/(^\/|\/$)/g, ''),
      slug
    };

    const newNode = {
      ...nodeProps,
      id: createNodeId(`${node.id} >>> ${nodeType}`),
      parent: node.id,
      internal: {
        type: nodeType,
        contentDigest: createContentDigest(nodeProps)
      }
    };
    createNode(newNode);
    createParentChildLink({ parent: node, child: newNode });
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const {
    data: { allLetter, allPeople }
  } = await graphql(`
    query {
      allLetter(filter: { title: { ne: "" } }) {
        nodes {
          slug
        }
      }
      allPeople {
        nodes {
          slug
        }
      }
    }
  `);

  allLetter.nodes.forEach((node) => {
    const { slug } = node;
    actions.createPage({
      path: `/${slug}`,
      component: require.resolve(`./src/templates/letter-page.js`),
      context: { slug }
    });
  });

  allPeople.nodes.forEach((node) => {
    const { slug } = node;
    actions.createPage({
      path: `/speakers/${slug}`,
      component: require.resolve(`./src/templates/people-page.js`),
      context: { slug }
    });
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    `
    type Event implements Node {
      # type
      # people
      title: String!
      date: Date!
      room: String
      people: EventPeople
    }

    type RoleInEvent {
      role: String!
      event: Event
    }
  `,
    schema.buildObjectType({
      name: 'People',
      fields: {
        title: 'String!',
        company: 'String!',
        role: 'String!',
        twitter: 'String',
        avatar: {
          type: 'File',
          extensions: {
            fileByRelativePath: {}
          }
        },
        pronouns: 'String',
        group: {
          type: 'String',
          resolve: (source) => source.group || 'main'
        },

        // Foreign relationship between people and events. This is not a
        // straightforward relation because we need to know what is the role
        // that the person plays in the event.
        events: {
          type: '[RoleInEvent]',
          resolve: async (source, args, context, info) => {
            const results = await Promise.all([
              searchEventForRole('hosts', source.title, context),
              searchEventForRole('moderators', source.title, context),
              searchEventForRole('panelists', source.title, context),
              searchEventForRole('facilitators', source.title, context),
              searchEventForRole('speakers', source.title, context)
            ]);

            return [...results.flat()].sort((a, b) => {
              const dateA = a.event.date;
              const dateB = b.event.date;

              return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
            });
          }
        }
      },
      interfaces: ['Node']
    }),

    // Each event has people associated to it in one of the following roles:
    // hosts, moderators, panelists, facilitators, speakers.
    // Each one of these is a list of people names:
    // people:
    //   hosts:
    //     - name 1
    //     - name 2
    //
    // The names are then used to establish a relationship with the People
    // content-type to be able to link to a person's page.
    // However, there may be names for which there is no page. In these cases we
    // want to display the name as well, but not link it to anywhere. By default
    // Gatsby will return null when a relationship is not found.

    // The ideal solution would be to return a People if found, and leave the
    // name string untouched if the relationship is not found. This would
    // require the return type to be a union between People and String which is
    // not possible because graphQl doesn't allow unions with Scalar types (like
    // String, Boolean).

    // The alternative is to return a union between 2 interfaces:
    // - People for when a relationship if found;
    // - VoidPeople when it is just a name with no relationship.

    // The VoidPeople is just defined by a `isVoid` field and the name of the
    // person under `title`.
    schema.buildObjectType({
      name: 'VoidPeople',
      fields: {
        title: 'String!',
        isVoid: {
          type: 'Boolean',
          resolve: () => true
        }
      }
    }),

    // The union is resolved taking the `isVoid` property into account.
    schema.buildUnionType({
      name: 'PeopleOrVoid',
      types: ['People', 'VoidPeople'],
      resolveType: (value) => (value?.isVoid ? 'VoidPeople' : 'People')
    }),

    // The resolver is the same for each people role. For each entry, search for
    // a relationship. Return it if found, otherwise return the structure of a
    // VoidPeople.
    schema.buildObjectType({
      name: 'EventPeople',
      fields: {
        hosts: eventPeopleResolver('hosts'),
        moderators: eventPeopleResolver('moderators'),
        panelists: eventPeopleResolver('panelists'),
        facilitators: eventPeopleResolver('facilitators'),
        speakers: eventPeopleResolver('speakers')
      }
    })
  ];

  createTypes(typeDefs);
};

/**
 * Search for all the Events where a given person (name), plays the given role
 */
const searchEventForRole = async (role, name, context) => {
  const { entries } = await context.nodeModel.findAll({
    type: 'Event',
    query: {},
    sort: { fields: ['date'], order: ['ASC'] }
  });

  // Since people on the Event type is a Union it is not possible to filter on
  // it. Doing it manually.
  const filtered = Array.from(entries).filter((event) =>
    event.people?.[role]?.includes(name)
  );

  return filtered.map((event) => ({ role, event }));
};

/**
 * For each name, search for a corresponding People object. Return it if found,
 * otherwise map the missing value to a VoidPeople.
 */
const eventPeopleResolver = (role) => {
  return {
    type: '[PeopleOrVoid]',
    resolve: async (source, args, context, info) => {
      if (!source[role]) return [];

      const { entries } = await context.nodeModel.findAll({
        type: 'People',
        query: {
          filter: { title: { in: source[role] } }
        }
      });

      const queryResult = Array.from(entries);

      return source[role].map((title) => {
        return (
          queryResult.find((obj) => obj.title === title) || {
            title,
            isVoid: true
          }
        );
      });
    }
  };
};
