import React from 'react';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
import Brand from './brand';

export default function PageHeader() {
  return (
    <Box
      as='header'
      bg='primary.500'
      px={{ base: '4', md: '8' }}
      py={{ base: '8', lg: '12' }}
    >
      <Container maxW='container.xl' color='white' p='0'>
        <Flex alignItems='center'>
          <Box>
            <Brand variation='negative' />
          </Box>
          <Flex ml='auto'>
            <Box as='nav'>
              <Button
                as='a'
                colorScheme='surface'
                variant='soft-outline'
                href='/2024-sponsor-kit.pdf'
                size={{ base: 'sm', lg: 'md' }}
              >
                Become a Sponsor
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
