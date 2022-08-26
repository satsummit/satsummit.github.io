import { graphql, useStaticQuery } from 'gatsby';
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
import { EmbedWidget } from '$styles/embed-widget';

const TicketsPage = () => {
  const { talks } = useStaticQuery(graphql`
    query {
      talks: letter(slug: { in: "call-for-lightning-talks" }) {
        parent {
          ... on MarkdownRemark {
            html
          }
        }
      }
    }
  `);

  return (
    <Layout title='Call for Lightning Talks & Session Ideas'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>
              Call for Lightning Talks & Session Ideas
            </PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <VarProse dangerouslySetInnerHTML={{ __html: talks.parent.html }} />
          <VarProse>
            <EmbedWidget>
              <iframe
                src='https://docs.google.com/forms/d/e/1FAIpQLSd7N64dWSdFyRuL27gMBcKi5QoIXUXrygn_p1HsCORvo5Io3w/viewform?embedded=true'
                width='100%'
                height={800}
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
              >
                Loading…
              </iframe>
            </EmbedWidget>
          </VarProse>
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default TicketsPage;
