import React from 'react';
import {
  Box,
  Flex,
  FlexProps,
  Heading,
  ListItem,
  Text,
  ListIcon,
  List
} from '@chakra-ui/react';
import { Fold } from './fold';
import SmartLink, { SmartLinkProps } from './smart-link';
import { graphql, useStaticQuery } from 'gatsby';
import {
  CollecticonArrowRight,
  CollecticonBrandLinkedin,
  CollecticonBrandSatsummit,
  CollecticonBrandTwitter,
  CollecticonEnvelope,
  CollecticonExpandTopRight
} from '@devseed-ui/collecticons-chakra';
import Brand from './brand';

function FooterLink(props: SmartLinkProps) {
  return (
    <SmartLink
      textTransform='uppercase'
      fontFamily='Barlow Condensed, sans-serif'
      _hover={{ textDecoration: 'underline' }}
      display='flex'
      alignItems='center'
      {...props}
    />
  );
}

function FooterBlock(props: FlexProps) {
  return <Flex flexFlow='column' gap='4' {...props} />;
}

export default function PageHeader() {
  return (
    <Box bg='base.50' as='footer'>
      <Fold py={{ base: '8', md: '12', lg: '16' }} px='4' spacingY='8'>
        <FooterBlock
          gridColumn={{
            base: '1/-1',
            sm: '1 / span 2',
            md: '1/ span 4',
            lg: '1/ span 3'
          }}
        >
          <Heading size='sm'>Browse</Heading>
          <List>
            <ListItem>
              <FooterLink to='/'>
                <ListIcon as={CollecticonArrowRight} /> Welcome
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='/code-of-conduct'>
                <ListIcon as={CollecticonArrowRight} /> Code of conduct
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='/terms-conditions'>
                <ListIcon as={CollecticonArrowRight} /> Terms & Conditions
              </FooterLink>
            </ListItem>
          </List>
        </FooterBlock>
        <FooterBlock
          gridColumn={{
            base: '1/-1',
            sm: '3 / span 2',
            md: '5/ span 4',
            lg: '4/ span 3'
          }}
        >
          <Heading size='sm'>Past Editions</Heading>
          <List as='ol'>
            <ListItem>
              <FooterLink to='https://2022.satsummit.io'>
                <ListIcon as={CollecticonExpandTopRight} />
                Satsummit 2022
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://2018.satsummit.io'>
                <ListIcon as={CollecticonExpandTopRight} />
                Satsummit 2018
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://2017.satsummit.io'>
                <ListIcon as={CollecticonExpandTopRight} />
                Satsummit 2017
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://2015.satsummit.io'>
                <ListIcon as={CollecticonExpandTopRight} />
                Satsummit 2015
              </FooterLink>
            </ListItem>
          </List>
        </FooterBlock>
        <FooterBlock
          gridColumn={{
            base: '1/-1',
            sm: '1 / span 2',
            md: '1/ span 4',
            lg: '7/ span 3'
          }}
        >
          <Heading size='sm'>Let&apos;s Connect</Heading>
          <List>
            <ListItem>
              <FooterLink to='mailto:info@satsummit.io'>
                <ListIcon as={CollecticonEnvelope} />
                Get in Touch
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://twitter.com/intent/user?screen_name=sat_summit'>
                <ListIcon as={CollecticonBrandTwitter} />
                Follow us on X
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://github.com/satsummit'>
                <ListIcon as={CollecticonBrandSatsummit} />
                Find us on Github
              </FooterLink>
            </ListItem>
            <ListItem>
              <FooterLink to='https://www.linkedin.com/showcase/satsummit'>
                <ListIcon as={CollecticonBrandLinkedin} />
                Connect through LinkedIn
              </FooterLink>
            </ListItem>
          </List>
        </FooterBlock>
        <FooterBlock
          gridColumn={{
            base: '1/-1',
            sm: '3 / span 2',
            md: '5/ span 4',
            lg: '10/ span 3'
          }}
        >
          <Brand variation='positive' />
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
          <Text fontSize='sm'>
            Terms & Conditions &copy; 2015-{new Date().getFullYear()}
          </Text>
        </FooterBlock>
      </Fold>
    </Box>
  );
}
