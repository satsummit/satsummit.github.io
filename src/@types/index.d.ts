// Add images to a React project with Typescript
// From: https://dev.to/minompi/add-images-to-a-react-project-with-typescript-4gbm
declare module "*.jpg" {
  const path: string;
  export default path;
}

declare module "*.png" {
  const path: string;
  export default path;
}

declare module "*.svg" {
  const path: string;
  export default path;
}

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.mdx" {
  import type { MDXContent } from 'mdx/types';
  const MDXComponent: MDXContent;
  export default MDXComponent;
}
