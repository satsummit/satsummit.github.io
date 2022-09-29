import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { media, multiply, themeVal } from '@devseed-ui/theme-provider';

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
import { CollecticonCirclePlay } from '@devseed-ui/collecticons';

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
  justify-content: center;
  align-items: center;
  color: ${themeVal('color.surface')};
  background: ${themeVal('color.primary')};
  padding: ${variableGlsp()};
`;

const LivestreamCountdownInner = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp()};
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LivestreamCountdownTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'medium'
})`
  position: absolute;
  top: 0;
  transform: translateY(-128%);

  ${media.mediumUp`
    transform: translateY(-200%);
  `}
`;

const LivestreamCountdownIllu = styled(CollecticonCirclePlay)`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0.08;
  width: 64%;
  height: 64%;
`;

const Timer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: center;
`;

const TimerBlock = styled.div`
  flex: 0 1 12rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
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
              <LivestreamCountdownInner>
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
              </LivestreamCountdownInner>
              <LivestreamCountdownIllu />
            </LivestreamCountdown>
          ) : (
            <LivestreamCountdown>
              <LivestreamCountdownInner>
                <VarHeading as='h2' size='medium'>
                  SatSummit 2022 has ended
                </VarHeading>
                <p>Thank you all for join us virtually!</p>
              </LivestreamCountdownInner>
              <LivestreamCountdownIllu />
            </LivestreamCountdown>
          )}
        </LivestreamBlock>
        <BlockAlpha>
          <VarProse dangerouslySetInnerHTML={{ __html: talks.parent.html }} />
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default LivestreamPage;
