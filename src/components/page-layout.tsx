import React from 'react';
import { PageProps } from 'gatsby';
import { Box, Flex } from '@chakra-ui/react';

import { EditionContextProvider } from '$context/edition';
import PageHeader from './page-header';
import PageFooter from './page-footer';
import SponsorsFold from './sponsors-fold';
import { Newsletter } from './newsletter';

export default function PageLayout(props: {
  children: React.ReactNode;
  pageProps?: PageProps;
}) {
  return (
    <EditionContextProvider pageProps={props.pageProps}>
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
