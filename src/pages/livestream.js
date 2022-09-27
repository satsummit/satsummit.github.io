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
import { VarHeading, VarProse } from '$styles/variable-components';

import { variableGlsp } from '$styles/variable-utils';
import { time2Counter, useLive } from '$utils/use-live';
import Pluralize from '$utils/pluralize';

const LivestreamBlock = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  max-height: 44rem;
  border-top: ${multiply(themeVal('layout.border'), 4)} solid
    ${themeVal('color.secondary-500')};
  margin-top: -${multiply(themeVal('layout.border'), 4)};

  > * {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const LivestreamCountdown = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp()};
  justify-content: center;
  align-items: center;
  color: ${themeVal('color.surface')};
  background: ${themeVal('color.primary')};
  padding: ${variableGlsp()};
`;

const LivestreamCountdownTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'medium'
})`
  /* styled-component */
`;

const Timer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: ${variableGlsp(0.5)};
`;

const TimerBlock = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: ${multiply(themeVal('layout.border'), 2)} solid
    ${themeVal('color.surface-100a')};
  border-radius: ${themeVal('shape.rounded')};
  padding: ${variableGlsp()};
`;

const TimerBlockNumber = styled(VarHeading).attrs({
  as: 'strong'
})`
  font-size: clamp(1.25rem, 12vw, 8rem);
  line-height: 1;
`;

const TimerBlockLabel = styled(VarProse).attrs({
  as: 'p'
})`
  /* styled-component */
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

  const { isLive, nextIn } = useLive();

  const [h, m, s] = nextIn ? time2Counter(nextIn) : [];

  return (
    <Layout title='Livestream'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Livestream</PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>
        <LivestreamBlock>
          {isLive ? (
            <iframe
              src='https://player.restream.io/?token=efbb246f3bf94543885adaf970929981'
              allow='autoplay'
              allowFullScreen
            />
          ) : nextIn ? (
            <LivestreamCountdown>
              <LivestreamCountdownTitle>Live in</LivestreamCountdownTitle>
              <Timer>
                <TimerBlock>
                  <TimerBlockNumber>{h}</TimerBlockNumber>
                  <TimerBlockLabel>
                    <Pluralize
                      showCount={false}
                      count={Number(h)}
                      singular='hour'
                    />
                  </TimerBlockLabel>
                </TimerBlock>
                <TimerBlock>
                  <TimerBlockNumber>{m}</TimerBlockNumber>
                  <TimerBlockLabel>
                    <Pluralize
                      showCount={false}
                      count={Number(m)}
                      singular='minute'
                    />
                  </TimerBlockLabel>
                </TimerBlock>
                <TimerBlock>
                  <TimerBlockNumber>{s}</TimerBlockNumber>
                  <TimerBlockLabel>
                    <Pluralize
                      showCount={false}
                      count={Number(s)}
                      singular='second'
                    />
                  </TimerBlockLabel>
                </TimerBlock>
              </Timer>
            </LivestreamCountdown>
          ) : null}
        </LivestreamBlock>
        <BlockAlpha>
          <VarProse dangerouslySetInnerHTML={{ __html: talks.parent.html }} />
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default LivestreamPage;
