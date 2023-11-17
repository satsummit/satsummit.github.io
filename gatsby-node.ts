import path from 'path';
import { GatsbyNode } from 'gatsby';
import { Letter } from './src/types';

const letterTemplate = path.resolve('./src/templates/letter-page.tsx');

const capitalize = (v: string) => `${v[0].toUpperCase()}${v.slice(1)}`;

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  getNode
}) => {
  const { createNode, createParentChildLink } = actions;

  // Create a new node type for all the content pieces based on the folder name.
  // This allows us to easily get content by type, rather than all MDX together.
  if (node.internal.type === `Mdx` && node.parent) {
    const fileNode = getNode(node.parent)!;
    const slug = (fileNode.name as string).toLowerCase();
    const nodeType = capitalize(fileNode.sourceInstanceName as string);

    const nodeProps = {
      published: true,
      ...(node.frontmatter as Record<string, unknown>),
      cId: slug.replace(/(^\/|\/$)/g, ''),
      slug
    };

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
export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql
}) => {
  const { data } = await graphql<{ allLetter: { nodes: Letter[] } }>(`
    query {
      allLetter(filter: { title: { ne: "" }, published: { eq: true } }) {
        nodes {
          slug
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  data?.allLetter.nodes.forEach((node) => {
    const { slug } = node;
    actions.createPage({
      path: `/${slug}`,
      // Details at: https://www.gatsbyjs.com/docs/how-to/routing/mdx/#make-a-layout-template-for-your-posts
      component: `${letterTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { slug }
    });
  });
};
