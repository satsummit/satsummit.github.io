import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { getSystem } from './editions';

interface WrapPageElementArgs {
  element: React.ReactNode;
  props: {
    pageContext?: {
      editionCId?: string;
    };
  };
}

// Provide Chakra per page (via `wrapPageElement`) rather than once at the root,
// so each page gets the system for its edition. `editionCId` is injected into
// the page context for every edition page (see gatsby-node/edition-pages.mjs);
// global pages have none and fall back to the base brand. Because the systems
// are memoized, the provider value only changes identity when the edition
// changes, so navigation within an edition reconciles without a repaint.
export const wrapPageElement = ({ element, props }: WrapPageElementArgs) => (
  <ChakraProvider value={getSystem(props.pageContext?.editionCId)}>
    {element}
  </ChakraProvider>
);
