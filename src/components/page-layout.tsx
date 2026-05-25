import React, { useEffect } from 'react';
import { PageProps } from 'gatsby';
import { Box, Flex } from '@chakra-ui/react';

import { EditionContextProvider } from '$context/edition';
import PageHeader from './page-header';
import PageFooter from './page-footer';
import SponsorsFold from './sponsors-fold';
import { Newsletter } from './newsletter';
import CookieBanner from './cookie-banner';

export default function PageLayout(props: {
  children: React.ReactNode;
  pageProps?: PageProps;
}) {
  useEffect(() => {
    const w = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      // In the mobile view this messes up calculations. The width should never
      // be very high
      w > 20 ? `0px` : `${w}px`
    );
  }, []);
  return (
    <EditionContextProvider pageProps={props.pageProps}>
      <CookieBanner />
      <Flex direction='column' minHeight='100vh'>
        <PageHeader />
        <Box as='main' flex='1'>
          {props.children}
        </Box>
        <SponsorsFold />
        <Newsletter />
        <PageFooter />
      </Flex>
    </EditionContextProvider>
  );
}
