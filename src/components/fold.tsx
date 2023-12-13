import React from 'react';
import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  SimpleGrid,
  SimpleGridProps
} from '@chakra-ui/react';

export function Fold(props: SimpleGridProps) {
  return (
    <SimpleGrid
      columns={{ base: 4, md: 8, lg: 12 }}
      spacingX={{ base: '4', lg: '8' }}
      spacingY={{ base: '4', lg: '8' }}
      maxW='container.xl'
      mx='auto'
      {...props}
    />
  );
}

export function FoldProse(props: FlexProps) {
  return <Flex flexFlow='column' gap='4' p={['4', '8']} {...props} />;
}

export function FoldMedia(props: BoxProps) {
  return <Box borderRadius='sm' overflow='hidden' {...props} />;
}
