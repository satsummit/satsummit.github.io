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
  PlacementWithLogical,
  Show,
  Tooltip,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
import { CollecticonHamburgerMenu } from '@devseed-ui/collecticons-chakra';

import Brand from './brand';
import MenuLink from './menu-link';

import { visuallyDisableProps } from '$utils/utils';

interface NavMenuProps extends ListProps {}

function NavMenu(props: NavMenuProps) {
  const popoverPosition: PlacementWithLogical | undefined = useBreakpointValue(
    { base: 'right', md: 'bottom' },
    { fallback: 'bottom' }
  );

  return (
    <List display='flex' gap={{ base: '2', sm: '8' }} {...props}>
      <ListItem>
        <MenuLink to='/agenda'>Agenda</MenuLink>
      </ListItem>
      <ListItem>
        <MenuLink to='/fringe'>Fringe</MenuLink>
      </ListItem>
      <ListItem>
        <Tooltip label='Coming soon' placement={popoverPosition} hasArrow>
          <MenuLink to='/speakers' {...visuallyDisableProps()}>
            Speakers
          </MenuLink>
        </Tooltip>
      </ListItem>
      <ListItem>
        <MenuLink to='/tickets'>Tickets</MenuLink>
      </ListItem>
      <ListItem>
        <MenuLink to='/practical-info'>Practical Info</MenuLink>
      </ListItem>
    </List>
  );
}

const menuBreakpoint = 'md';

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
          </Box>
          <Flex ml='auto'>
            <Box
              as='nav'
              display='flex'
              flexFlow='row'
              gap={{ base: '2', md: '4', lg: '8' }}
              alignItems='center'
            >
              <Show above={menuBreakpoint}>
                <NavMenu />
              </Show>
              <Button
                as='a'
                colorScheme='surface'
                variant='soft-outline'
                href='/2024-sponsor-kit.pdf'
                size={{ base: 'sm', lg: 'md' }}
              >
                Become a Sponsor
              </Button>

              <Hide above={menuBreakpoint}>
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
      <Hide above={menuBreakpoint}>
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
