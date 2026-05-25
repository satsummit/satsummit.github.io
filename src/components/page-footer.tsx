import React from 'react';
import { Box, Flex, FlexProps, Heading, List, Text } from '@chakra-ui/react';
import {
  CollecticonArrowRight,
  CollecticonBrandLinkedin,
  CollecticonBrandSatsummit,
  CollecticonEnvelope
} from '@devseed-ui/collecticons-chakra';
import { graphql, useStaticQuery } from 'gatsby';

import { Fold } from './fold';
import SmartLink from './smart-link';
import Brand from './brand';
import MenuLink from './menu-link';
import { CollecticonBrandX } from './icons/brand-x';

function FooterBlock(props: FlexProps) {
  return <Flex flexFlow='column' gap='4' {...props} />;
}

export default function PageFooter() {
  return (
    <Box
      as='footer'
      bg='basi.50'
      px={{ base: '4', md: '8' }}
      py={{ base: '8', lg: '16' }}
    >
      <Fold rowGap={{ base: '6', md: '8' }}>
        <GlobalFooterNavigation />
        <FooterBlock
          gridColumn={{
            base: '1/-1',
            sm: '3 / span 2',
            md: '5/ span 4',
            lg: '4/ span 3'
          }}
        >
          <Heading size='md'>Connect</Heading>
          <List.Root unstyled>
            <List.Item>
              <MenuLink gap='2' to='mailto:info@satsummit.io'>
                <CollecticonEnvelope /> Get in Touch
              </MenuLink>
            </List.Item>
            <List.Item>
              <MenuLink
                gap='2'
                textStyle='menuLink'
                to='https://twitter.com/intent/user?screen_name=sat_summit'
              >
                <CollecticonBrandX /> Follow us on X
              </MenuLink>
            </List.Item>
            <List.Item>
              <MenuLink gap='2' to='https://github.com/satsummit'>
                <CollecticonBrandSatsummit /> Find us on Github
              </MenuLink>
            </List.Item>
            <List.Item>
              <MenuLink
                gap='2'
                textStyle='menuLink'
                to='https://www.linkedin.com/showcase/satsummit'
              >
                <CollecticonBrandLinkedin /> Connect through LinkedIn
              </MenuLink>
            </List.Item>
          </List.Root>
        </FooterBlock>
        <FooterBlock
          gridColumn={{
            base: '1/-1',
            sm: '1 / span 2',
            md: '1/ span 4',
            lg: '10/ span 3'
          }}
        >
          <Brand variation='positive' />
          <Text fontSize='sm'>
            An event by{' '}
            <SmartLink
              to='https://developmentseed.org'
              fontWeight='bold'
              color='primary.500'
            >
              Development Seed
            </SmartLink>{' '}
            and{' '}
            <SmartLink
              to='https://dev.global/'
              fontWeight='bold'
              color='primary.500'
            >
              DevGlobal
            </SmartLink>
            .
          </Text>
          <Text fontSize='xs'>&copy; 2015-{new Date().getFullYear()}</Text>
        </FooterBlock>
      </Fold>
    </Box>
  );
}

function GlobalFooterNavigation() {
  const data = useStaticQuery<{
    allLetter: { nodes: { title: string; slug: string }[] };
  }>(graphql`
    query {
      allLetter(
        filter: {
          title: { ne: "" }
          published: { eq: true }
          editions: { elemMatch: { edition: { cId: { eq: null } } } }
        }
      ) {
        nodes {
          title
          slug
        }
      }
    }
  `);

  return (
    <FooterBlock
      gridColumn={{
        base: '1/-1',
        sm: '1 / span 2',
        md: '1/ span 4',
        lg: '1/ span 3'
      }}
    >
      <Heading size='md'>Browse</Heading>
      <List.Root listStyleType='none'>
        <List.Item>
          <MenuLink gap='2' to='/updates'>
            <CollecticonArrowRight /> Updates
          </MenuLink>
        </List.Item>
        <List.Item>
          <MenuLink gap='2' to='/editions'>
            <CollecticonArrowRight /> Editions
          </MenuLink>
        </List.Item>
        <List.Item>
          <MenuLink gap='2' to='/tickets'>
            <CollecticonArrowRight /> Tickets
          </MenuLink>
        </List.Item>
        {data.allLetter.nodes.map(({ title, slug }) => (
          <List.Item key={slug}>
            <MenuLink gap='2' to={`/${slug}`}>
              <CollecticonArrowRight /> {title}
            </MenuLink>
          </List.Item>
        ))}
      </List.Root>
    </FooterBlock>
  );
}
