import React from 'react';
import styled from 'styled-components';

import Layout from '$components/layout';

import { Heading } from '@devseed-ui/typography';

import Hug from '$styles/hug';
import { variableGlsp } from '$styles/variable-utils';

const Hero = styled(Hug)`
  padding: ${variableGlsp()};
`;

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <Hero>
          <Heading>SatSummit</Heading>
          <p>Hello world.</p>
        </Hero>
      </main>
    </Layout>
  );
};

export default IndexPage;
