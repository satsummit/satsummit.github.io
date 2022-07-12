import React from 'react';

import Layout from '$components/layout';
import {
  PageLead,
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';
import { BlockAlpha } from '$styles/blocks';
import { VarProse } from '$styles/variable-components';

const UhOh = () => {
  return (
    <Layout title='Page not found'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Page not found</PageMainTitle>
            <PageLead>That&apos;s a 404 error.</PageLead>
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <VarProse>
            <p>
              We were not able to find the page you are looking for. It may have
              been archived or removed.
            </p>
            <p>
              If you think this page should be here let us know via{' '}
              <a href='mailto:info@satsummit.io' title='Send us an email'>
                info@satsummit.io
              </a>
            </p>
          </VarProse>
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default UhOh;
