import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies';

const K_NAME = 'gatsby-gdpr-google-tagmanager';

function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname: string) {
  if (typeof window === 'undefined') return '';

  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export default function CookieBanner() {
  const [, render] = useState(0);
  const cookie = getCookie(K_NAME);

  const location = useLocation();

  useEffect(() => {
    if (cookie === 'true') {
      // Initialize the analytics
      initializeAndTrack(location);
    }
  }, [cookie, location]);

  return (
    <Modal isOpen={cookie === ''} onClose={() => {}} size='xl'>
      <ModalOverlay />
      <ModalContent
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems='center'
        p={4}
        gap={4}
        mx={4}
      >
        <ModalBody p={0}>
          <Text>
            This website uses cookies for analytics purposes. The data is
            anonymized and cannot be used to identify you.
          </Text>
        </ModalBody>

        <ModalFooter justifyContent='center' p={0}>
          <ButtonGroup colorScheme='primary'>
            <Button
              onClick={() => {
                setCookie(K_NAME, 'true', 30);
                render((v) => ++v);
              }}
            >
              Allow Cookies
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                setCookie(K_NAME, 'false', 30);
                render((v) => ++v);
              }}
            >
              Disable Cookies
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
