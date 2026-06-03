import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Heading, Text } from '@chakra-ui/react';
import LogoMark from './logo-mark';
import SmartLink from './smart-link';


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
      color={variation === 'positive' ? 'basi.500' : 'surface.500'}
    >
      <SmartLink
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
      </SmartLink>
    </Heading>
  );
}
