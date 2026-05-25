import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { system } from './src/theme';

export const wrapRootElement = ({
  element
}: {
  element: React.ReactNode;
}) => <ChakraProvider value={system}>{element}</ChakraProvider>;

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}: {
  routerProps: { location: Location };
  getSavedScrollPosition: (location: Location) => [number, number] | null;
}) => {
  if (location.hash) {
    return location.hash;
  }
  const currentPosition = getSavedScrollPosition(location);
  setTimeout(() => window.scrollTo(...(currentPosition || [0, 0])), 1);
  return false;
};
