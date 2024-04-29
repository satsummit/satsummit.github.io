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
import SmartLink from './smart-link';

import { visuallyDisableProps } from '$utils/utils';

const MENU_BRKPOINT = 'lg';

interface NavMenuProps extends ListProps {}

function NavMenu(props: NavMenuProps) {
  const popoverPosition: PlacementWithLogical | undefined = useBreakpointValue(
    { base: 'right', [MENU_BRKPOINT]: 'bottom' },
    { fallback: 'bottom' }
  );

  return (
    <List display='flex' gap={{ base: '2', sm: '8' }} {...props}>
      <ListItem>
        <MenuLink to='/agenda'>Agenda</MenuLink>
      </ListItem>
      <ListItem>
        <MenuLink to='/fringe'>Fringe Events</MenuLink>
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
