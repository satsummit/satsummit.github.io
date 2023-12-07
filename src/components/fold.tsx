import React from 'react';
import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  SimpleGrid,
  SimpleGridProps,
  useToken
} from '@chakra-ui/react';

export function Fold(props: SimpleGridProps) {
  return (
    <SimpleGrid
      columns={{ base: 4, md: 8, lg: 12 }}
      spacingX={{ base: '4', lg: '8' }}
      spacingY={{ base: '4', lg: '8' }}
      maxW='container.lg'
      mx='auto'
      {...props}
    />
  );
}

export function FoldProse(props: FlexProps) {
  return <Flex flexFlow='column' gap='4' p={['4', '8']} {...props} />;
}

export function FoldMedia(props: BoxProps) {
  const primary = useToken('colors', 'primary.500');

  return <Box boxShadow={`0 -4px 0 0 ${primary}`} {...props} />;
}
