import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Text, Link as ChLink } from '@chakra-ui/react';
import LogoIcon from './logo-icon';

export default function Brand() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          edition
        }
      }
    }
  `);

  return (
    <Text as='strong'>
      <ChLink
        as={Link}
        to='/'
        display='inline-flex'
        alignItems='center'
        gap='2'
        textDecoration='none'
        textTransform='uppercase'
        fontSize='2xl'
        _hover={{
          textDecoration: 'none'
        }}
      >
        <LogoIcon color='white' />
        <Text as='span'>
          <span>{data.site.siteMetadata.title}</span>{' '}
          <Text
            as='span'
            position='relative'
            zIndex='1'
            _before={{
              content: '""',
              backgroundColor: 'base.500',
              position: 'absolute',
              width: '100%',
              height: '3',
              bottom: '4px',
              zIndex: '-1'
            }}
          >
            {data.site.siteMetadata.edition}
          </Text>
        </Text>
      </ChLink>
    </Text>
  );
}
