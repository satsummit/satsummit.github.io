import { pageComponent, template } from './utils.mjs';

// =============================================================================
// INSIGHTS PAGES
// =============================================================================
// Key Operations:
// - Single Page: Create a page for each insight.
// - List Page: Create a list of insights with pagination.
//
// =============================================================================
export const createInsightsPages = async (helpers) => {
  const { actions, graphql } = helpers;

  const { data } = await graphql(`
    query {
      allInsights(
        filter: { title: { ne: "" }, published: { eq: true } }
        sort: { date: DESC }
      ) {
        nodes {
          slug
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  const insights = data?.allInsights.nodes;

  insights.forEach((node) => {
    const { slug } = node;
    actions.createPage({
      path: `/insights/${slug}`,
      // Details at: https://www.gatsbyjs.com/docs/how-to/routing/mdx/#make-a-layout-template-for-your-posts
      component: pageComponent(
        'insights-page.tsx',
        node.internal.contentFilePath
      ),
      context: { slug }
    });
  });

  // Create insights list page with pagination
  const insightsPerPage = 2;
  const numPages = Math.ceil(insights.length / insightsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/insights` : `/insights/${i + 1}`,
      component: template('insights-list.tsx'),
      context: {
        limit: insightsPerPage,
        skip: i * insightsPerPage,
        numPages,
        currentPage: i + 1
      }
    });
  });
};
