import React from 'react';

import Layout from '$components/layout';
import { PageMainContent, PageMainHero, PageMainTitle } from '$styles/page';

const TicketsPage = () => {
  return (
    <Layout>
      <PageMainContent>
        <PageMainHero>
          <PageMainTitle>Tickets</PageMainTitle>
        </PageMainHero>
      </PageMainContent>
    </Layout>
  );
};

export default TicketsPage;
