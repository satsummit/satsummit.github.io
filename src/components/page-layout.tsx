import React from 'react';
import { PageProps } from 'gatsby';
import { Box, Flex } from '@chakra-ui/react';
import PageHeader from './page-header';
import PageFooter from './page-footer';
import SponsorsFold from './sponsors-fold';
import { EditionContextProvider } from '$context/edition';

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
        <PageFooter />
      </Flex>
    </EditionContextProvider>
  );
}
