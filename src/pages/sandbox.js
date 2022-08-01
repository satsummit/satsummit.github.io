import React from 'react';

import Layout from '$components/layout';
import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';
import { BlockAlpha } from '$styles/blocks';
import { VarProse } from '$styles/variable-components';

const SandboxPage = () => {
  return (
    <Layout title='Sandbox'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Sandbox</PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <VarProse>
            <h2>Testing sandbox</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque faucibus vehicula vulputate. Nulla eget purus tellus.
              Duis vel euismod metus, sed eleifend eros.
            </p>
          </VarProse>
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default SandboxPage;
