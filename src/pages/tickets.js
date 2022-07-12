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

const TicketsPage = () => {
  return (
    <Layout title='Tickets'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Tickets</PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <VarProse>
            <p>Content goes here.</p>
          </VarProse>
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default TicketsPage;
