import React from 'react';
import {
  Box,
  Button,
  Container,
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
  ListProps,
  Show,
  useDisclosure
} from '@chakra-ui/react';
import { CollecticonHamburgerMenu } from '@devseed-ui/collecticons-chakra';

import Brand from './brand';
import MenuLink from './menu-link';
import SmartLink from './smart-link';
import { useEditionContext } from '$context/edition';

const MENU_BRKPOINT = 'lg';

function NavMenu(props: ListProps) {
  return (
    <List display='flex' gap={{ base: '2', sm: '8' }} {...props}>
      <ListItem>
        <MenuLink to='/about'>About</MenuLink>
      </ListItem>
      <ListItem>
        <MenuLink to='/fringe'>News</MenuLink>
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
          <Box>
            <Brand variation='negative' />
            <EditionLocalNavigation />
          </Box>
          <Flex ml='auto'>
            <Box
              as='nav'
              display='flex'
              flexFlow='row'
              gap={{ base: '2', md: '4', lg: '8' }}
              alignItems='center'
            >
              <Show above={MENU_BRKPOINT}>
                <NavMenu />
              </Show>
              <Button
                as={SmartLink}
                noLinkStyles
                colorScheme='surface'
                variant='soft-outline'
                to='/tickets/'
                size={{ base: 'sm', lg: 'md' }}
              >
                Get your Ticket
              </Button>

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
              <NavMenu flexFlow='column' gap={2} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Hide>
    </Box>
  );
}

function EditionLocalNavigation() {
  const { edition } = useEditionContext();

  const navItems = navigation?.filter(
    (item) => !item.menu || ['header', 'both'].includes(item.menu.toLowerCase())
  );

  if (!navItems?.length) return null;

  return (
    <List display='flex' gap={{ base: '2', sm: '8' }}>
      {navItems.map((item) => (
        <ListItem key={item.path}>
          <MenuLink to={item.path!}>{item.title}</MenuLink>
        </ListItem>
      ))}
    </List>
  );
}
