import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { system } from './src/theme';

export const wrapRootElement = ({
  element
}: {
  element: React.ReactNode;
}) => <ChakraProvider value={system}>{element}</ChakraProvider>;
