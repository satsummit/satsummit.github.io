import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';

export default function PageHero() {
  return (
    <Box bg='primary.500' as='header'>
      <Container maxW='container.xl' color='white' height='40'>
        <Heading size='4xl'>I need a Hero!</Heading>
      </Container>
    </Box>
  );
}
