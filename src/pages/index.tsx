import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import {
  Box,
  Center,
  Heading,
  Highlight,
  Text,
  calc,
  Flex,
  Link as ChakraLink,
  Badge
} from '@chakra-ui/react';

const $lineHeight = '1.4375rem';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Box as='main'>
      <Center height='100vh' textAlign='center'>
        <Flex gap={$lineHeight} flexDir='column'>
          <Heading
            as='h1'
            size='4xl'
            maxW='16ch'
            lineHeight={calc($lineHeight).multiply(4).toString()}
          >
            <Highlight
              query='Satsummit 2024'
              styles={{ color: 'primary.600', _dark: { color: 'primary.400' } }}
            >
              Satsummit 2024 is coming soon!
            </Highlight>
          </Heading>
          <Text fontSize='2xl' mb={$lineHeight}>
            In the mean time check out the previous editions:
          </Text>
          <Flex gap={3} justifyContent='center'>
            <Badge>
              <ChakraLink href='https://2022.satsummit.io'>
                2022 edition
              </ChakraLink>
            </Badge>
            <Badge>
              <ChakraLink href='https://2018.satsummit.io'>
                2018 edition
              </ChakraLink>
            </Badge>
            <Badge>
              <ChakraLink href='https://2017.satsummit.io'>
                2017 edition
              </ChakraLink>
            </Badge>
            <Badge>
              <ChakraLink href='https://2015.satsummit.io'>
                2015 edition
              </ChakraLink>
            </Badge>
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
