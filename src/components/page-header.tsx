import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Separator,
  Drawer,
  Flex,
  Heading,
  useDisclosure,
  List,
  IconButton,
  useMediaQuery,
  useToken
} from '@chakra-ui/react';

import {
  CollecticonHamburgerMenu,
  CollecticonXmarkSmall
} from '@devseed-ui/collecticons-chakra';

import { MENU_BRKPOINT } from '../theme';

import Brand from './brand';
import MenuLink from './menu-link';
import SmartLink from './smart-link';
import { ItemMarker } from './item-marker';
import { useEditionCId, useEditionContext } from '$context/edition';

function NavMenu(props: { inDrawer?: boolean }) {
  return (
    <List.Root
      listStyleType='none'
      display='flex'
      gap={props.inDrawer ? 2 : 8}
      flexFlow={props.inDrawer ? 'column' : 'row'}
    >
      <List.Item>
        <MenuLink display={{ [MENU_BRKPOINT]: 'block' }} to='/updates'>
          Updates
        </MenuLink>
      </List.Item>
      <List.Item>
        <MenuLink display={{ [MENU_BRKPOINT]: 'block' }} to='/editions'>
          Editions
        </MenuLink>
      </List.Item>
    </List.Root>
  );
}

export default function PageHeader() {
  const { open, onOpen, onClose } = useDisclosure();

  const [menuBreakpointSize] = useToken('breakpoints', [MENU_BRKPOINT]);
  const [isLargerThanMenuBreakpoint] = useMediaQuery([
    `(min-width: ${menuBreakpointSize})`
  ]);

  useEffect(() => {
    if (isLargerThanMenuBreakpoint) {
      onClose();
    }
  }, [isLargerThanMenuBreakpoint, onClose]);

  return (
    <Box
      as='header'
      bg='primary.500'
      px={{ base: '4', md: '8' }}
      py={{ base: '8', lg: '12' }}
    >
      <Container maxW='7xl' color='white' p='0'>
        <Flex alignItems='center'>
          <Flex alignItems='center' gap={6}>
            <Brand variation='negative' />
            <Box
              hideBelow={MENU_BRKPOINT}
              display='flex'
              alignItems='center'
              gap={6}
            >
              <Separator
                borderColor='surface.300a'
                size='xs'
                h='4'
                orientation='vertical'
              />
              <NavMenu />
            </Box>
          </Flex>
          <Flex ml='auto'>
            <Box
              as='nav'
              display='flex'
              flexFlow='row'
              gap={{ base: '2', md: '4', lg: '8' }}
              alignItems='center'
            >
              <Box hideBelow={MENU_BRKPOINT}>
                <EditionLocalNavigation />
              </Box>

              <Button
                asChild
                colorPalette='surface'
                variant='soft-outline'
                size={{ base: 'sm', lg: 'md' }}
              >
                <SmartLink to='/tickets/' unstyled>
                  Get your Ticket
                </SmartLink>
              </Button>

              <Box hideFrom={MENU_BRKPOINT}>
                <Button
                  variant='ghost'
                  colorPalette='surface'
                  size={{ base: 'sm', lg: 'md' }}
                  onClick={onOpen}
                >
                  <CollecticonHamburgerMenu
                    title='Open menu drawer'
                    meaningful
                  />
                </Button>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Container>

      <Drawer.Root
        open={open}
        placement='end'
        onOpenChange={({ open: o }: { open: boolean }) => !o && onClose()}
      >
        <Drawer.Backdrop />
        {/* @ts-expect-error something weird with the types */}
        <Drawer.Positioner>
          {/* @ts-expect-error something weird with the types */}
          <Drawer.Content>
            <Drawer.Header
              display='flex'
              gap='4'
              alignItems='center'
              py={{ base: '8', lg: '12' }}
            >
              <Heading as='span' size='md' width='100%'>
                Menu
              </Heading>
              <IconButton
                variant='ghost'
                size={{ base: 'sm', lg: 'md' }}
                onClick={onClose}
              >
                <CollecticonXmarkSmall title='Close menu drawer' meaningful />
              </IconButton>
            </Drawer.Header>

            <Drawer.Body>
              <NavMenu inDrawer />
              <EditionLocalNavigation inDrawer />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
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
      <List.Root
        listStyleType='none'
        display='flex'
        gap={props.inDrawer ? 2 : 8}
        flexFlow={props.inDrawer ? 'column' : 'row'}
        mt={props.inDrawer ? 16 : 0}
      >
        {navItems.map((item) => (
          <List.Item key={item.url}>
            <MenuLink
              display={{ [MENU_BRKPOINT]: 'block' }}
              to={item.url!}
              showComingSoon={!!item.comingSoon}
            >
              {item.title}
            </MenuLink>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}
