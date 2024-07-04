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
  getNode
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
      cId: slug
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

    const nodeProps = {
      published: true,
      ...node.frontmatter,
      weight: node.frontmatter.weight || 0,
      cId: slug.replace(/(^\/|\/$)/g, ''),
      slug
    };

    if (nodeType === 'Event') {
      // The relative directory is the path to the file from the event content
      // directory. We are structuring the content in a way that the events are
      // in a folder with the edition name.
      // events /
      //   edition-id /
      //     event-id.mdx
      //   edition-id /
      //     event-id.mdx
      nodeProps.edition = fileNode.relativeDirectory;
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
