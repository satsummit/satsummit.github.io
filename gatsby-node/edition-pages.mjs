import { add } from 'date-fns';

import { pageComponent, template } from './utils.mjs';

// Inject the editionCId into the context of the page. Since the pages are
// created using the filesystem api (under src/pages), there's no context
// included by default and we need it to filter the data for that edition.
export const updateEditionPagesContext = async (helpers) => {
  const {
    page,
    getNodesByType,
    actions: { deletePage, createPage }
  } = helpers;

  const editionsNodes = getNodesByType(`Edition`);

  // If the editionCId is already in the context, we don't need to do anything.
  // This happens when the page is created programmatically, instead of using
  // the filesystem api.
  if (page.context.editionCId) return;

  for (const edition of editionsNodes) {
    if (page.path.startsWith(`/${edition.cId}`)) {
      await deletePage(page);

      if (edition.published) {
        // Create the page again with updated context.
        await createPage({
          ...page,
          context: {
            ...page.context,
            editionCId: edition.cId
          }
        });
      }

      // We're done here, no need to keep looking.
      break;
    }
  }
};

// =============================================================================
// EDITION SPECIFIC PAGES
// =============================================================================
// Key Operations:
// - Edition Specific Pages: Pages specific to editions, including letter pages
//   from the MDX and pages common to all editions (like agenda, speakers, etc.)
// - Agenda Pages: Pages for the agenda of different days within an edition.
// - Speaker Pages: Pages for the speakers of an edition. Needed so in the
//   speaker page, the agenda is correctly displayed.
//
// =============================================================================
export const createEditionPages = async (helpers) => {
  const { actions, graphql } = helpers;

  const { data } = await graphql(`
    query {
      allEdition(filter: { published: { eq: true } }) {
        nodes {
          cId
          dates
        }
      }
      # Letter pages that are for the editions, one or more.
      allLetter(
        filter: {
          title: { ne: "" }
          published: { eq: true }
          editions: { elemMatch: { edition: { cId: { ne: null } } } }
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
      allPeople(
        filter: {
          title: { ne: "" }
          published: { eq: true }
          edition: { cId: { ne: null } }
        }
      ) {
        nodes {
          id
          slug
          edition {
            cId
          }
          internal {
            contentFilePath
          }
        }
      }
      allEvent(
        filter: {
          fringe: { eq: true }
          title: { ne: "" }
          published: { eq: true }
          edition: { cId: { ne: null } }
        }
      ) {
        group(field: { edition: { cId: SELECT } }) {
          totalCount
          fieldValue
        }
      }
    }
  `);

  let pagesToCreate = [];

  // Create edition specific pages.
  data?.allEdition.nodes.forEach(({ cId: editionCId, dates }) => {
    // Letter pages for the edition.
    const editionLetters = data?.allLetter.nodes.filter((letter) =>
      letter.editions.some((e) => e.edition.cId === editionCId)
    );
    // Create letter pages for the edition.
    editionLetters.forEach((node) => {
      const { slug, id } = node;
      pagesToCreate.push({
        path: `/${editionCId}/${slug}`,
        // Details at: https://www.gatsbyjs.com/docs/how-to/routing/mdx/#make-a-layout-template-for-your-posts
        component: pageComponent(
          'letter-page.tsx',
          node.internal.contentFilePath
        ),
        context: { slug, id, editionCId }
      });
    });

    // Agenda pages for the different days.
    const evenDates = dates.map((date) => new Date(date));

    evenDates.forEach((date, i) => {
      pagesToCreate.push({
        path: i ? `/${editionCId}/agenda/${i + 1}` : `/${editionCId}/agenda`,
        component: template('agenda-hub.tsx'),
        context: {
          start: date.toISOString().slice(0, 10),
          end: add(date, { days: 1 }).toISOString().slice(0, 10),
          editionCId,
          dayIndex: i
        }
      });
    });

    const hasFringe =
      data?.allEvent.group.find((g) => g.fieldValue === editionCId)
        ?.totalCount > 0;

    if (hasFringe) {
      pagesToCreate.push({
        path: `/${editionCId}/fringe`,
        component: template('fringe-hub.tsx'),
        context: {
          editionCId
        }
      });
    }

    pagesToCreate.push({
      path: `/${editionCId}/speakers`,
      component: template('speakers-hub.tsx'),
      context: {
        editionCId
      }
    });

    // Speaker pages under each edition. This is needed so in the speaker page,
    // the agenda is correctly displayed.
    data?.allPeople.nodes
      // Get only people that participate in an event of the current edition.
      .filter((n) => n.edition.cId === editionCId)
      .forEach((node) => {
        const { slug, id } = node;
        pagesToCreate.push({
          path: `/${editionCId}/speakers/${slug}`,
          // Details at: https://www.gatsbyjs.com/docs/how-to/routing/mdx/#make-a-layout-template-for-your-posts
          component: pageComponent(
            'speakers-page.tsx',
            node.internal.contentFilePath
          ),
          context: { slug, id, editionCId }
        });
      });
  });

  // Create the pages.
  for (const page of pagesToCreate) {
    await actions.createPage(page);
  }
};
