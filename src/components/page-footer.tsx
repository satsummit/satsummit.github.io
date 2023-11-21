import React from 'react';
import {
  Box,
  Flex,
  FlexProps,
  Heading,
  ListItem,
  UnorderedList,
  Text
} from '@chakra-ui/react';
import { Fold } from './fold';
import SmartLink, { SmartLinkProps } from './smart-link';
import { graphql, useStaticQuery } from 'gatsby';
import LogoIcon from './logo-icon';

function FooterLink(props: SmartLinkProps) {
  return (
    <SmartLink
      textTransform='uppercase'
      fontFamily='Barlow Condensed, sans-serif'
      _hover={{ textDecoration: 'underline' }}
      {...props}
    />
  );
}

function FooterBlock(props: FlexProps) {
  return <Flex flexFlow='column' gap='4' {...props} />;
}

export default function PageHeader() {
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
    <Box bg='base.50' as='footer'>
      <Fold py={{base: '8', md: '12', lg:'16'}} px='4' spacingY='8'>
        <FooterBlock
          gridColumn={{ base: '1/-1', sm: '1 / span 2', md: '1/ span 4', lg: '1/ span 3' }}
        >
          <Heading size='sm'>Browse</Heading>
          <UnorderedList>
            <ListItem>
              <FooterLink to='/'>Welcome</FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='/code-of-conduct'>Code of conduct</FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='/terms-conditions'>Terms & Conditions</FooterLink>
            </ListItem>
          </UnorderedList>
        </FooterBlock>
        <FooterBlock
          gridColumn={{ base: '1/-1', sm: '3 / span 2', md: '5/ span 4', lg: '4/ span 3' }}
        >
          <Heading size='sm'>Past Editions</Heading>
          <UnorderedList>
            <ListItem>
              <FooterLink to='https://2022.satsummit.io'>
                Satsummit 2022
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://2018.satsummit.io'>
                Satsummit 2018
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://2017.satsummit.io'>
                Satsummit 2017
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://2015.satsummit.io'>
                Satsummit 2015
              </FooterLink>
            </ListItem>
          </UnorderedList>
        </FooterBlock>
        <FooterBlock
          gridColumn={{ base: '1/-1', sm: '1 / span 2', md: '1/ span 4', lg: '7/ span 3' }}
        >
          <Heading size='sm'>Let&apos;s Connect</Heading>
          <UnorderedList>
            <ListItem>
              <FooterLink to='mailto:info@satsummit.io'>
                Get in Touch
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://twitter.com/intent/user?screen_name=sat_summit'>
                Follow us on X
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://github.com/satsummit'>
                Find us on Github
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://www.linkedin.com/showcase/satsummit'>
                Connect through LinkedIn
              </FooterLink>
            </ListItem>
          </UnorderedList>
        </FooterBlock>
        <FooterBlock
          gridColumn={{ base: '1/-1', sm: '3 / span 2', md: '5/ span 4', lg: '10/ span 3' }}
        >
          <Heading size='sm' display='flex' gap='2' alignItems='center'>
            <LogoIcon color='base.500' />
            {data.site.siteMetadata.title} {data.site.siteMetadata.edition}
          </Heading>
          <Text>
            An event by{' '}
            <SmartLink to='https://developmentseed.org' fontWeight='bold'>
              Development Seed
            </SmartLink>{' '}
            and{' '}
            <SmartLink to='https://dev.global/' fontWeight='bold'>
              DevGlobal
            </SmartLink>
            .
          </Text>
          <Text fontSize='sm'>Terms & Conditions &copy; 2015-{new Date().getFullYear()}</Text>
        </FooterBlock>
      </Fold>
    </Box>
  );
}
