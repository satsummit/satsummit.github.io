import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import Layout from '$components/layout';

import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';

import { BlockAlpha } from '$styles/blocks';
import { VarProse } from '$styles/variable-components';

const LivestreamBlock = styled.div`
  aspect-ratio: 16/9;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  max-height: 44rem;

  > * {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const LivestreamPage = () => {
  const { talks } = useStaticQuery(graphql`
    query {
      talks: letter(slug: { in: "livestream" }) {
        parent {
          ... on MarkdownRemark {
            html
          }
        }
      }
    }
  `);

  return (
    <Layout title='Livestream'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Livestream</PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <VarProse dangerouslySetInnerHTML={{ __html: talks.parent.html }} />
          <VarProse>
            <LivestreamBlock>
              <iframe
                src='https://player.restream.io/?token=efbb246f3bf94543885adaf970929981'
                allow='autoplay'
                allowFullScreen
              />
            </LivestreamBlock>
          </VarProse>
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default LivestreamPage;
