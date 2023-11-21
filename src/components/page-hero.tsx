import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useToken
} from '@chakra-ui/react';

import cloudUrl from '../images/cloud.png';

interface PageHeroProps {
  title: string;
  lead?: string;
}

const heroBg = `url('${cloudUrl}') calc(100% + 10rem) bottom / auto 16rem no-repeat`;

export default function PageHero(props: PageHeroProps) {
  const { title, lead } = props;

  const primary = useToken('colors', 'primary.500');

  return (
    <Box
      as='header'
      background={{
        base: primary,
        // Can't use tokens with this bg notation.
        lg: `${heroBg}, ${primary}`
      }}
      px='8'
      pb='8'
    >
      <Container
        maxW='container.xl'
        color='white'
        minHeight='14rem'
        display='flex'
        alignItems='center'
        p='0'
      >
        <Flex flexFlow='column' gap='4'>
          <Heading size='jumbo'>{title}</Heading>
          {lead && (
            <Text textStyle='lead.lg' maxW='container.sm'>
              {lead}
            </Text>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
