import * as React from 'react';
import type { HeadFC } from 'gatsby';
import { Heading } from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import Sponsors from '$components/home/sponsors';

export default function IndexPage() {
  return (
    <PageLayout>
      <Heading size='4xl'>Welcome to Satsummit</Heading>
      <Sponsors />  
    </PageLayout>
  );
}

export const Head: HeadFC = () => <title>Home Page</title>;
