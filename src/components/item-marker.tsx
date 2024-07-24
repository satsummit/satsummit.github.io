import React from 'react';
import { Box, BoxProps, Heading } from '@chakra-ui/react';

export function ItemMarker(props: BoxProps) {
  const { children, ...rest } = props;
  return (
    <Box
      bg='base.500'
      color='white'
      p='2'
      _after={{
        position: 'absolute',
        content: '""',
        width: '1rem',
        height: '0.75rem',
        background: 'base.500',
        top: '100%',
        left: '0',
        right: 'auto',
        bottom: 'auto',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
      }}
      {...rest}
    >
      <Heading
        as='p'
        textTransform='uppercase'
        fontSize='1rem'
        lineHeight='1'
        whiteSpace='nowrap'
      >
        {children}
      </Heading>
    </Box>
  );
}
