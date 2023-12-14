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
import SmartLink from './smart-link';
import {
  CollecticonArrowRight,
  CollecticonBrandLinkedin,
  CollecticonBrandSatsummit,
  CollecticonBrandTwitter,
  CollecticonEnvelope,
  CollecticonExpandTopRight
} from '@devseed-ui/collecticons-chakra';
import Brand from './brand';
import MenuLink from './menu-link';

function FooterBlock(props: FlexProps) {
  return <Flex flexFlow='column' gap='4' {...props} />;
}

export default function PageHeader() {
  return (
    <Box
      as='footer'
      bg='base.50'
      px={{ base: '4', md: '8' }}
      py={{ base: '8', lg: '16' }}
    >
      <Fold spacingY={{ base: '6', md: '8' }}>
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
              <MenuLink to='/'>
                <ListIcon as={CollecticonArrowRight} /> Welcome
              </MenuLink>
            </ListItem>
            <ListItem>
              <MenuLink to='/code-of-conduct'>
                <ListIcon as={CollecticonArrowRight} /> Code of conduct
              </MenuLink>
            </ListItem>
            <ListItem>
              <MenuLink to='/terms-conditions'>
                <ListIcon as={CollecticonArrowRight} /> Terms & Conditions
              </MenuLink>
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
          <Heading size='md'>Past Editions</Heading>
          <List as='ol'>
            <ListItem>
              <MenuLink to='https://2022.satsummit.io'>
                <ListIcon as={CollecticonExpandTopRight} />
                Satsummit 2022
              </MenuLink>
            </ListItem>
            <ListItem>
              <MenuLink to='https://2018.satsummit.io'>
                <ListIcon as={CollecticonExpandTopRight} />
                Satsummit 2018
              </MenuLink>
            </ListItem>
            <ListItem>
              <MenuLink to='https://2017.satsummit.io'>
                <ListIcon as={CollecticonExpandTopRight} />
                Satsummit 2017
              </MenuLink>
            </ListItem>
            <ListItem>
              <MenuLink to='https://2015.satsummit.io'>
                <ListIcon as={CollecticonExpandTopRight} />
                Satsummit 2015
              </MenuLink>
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
          <Heading size='md'>Let&apos;s Connect</Heading>
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
                <ListIcon as={CollecticonBrandTwitter} />
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
            sm: '3 / span 2',
            md: '5/ span 4',
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
