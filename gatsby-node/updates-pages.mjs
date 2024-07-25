import { pageComponent, template } from './utils.mjs';
import _ from 'lodash';

// =============================================================================
// UPDATES PAGES
// =============================================================================
// Key Operations:
// - Single Page: Create a page for each update.
// - List Page: Create a list of updates with pagination.
//
// =============================================================================
export const createUpdatesPages = async (helpers) => {
  const { actions, graphql } = helpers;

  const { data } = await graphql(`
    query {
      allUpdates(
        filter: { title: { ne: "" }, published: { eq: true } }
        sort: { date: DESC }
      ) {
        nodes {
          slug
          tags
          editions {
            edition {
              name
            }
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  const updates = data?.allUpdates.nodes;

  updates.forEach((node) => {
    const { slug } = node;
    actions.createPage({
      path: `/updates/${slug}`,
      // Details at: https://www.gatsbyjs.com/docs/how-to/routing/mdx/#make-a-layout-template-for-your-posts
      component: pageComponent(
        'updates-page.tsx',
        node.internal.contentFilePath
      ),
      context: { slug }
    });
  });

  const countByTag = updates.reduce((acc, update) => {
    const { tags, editions } = update;

    const items = (editions || [])
      .map((e) => e.edition.name)
      .concat(tags || []);

    items.forEach((tag) => {
      const count = acc.get(tag) || 0;
      acc.set(tag, count + 1);
    });

    return acc;
  }, new Map());

  const uniqueKeys = Array.from(countByTag.keys()).map((tag) => ({
    id: _.kebabCase(tag),
    name: tag
  }));

  // Create updates list page with pagination
  const updatesPerPage = 2;
  const numPages = Math.ceil(updates.length / updatesPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/updates` : `/updates/${i + 1}`,
      component: template('updates-list.tsx'),
      context: {
        tagList: uniqueKeys,
        limit: updatesPerPage,
        skip: i * updatesPerPage,
        numPages,
        currentPage: i + 1
      }
    });
  });

  // Create tags page with pagination
  countByTag.forEach((count, tag) => {
    const numPages = Math.ceil(count / updatesPerPage);
    const tagSlug = _.kebabCase(tag);

    Array.from({ length: numPages }).forEach((_, i) => {
      actions.createPage({
        path:
          i === 0
            ? `/updates/tag/${tagSlug}`
            : `/updates/tag/${tagSlug}/${i + 1}`,
        component: template('updates-list.tsx'),
        context: {
          tagList: uniqueKeys,
          currentTag: tag,
          limit: updatesPerPage,
          skip: i * updatesPerPage,
          numPages,
          currentPage: i + 1
        }
      });
    });
  });
};
