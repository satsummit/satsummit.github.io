import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { multiply, themeVal } from '@devseed-ui/theme-provider';

import Layout from '$components/layout';

import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';

import { BlockAlpha } from '$styles/blocks';
import { VarProse } from '$styles/variable-components';

import { variableGlsp } from '$styles/variable-utils';

const LivestreamBlock = styled.div`
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  aspect-ratio: 16/9;
  width: 100vw;
  max-height: 44rem;
  border-top: ${multiply(themeVal('layout.border'), 4)} solid
    ${themeVal('color.secondary-500')};

  > * {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const LivestreamCountdown = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: ${themeVal('color.surface')};
  background: ${themeVal('color.primary')};
  padding: ${variableGlsp()};
`;

const Timer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: ${variableGlsp(0.25)};
  margin-top: ${variableGlsp(0.5)};
`;

const TimerBlock = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: ${themeVal('layout.border')} solid ${themeVal('color.surface-100a')};
  border-radius: ${themeVal('shape.rounded')};
  padding: ${variableGlsp()};

  strong {
    font-family: ${themeVal('type.heading.family')};
    font-weight: ${themeVal('type.heading.weight')};
    font-size: clamp(1.25rem, 12vw, 8rem);
    line-height: 1;
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
              <LivestreamCountdown>
                <h3>Livestreaming in</h3>
                <Timer>
                  <TimerBlock>
                    <strong>01</strong>
                    <span>days</span>
                  </TimerBlock>
                  <TimerBlock>
                    <strong>16</strong>
                    <span>hours</span>
                  </TimerBlock>
                  <TimerBlock>
                    <strong>56</strong>
                    <span>minutes</span>
                  </TimerBlock>
                  <TimerBlock>
                    <strong>24</strong>
                    <span>seconds</span>
                  </TimerBlock>
                </Timer>
              </LivestreamCountdown>
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
