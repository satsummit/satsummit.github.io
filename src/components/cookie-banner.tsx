import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import { Button, ButtonGroup, Dialog, Text } from '@chakra-ui/react';

// Cookie name kept from gatsby-plugin-gdpr-cookies so existing consents stay valid.
const K_NAME = 'gatsby-gdpr-google-tagmanager';
const GTM_ID = 'GTM-5NPWQ998';

type GtmWindow = Window & {
  dataLayer: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function trackPageView(location: {
  pathname: string;
  search: string;
  hash: string;
}) {
  const w = window as unknown as GtmWindow;

  if (!w.gtag) {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);

    // gtag must push the arguments object, not an array.
    w.gtag = function () {
      w.dataLayer.push(arguments);
    };
    w.gtag('js', new Date());
    w.gtag('config', GTM_ID, {
      anonymize_ip: true,
      allow_google_signals: false
    });
  }

  w.gtag('event', 'page_view', {
    page_path: location.pathname + location.search + location.hash
  });
  setTimeout(() => w.dataLayer.push({ event: 'gatsbyRouteChange' }), 50);
}

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
      trackPageView(location);
    }
  }, [cookie, location]);

  return (
    <Dialog.Root open={cookie === ''} onOpenChange={() => {}} size='lg'>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems='center'
          p={4}
          gap={4}
          mx={4}
        >
          <Dialog.Body p={0}>
            <Text>
              This website uses cookies for analytics purposes. The data is
              anonymized and cannot be used to identify you.
            </Text>
          </Dialog.Body>

          <Dialog.Footer justifyContent='center' p={0}>
            <ButtonGroup colorPalette='action-button'>
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
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
