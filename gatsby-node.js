const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreatePage = async ({ page, actions: { deletePage } }) => {
  // Remove sandbox in production.
  if (process.env.NODE_ENV === 'production') {
    if (page.path.match(/^\/sandbox/)) {
      deletePage(page);
    }
    if (page.path.match(/^\/agenda/)) {
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
    const slug = fileNode.name;
    const nodeType = capitalize(fileNode.sourceInstanceName);

    const nodeProps = {
      ...node.frontmatter,
      cId: slug.replace(/(^\/|\/$)/g, ''),
      slug
    };

    // Add a specific field to the Event content type.
    // Same as people but without the relationship. This is needed to get the
    // names of people that don't have a page.
    if (nodeType === 'Event') {
      nodeProps.peopleRaw = nodeProps.people;
    }

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
      allLetter(filter: { slug: { ne: "tickets" } }) {
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
    type EventPeople {
      hosts: [People] @link(by: "title")
      moderators: [People] @link(by: "title")
      panelists: [People] @link(by: "title")
      facilitators: [People] @link(by: "title")
      speakers: [People] @link(by: "title")
    }

    type Event implements Node {
      # type
      # people
      title: String!
      date: Date!
      room: String
      lead: String
      people: EventPeople

      # peopleRaw - same as people but without the relationship. This is needed
      # to get the names of people that don't have a page.
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
    query: {
      filter: {
        people: {
          [role]: {
            elemMatch: { title: { eq: name } }
          }
        }
      }
    }
  });

  return Array.from(entries).map((event) => ({ role, event }));
};
