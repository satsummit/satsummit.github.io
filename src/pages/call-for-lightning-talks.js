import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Layout from '$components/layout';

import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';

import { themeVal } from '@devseed-ui/theme-provider';

import { BlockAlpha } from '$styles/blocks';
import { VarProse } from '$styles/variable-components';
import { variableGlsp } from '$styles/variable-utils';

const TicketsWidget = styled.div`
  margin-top: ${variableGlsp(0.75)};
  border: ${themeVal('shape.border')} solid ${themeVal('color.base-100')};
  border-radius: ${themeVal('shape.rounded')};
  padding: ${variableGlsp()};
`;

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
    <Layout title='Call for lightning talks'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Call for lightning talks</PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <VarProse dangerouslySetInnerHTML={{ __html: talks.parent.html }} />
          <VarProse>
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
          </VarProse>
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default TicketsPage;
