import fs from 'fs';

// 🧑‍🏫 🧑‍🏫 🧑‍🏫
// Right! Let's go over the shennanigans that are happening here.

// The agenda page renders a list of events, and each event is an MDX file.
// Besides the frontmatter properties of the event we also want to render the
// content of the MDX file in the agenda list

// The problem is that we can't query the content of the MDX file directly using
// graphQl, since the MDX needs to be converted to valid JSX first.

// Before gatsby v5 we could use the MDXRenderer from gatsby-plugin-mdx to
// render the MDX. We'd query it as a string and then render it, however with v5
// it was removed.

// If we want to use the createPages API to render each MDX node we can specify
// a component and Gastby wil take care of converting the MDX for that node. See
// (https://www.gatsbyjs.com/docs/how-to/routing/mdx/#make-a-layout-template-for-your-posts)

// However, this is not what we want. We want to render several pieces of MDX on
// a single page and can't specify a single component. It is currently not
// possible to render multiple MDX nodes on a single page. See
// https://github.com/gatsbyjs/gatsby/discussions/37301

// 🍀 The Solution.
// Instead of creating a custom MDX rendered to then render the MDX string
// content, I preferred to leverage Gatsby and Webpack's importing capabilities
// to load the MDX content.

// When a MDX file in imported with:
//  import Component from './file.mdx';
// Webpack will automatically convert the MDX file to a React component that can
// be used in the code.

// The solution is to create an index file of all the events (indexed by the
// cId) that imports all the MDX files.

// Then we query the events and load the MDX content by importing it from this
// file. Example:
//   import { events } from 'this file';
//   const Content = events[cId];
//   return <Content />;

// The only other thing is that we use `lazy` so that the file is lighter.

export async function generateEventsMDXIndex(graphql) {
  const { data } = await graphql(`
    query {
      allEvent {
        nodes {
          cId
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  const jsContent = data?.allEvent.nodes
    .map(
      (node) =>
        `'${node.cId}': lazy(() => import('${node.internal.contentFilePath}')),`
    )
    .join('\n');

  const moduleContent = `
import React, { lazy } from 'react';
import { MDXContent } from 'mdx/types';

export const events: Record<string, React.LazyExoticComponent<MDXContent>> = {
  ${jsContent}
};`;

  fs.writeFileSync('./src/components/agenda/events-gen.ts', moduleContent);
}