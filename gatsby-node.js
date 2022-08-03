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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type People implements Node {
      title: String!
      company: String!
      role: String!
      twitter: String
      avatar: File @fileByRelativePath
      pronouns: String
    }

    type Event implements Node {
      # type
      # people
      title: String!
      date: Date!
      room: String
      lead: String
    }
  `;
  createTypes(typeDefs);
};
