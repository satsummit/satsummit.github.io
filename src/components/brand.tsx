import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Heading, Text, Link as ChLink } from '@chakra-ui/react';
import LogoMark from './logo-mark';

interface BrandProps {
  variation?: 'positive' | 'negative';
}

export default function Brand(props: BrandProps) {
  const { variation = 'positive' } = props;

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Heading
      as='strong'
      size='md'
      display='inline-flex'
      color={variation === 'positive' ? 'base.500' : 'surface.500'}
    >
      <ChLink
        as={Link}
        to='/'
        display='inline-flex'
        alignItems='center'
        gap='3'
        textDecoration='none'
        transition='opacity 0.24s ease 0s'
        color='currentcolor'
        _hover={{
          opacity: '0.64'
        }}
      >
        <LogoMark color='currentColor' />
        <Text as='span' display='inline-flex' alignItems='center' gap='1'>
          <Text as='span'>{data.site.siteMetadata.title}</Text>
        </Text>
      </ChLink>
    </Heading>
  );
}
