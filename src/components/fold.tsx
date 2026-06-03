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
      columnGap={{ base: '4', lg: '8' }}
      rowGap={{ base: '4', lg: '8' }}
      maxW='7xl'
      mx='auto'
      {...props}
    />
  );
}

export function FoldProse(props: FlexProps) {
  return <Flex flexFlow='column' gap='4' p={['4', '8']} {...props} />;
}

export function FoldMedia(props: BoxProps) {
  return <Box borderRadius='xs' overflow='hidden' {...props} />;
}
