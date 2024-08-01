import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Hide,
  List,
  ListItem,
  Show,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import { CollecticonHamburgerMenu } from '@devseed-ui/collecticons-chakra';

import { MENU_BRKPOINT } from '../@chakra-ui/gatsby-plugin/theme';

import Brand from './brand';
import MenuLink from './menu-link';
import SmartLink from './smart-link';
import { ItemMarker } from './item-marker';
import { useEditionCId, useEditionContext } from '$context/edition';
import { visuallyDisableProps } from '$utils/utils';

function NavMenu(props: { inDrawer?: boolean }) {
  return (
    <List
      display='flex'
      gap={props.inDrawer ? 2 : 8}
      flexFlow={props.inDrawer ? 'column' : 'row'}
    >
      <ListItem>
        <MenuLink
          display={{ [MENU_BRKPOINT]: 'block' }}
          to='/updates'
          showComingSoon
        >
          Updates
        </MenuLink>
      </ListItem>
      <ListItem>
        <MenuLink display={{ [MENU_BRKPOINT]: 'block' }} to='/editions'>
          Editions
        </MenuLink>
      </ListItem>
    </List>
  );
}

export default function PageHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as='header'
      bg='primary.500'
      px={{ base: '4', md: '8' }}
      py={{ base: '8', lg: '12' }}
    >
      <Container maxW='container.xl' color='white' p='0'>
        <Flex alignItems='center'>
          <Flex alignItems='center' gap={6}>
            <Brand variation='negative' />
            <Show above={MENU_BRKPOINT}>
              <Divider
                borderColor='surface.300a'
                size='xs'
                h='4'
                orientation='vertical'
              />
              <NavMenu />
            </Show>
          </Flex>
          <Flex ml='auto'>
            <Box
              as='nav'
              display='flex'
              flexFlow='row'
              gap={{ base: '2', md: '4', lg: '8' }}
              alignItems='center'
            >
              <Show above={MENU_BRKPOINT}>
                <EditionLocalNavigation />
              </Show>

              <Tooltip label='Coming soon' placement='bottom' hasArrow>
                <Button
                  as={SmartLink}
                  noLinkStyles
                  colorScheme='surface'
                  variant='soft-outline'
                  to='/tickets/'
                  size={{ base: 'sm', lg: 'md' }}
                  {...visuallyDisableProps()}
                >
                  Get your Ticket
                </Button>
              </Tooltip>

              <Hide above={MENU_BRKPOINT}>
                <Button
                  variant='ghost'
                  colorScheme='whiteAlpha'
                  size={{ base: 'sm', lg: 'md' }}
                  onClick={onOpen}
                  color='currentcolor'
                >
                  <CollecticonHamburgerMenu
                    title='Open menu drawer'
                    meaningful
                  />
                </Button>
              </Hide>
            </Box>
          </Flex>
        </Flex>
      </Container>
      <Hide above={MENU_BRKPOINT}>
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              display='flex'
              gap='4'
              alignItems='center'
              py={{ base: '8', lg: '12' }}
            >
              <Heading as='span' size='md' width='100%'>
                Menu
              </Heading>
              <DrawerCloseButton position='initial' size='md' />
            </DrawerHeader>

            <DrawerBody>
              <NavMenu inDrawer />
              <EditionLocalNavigation inDrawer />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Hide>
    </Box>
  );
}

function EditionLocalNavigation(props: { inDrawer?: boolean }) {
  const { edition } = useEditionContext();
  const editionCId = useEditionCId();

  const navItems = edition?.navigation;

  if (!navItems?.length) return null;

  return (
    <Box pos='relative'>
      <ItemMarker pos='absolute' top='-2rem' left='-1.5rem'>
        <SmartLink
          to={`/${editionCId}`}
          color='inherit'
          lineHeight='inherit'
          transition='opacity 0.24s ease 0s'
          _hover={{
            opacity: '0.64',
            textDecoration: 'none'
          }}
        >
          {edition?.name}
        </SmartLink>
      </ItemMarker>
      <List
        display='flex'
        gap={props.inDrawer ? 2 : 8}
        flexFlow={props.inDrawer ? 'column' : 'row'}
        mt={props.inDrawer ? 16 : 0}
      >
        {navItems.map((item) => (
          <ListItem key={item.url}>
            <MenuLink
              display={{ [MENU_BRKPOINT]: 'block' }}
              to={item.url!}
              showComingSoon={!!item.comingSoon}
            >
              {item.title}
            </MenuLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
