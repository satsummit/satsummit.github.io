import React from 'react';
import { Box, Container } from '@chakra-ui/react';

export default function PageHeader() {
  return (
    <Box bg='color.primary.500' as='footer'>
      <Container maxW='container.xl'>I am a footer</Container>
    </Box>
  );
}
