const { createFilePath } = require('gatsby-source-filesystem');

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

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const slug = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
    createNodeField({
      node,
      name: 'type',
      value: fileNode.sourceInstanceName
    });
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { type: { eq: "letter" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.edges.forEach((edge) => {
    const slug = edge.node.fields.slug;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/letter-page.js`),
      context: { slug }
    });
  });
};
