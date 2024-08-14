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
      bg='base.50'
      px={{ base: '4', md: '8' }}
      py={{ base: '8', lg: '16' }}
    >
      <Fold spacingY={{ base: '6', md: '8' }}>
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
          <List>
            <ListItem>
              <MenuLink to='mailto:info@satsummit.io'>
                <ListIcon as={CollecticonEnvelope} />
                Get in Touch
              </MenuLink>
            </ListItem>
            <ListItem>
              <MenuLink
                textStyle='menuLink'
                to='https://twitter.com/intent/user?screen_name=sat_summit'
              >
                <ListIcon as={CollecticonBrandX} />
                Follow us on X
              </MenuLink>
            </ListItem>
            <ListItem>
              <MenuLink to='https://github.com/satsummit'>
                <ListIcon as={CollecticonBrandSatsummit} />
                Find us on Github
              </MenuLink>
            </ListItem>
            <ListItem>
              <MenuLink
                textStyle='menuLink'
                to='https://www.linkedin.com/showcase/satsummit'
              >
                <ListIcon as={CollecticonBrandLinkedin} />
                Connect through LinkedIn
              </MenuLink>
            </ListItem>
          </List>
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
            <SmartLink to='https://developmentseed.org' fontWeight='bold'>
              Development Seed
            </SmartLink>{' '}
            and{' '}
            <SmartLink to='https://dev.global/' fontWeight='bold'>
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
      <List>
        <ListItem>
          <MenuLink to='/updates'>
            <ListIcon as={CollecticonArrowRight} /> Updates
          </MenuLink>
        </ListItem>
        <ListItem>
          <MenuLink to='/editions'>
            <ListIcon as={CollecticonArrowRight} /> Editions
          </MenuLink>
        </ListItem>
        <ListItem>
          <MenuLink to='/tickets' showComingSoon tooltipPos={{ base: 'right' }}>
            <ListIcon as={CollecticonArrowRight} /> Tickets
          </MenuLink>
        </ListItem>
        {data.allLetter.nodes.map(({ title, slug }) => (
          <ListItem key={slug}>
            <MenuLink to={`/${slug}`}>
              <ListIcon as={CollecticonArrowRight} /> {title}
            </MenuLink>
          </ListItem>
        ))}
      </List>
    </FooterBlock>
  );
}
