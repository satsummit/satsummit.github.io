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
    <List display='flex' columnGap={4} {...props}>
      <ListItem>
        <Tooltip label='Coming soon' placement={popoverPosition} hasArrow>
          <MenuLink to='/schedule' {...visuallyDisableProps()}>
            Schedule
          </MenuLink>
        </Tooltip>
      </ListItem>
      <ListItem>
        <MenuLink to='/tickets'>Tickets</MenuLink>
      </ListItem>
      <ListItem>
        <MenuLink to='/'>Link 3</MenuLink>
      </ListItem>
      <ListItem>
        <MenuLink to='/'>Link 4</MenuLink>
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
              gap={4}
              alignItems='center'
            >
              <Show above={menuBreakpoint}>
                <NavMenu />
              </Show>
              <Button
                as='a'
                colorScheme='surface'
                variant='soft-outline'
                href='https://forms.gle/Y9QnbzVcJuTpkMpX8'
                size={{ base: 'sm', lg: 'md' }}
              >
                Call for Speakers
              </Button>

              <Hide above={menuBreakpoint}>
                <Button
                  variant='ghost'
                  colorScheme='surface'
                  size={{ base: 'sm', lg: 'md' }}
                  onClick={onOpen}
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
            <DrawerCloseButton top={4} right={4} size='sm' />
            <DrawerHeader display='flex'>
              <Heading as='span' size='sm'>
                Menu
              </Heading>
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
