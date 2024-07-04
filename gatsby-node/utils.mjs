import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const capitalize = (v) => `${v[0].toUpperCase()}${v.slice(1)}`;

export const template = (file) =>
  path.resolve(__dirname, `../src/templates/${file}`);

// Details at: https://www.gatsbyjs.com/docs/how-to/routing/mdx/#make-a-layout-template-for-your-posts
export const pageComponent = (file, contentFilePath) =>
  `${template(file)}?__contentFilePath=${contentFilePath}`;
