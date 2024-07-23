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
  useDisclosure
} from '@chakra-ui/react';
import { CollecticonHamburgerMenu } from '@devseed-ui/collecticons-chakra';

import Brand from './brand';
import MenuLink from './menu-link';
import SmartLink from './smart-link';
import { useEditionContext } from '$context/edition';

const MENU_BRKPOINT = 'lg';

function NavMenu(props: { inDrawer?: boolean }) {
  return (
    <List
      display='flex'
      gap={props.inDrawer ? 2 : 8}
      flexFlow={props.inDrawer ? 'column' : 'row'}
    >
      <ListItem>
        <MenuLink display='block' to='/insights'>
          Insights
        </MenuLink>
      </ListItem>
      <ListItem>
        <MenuLink display='block' to='/editions'>
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
            <Divider
              borderColor='surface.300a'
              size='xs'
              h='4'
              orientation='vertical'
            />
            <Show above={MENU_BRKPOINT}>
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

  const navItems = edition?.navigation?.filter(
    (item) => !item.menu || ['header', 'both'].includes(item.menu.toLowerCase())
  );

  if (!navItems?.length) return null;

  return (
    <Box pos='relative'>
      <Box
        bg='base.500'
        color='white'
        pos='absolute'
        top='-2rem'
        left='-1.5rem'
        p='2'
        _after={{
          position: 'absolute',
          content: '""',
          width: '1rem',
          height: '0.75rem',
          background: 'base.500',
          top: '100%',
          left: '0',
          right: 'auto',
          bottom: 'auto',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
        }}
      >
        <Heading
          as='p'
          textTransform='uppercase'
          fontSize='1rem'
          lineHeight='1'
          whiteSpace='nowrap'
        >
          {edition?.name}
        </Heading>
      </Box>
      <List
        display='flex'
        gap={props.inDrawer ? 2 : 8}
        flexFlow={props.inDrawer ? 'column' : 'row'}
        mt={props.inDrawer ? 16 : 0}
      >
        {navItems.map((item) => (
          <ListItem key={item.url}>
            <MenuLink display='block' to={item.url!}>
              {item.title}
            </MenuLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
