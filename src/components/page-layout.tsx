import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import PageHeader from './page-header';
import PageFooter from './page-footer';

export default function PageLayout(props: {children: React.ReactNode}) {
  return (
    <Flex direction='column' minHeight='100vh'>
      <PageHeader />
      <Box as='main' flex='1'>
        {props.children}
      </Box>
      <PageFooter />
    </Flex>
  );
}
