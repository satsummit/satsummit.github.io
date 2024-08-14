import { generateEventsMDXIndex } from './gatsby-node/events-mdx-index.mjs';
import {
  createEditionPages,
  updateEditionPagesContext
} from './gatsby-node/edition-pages.mjs';
import {
  createEventPeopleRelSchema,
  createEventSchema,
  createLetterSchema,
  createPeopleSchema,
  createSponsorSchema
} from './gatsby-node/schema.mjs';
import { capitalize, pageComponent } from './gatsby-node/utils.mjs';
import { createUpdatesPages } from './gatsby-node/updates-pages.mjs';

export const onCreatePage = async (helpers) => {
  const {
    page,
    actions: { deletePage }
  } = helpers;

  updateEditionPagesContext(helpers);

  // Remove sandbox in production.
  if (process.env.NODE_ENV === 'production') {
    if (page.path.match(/^\/sandbox/)) {
      deletePage(page);
    }
  }
};

export const onCreateNode = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  getNode,
  reporter
}) => {
  const { createNode, createParentChildLink } = actions;

  const fileNode = getNode(node.parent);
  if (!fileNode?.name) return;

  const slug = fileNode.name.toLowerCase();

  if (node.internal.type === `EditionsYaml` && node.parent) {
    const nodeProps = {
      published: true,
      ...node,
      weight: node.weight || 0,
      cId: slug,
      slug
    };

    const newNode = {
      ...nodeProps,
      id: createNodeId(`${node.id} >>> Edition`),
      parent: fileNode.id,
      internal: {
        type: 'Edition',
        contentDigest: createContentDigest(nodeProps)
      }
    };

    await createNode(newNode);
    createParentChildLink({ parent: fileNode, child: newNode });
  }

  // Create a new node type for all the content pieces based on the folder name.
  // This allows us to easily get content by type, rather than all MDX together.
  if (node.internal.type === `Mdx` && node.parent) {
    const nodeType = capitalize(fileNode.sourceInstanceName);

    let nodeProps = {
      published: true,
      ...node.frontmatter,
      weight: node.frontmatter.weight || 0,
      cId: slug.replace(/(^\/|\/$)/g, ''),
      slug
    };

    if (nodeType === 'Event' || nodeType === 'People') {
      // The following applies to events and people content types.
      // The relative directory is the path to the file from the event content
      // directory. We are structuring the content in a way that the events are
      // in a folder with the edition name.
      // events /
      //   edition-id /
      //     event-id.mdx
      //   edition-id /
      //     event-id.mdx
      const edition = fileNode.relativeDirectory;
      nodeProps = {
        ...nodeProps,
        cId: `${edition}-${nodeProps.cId}`,
        edition
      };
    } else if (nodeType === 'Updates') {
      const dir = fileNode.relativeDirectory;
      const match = dir.match(/(\d{4}-\d{2}-\d{2})-(.*)/);
      if (!match) {
        reporter.panicOnBuild(
          `Blog post directory name is not valid: ${dir}. It should be in the format of YYYY-MM-DD-title.`
        );
        return;
      }
      const [, date, name] = match;
      const finalDate = new Date(node.frontmatter.date || date);
      const formattedDate = finalDate.toISOString().split('T')[0];
      const finalSlug = `${formattedDate}-${name}`;

      nodeProps = {
        ...nodeProps,
        cId: finalSlug,
        slug: finalSlug,
        date: finalDate
      };
    }

    const newNode = {
      ...nodeProps,
      id: createNodeId(`${node.id} >>> ${nodeType}`),
      parent: node.id,
      internal: {
        type: nodeType,
        contentDigest: createContentDigest(nodeProps),
        contentFilePath: node.internal.contentFilePath
      }
    };
    createNode(newNode);
    createParentChildLink({ parent: node, child: newNode });
  }
};

// Implement createPages api since we only want to create pages for published
// content and it is not possible to do with the File routing API.
export const createPages = async (helpers) => {
  const { actions, graphql } = helpers;
  // Create events index. See (./gatsby-node/events-mdx-index) for details.
  await generateEventsMDXIndex(helpers);

  // Edition specific pages.
  await createEditionPages(helpers);

  // Updates pages.
  await createUpdatesPages(helpers);

  // --------------------------------------------------------------
  // Global pages that are not edition specific.
  const { data } = await graphql(`
    query {
      # Global letter pages that are not edition specific.
      allLetter(
        filter: {
          title: { ne: "" }
          published: { eq: true }
          editions: { elemMatch: { edition: { cId: { eq: null } } } }
        }
      ) {
        nodes {
          id
          slug
          editions {
            edition {
              cId
            }
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  // Create global letter pages
  data?.allLetter.nodes.forEach((node) => {
    const { slug, id } = node;
    actions.createPage({
      path: `/${slug}`,
      // Details at: https://www.gatsbyjs.com/docs/how-to/routing/mdx/#make-a-layout-template-for-your-posts
      component: pageComponent(
        'letter-page.tsx',
        node.internal.contentFilePath
      ),
      context: { slug, id }
    });
  });
};

export const createSchemaCustomization = (helpers) => {
  createLetterSchema(helpers);
  createEventSchema(helpers);
  createPeopleSchema(helpers);
  createEventPeopleRelSchema(helpers);
  createSponsorSchema(helpers);
};

export const createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      updatesByTag: {
        type: ['Updates!'],
        args: {
          tag: 'String',
          limit: 'Int',
          skip: 'Int',
          filter: 'UpdatesFilterInput'
        },
        resolve: async (source, args, context) => {
          const { tag, limit, skip, filter: userFilter = {} } = args;

          const getEntries = async (filter = {}) => {
            const { entries } = await context.nodeModel.findAll({
              query: {
                filter: {
                  published: { eq: true },
                  ...filter,
                  ...userFilter
                },
                limit,
                skip,
                sort: { date: 'DESC' }
              },
              type: 'Updates'
            });

            return Array.from(entries);
          };

          if (!tag || tag === 'all') {
            return getEntries();
          }

          const entriesByTag = await getEntries({ tags: { eq: tag } });

          const entriesByEdition = await getEntries({
            editions: { elemMatch: { edition: { name: { eq: tag } } } }
          });

          return entriesByEdition.concat(entriesByTag);
        }
      }
    }
  };
  createResolvers(resolvers);
};
