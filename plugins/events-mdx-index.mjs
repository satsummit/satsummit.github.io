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
//   const content = events[cId];
//   return <content.component />;

// The only other thing is that we use `lazy` so that the file is lighter.
// UPDATE: Removed lazy loading since it was generating too many files that were
// too small, and the performance gain was minimal.

export async function generateEventsMDXIndex(graphql) {
  const { data } = await graphql(`
    query {
      allEvent {
        nodes {
          cId
          internal {
            contentFilePath
          }
          parent {
            ... on Mdx {
              excerpt(pruneLength: 1)
            }
          }
        }
      }
    }
  `);

  const jsContent = data?.allEvent.nodes.map((node) => {
    const isEmpty = node.parent.excerpt === '';

    const importName = `C${node.cId.replace(/-/g, '')}`;
    const importStatement = `import ${importName} from '${node.internal.contentFilePath}';`;
    const reference = `'${node.cId}': {empty: ${isEmpty}, component: ${importName}},`;

    return [importStatement, reference];
  });

  const moduleContent = `
import { MDXContent } from 'mdx/types';

${jsContent.map((c) => c[0]).join('\n')}

interface EventContent {
  empty: boolean;
  component: MDXContent
}

export const events: Record<string, EventContent> = {
  ${jsContent.map((c) => c[1]).join('\n')}
};`;

  fs.writeFileSync('./src/components/agenda/events-gen.ts', moduleContent);
}
