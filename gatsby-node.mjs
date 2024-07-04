import path from 'path';
import { add } from 'date-fns';
import { generateEventsMDXIndex } from './plugins/events-mdx-index.mjs';

const letterTemplate = path.resolve('./src/templates/letter-page.tsx');
const peopleTemplate = path.resolve('./src/templates/people-page.tsx');
const agendaHubTemplate = path.resolve('./src/templates/agenda-hub.tsx');

const capitalize = (v) => `${v[0].toUpperCase()}${v.slice(1)}`;

export const onCreatePage = async ({ page, actions: { deletePage } }) => {
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
export const createPages = async ({ actions, graphql }) => {
  // Create events index. See (./plugins/events-mdx-index) for details.
  generateEventsMDXIndex(graphql);

  const { data } = await graphql(`
    query {
      site {
        siteMetadata {
          eventDates
        }
      }
      allLetter(filter: { title: { ne: "" }, published: { eq: true } }) {
        nodes {
          slug
          internal {
            contentFilePath
          }
        }
      }
      allPeople(filter: { title: { ne: "" }, published: { eq: true } }) {
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

  data?.allPeople.nodes.forEach((node) => {
    const { slug } = node;
    actions.createPage({
      path: `/speakers/${slug}`,
      // Details at: https://www.gatsbyjs.com/docs/how-to/routing/mdx/#make-a-layout-template-for-your-posts
      component: `${peopleTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { slug }
    });
  });

  // Agenda pages for the different days.
  const evenDates = data.site.siteMetadata.eventDates.map(
    (date) => new Date(date)
  );
  evenDates.forEach((date, i) => {
    actions.createPage({
      path: i ? `/agenda/${i + 1}` : `/agenda`,
      component: agendaHubTemplate,
      context: {
        start: date.toISOString().slice(0, 10),
        end: add(date, { days: 1 }).toISOString().slice(0, 10)
      }
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
