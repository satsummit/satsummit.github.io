import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useToken
} from '@chakra-ui/react';

import cloudSmallUrl from '$images/banner/banner--cloud-small@2x.png';

interface PageHeroProps {
  title: string;
  lead?: string;
}

const heroBg = `url('${cloudSmallUrl}') calc(100% + 20rem) bottom / auto 16rem no-repeat`;

export default function PageHero(props: PageHeroProps) {
  const { title, lead } = props;

  const primary = useToken('colors', 'primary.500');

  return (
    <Box
      background={{
        base: primary,
        // Can't use tokens with this bg notation.
        lg: `${heroBg}, ${primary}`
      }}
      px={{ base: '4', md: '8' }}
      py={{ base: '8', lg: '16' }}
    >
      <Container
        maxW='container.xl'
        color='white'
        display='flex'
        alignItems='center'
        p='0'
      >
        <Flex flexFlow='column' gap='4'>
          <Heading size='3xl' as='h1'>
            {title}
          </Heading>
          {lead && (
            <Text
              textStyle={{ base: 'lead.md', md: 'lead.lg' }}
              maxW='container.sm'
            >
              {lead}
            </Text>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
