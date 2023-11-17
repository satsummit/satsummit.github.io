import React from 'react';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
import Brand from './brand';

export default function PageHeader() {
  return (
    <Box bg='primary.500' as='header'>
      <Container maxW='container.xl' py='12' color='white'>
        <Flex>
          <Box>
            <Brand />
          </Box>
          <Flex ml='auto'>
            <Box as='nav'>
              <Button
                as='a'
                colorScheme='white'
                variant='outline'
                textTransform='uppercase'
                borderColor='surface.200a'
                href='/2024-sponsor-kit.pdf'
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
