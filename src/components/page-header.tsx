import React from 'react';
import {
  Box,
  Container,
  Flex,
  ListItem,
  UnorderedList
} from '@chakra-ui/react';
import { Link } from 'gatsby';

export default function PageHeader() {
  return (
    <Box bg='primary.500' as='header'>
      <Container maxW='container.xl' py='12' color='white'>
        <Flex>
          <Box>logo</Box>
          <Flex ml='auto'>
            <Box as='nav'>
              <UnorderedList
                display='flex'
                styleType='none'
                gap='4'
                textTransform='uppercase'
              >
                <ListItem>
                  <Link to='/sponsorship'>Sponsorship</Link>
                </ListItem>
                <ListItem>
                  <Link to='/code-of-conduct'>Code of conduct</Link>
                </ListItem>
                <ListItem>
                  <Link to='/ye'>Another link</Link>
                </ListItem>
              </UnorderedList>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
