import React from 'react';
import Fade from 'react-reveal/Fade';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

import {
  media,
  multiply,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';
import { Button } from '@devseed-ui/button';
import {
  CollecticonArrowRight,
  CollecticonBrandSatsummit
} from '@devseed-ui/collecticons';

import { variableGlsp } from '$styles/variable-utils';
import { VarHeading, VarProse } from '$styles/variable-components';

import Layout from '$components/layout';
import { Figcaption, Figure, FigureAttribution } from '$components/figure';

import Hug from '$styles/hug';
import { PageMainContent } from '$styles/page';

import { useMediaQuery } from '$utils/use-media-query';
import withReveal from '$utils/with-reveal';

const satTranslation = keyframes`
  0% {
    transform: rotate(45deg);
  }

  50% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(-45deg);
  }
`;

const Intro = styled.div`
  filter: drop-shadow(0 8px 0 ${themeVal('color.secondary-500')});

  /* Improve performance */
  transform: translate3d(0, 0, 0);
`;

const IntroInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: clamp(16rem, 80vh, 48rem);
  padding: ${variableGlsp()};
  color: ${themeVal('color.surface')};
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${themeVal('color.secondary')};
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 72%);

  ${media.largeUp`
    clip-path: polygon(0 0, 100% 0, 100% 72%, 0 100%);
  `}
`;

const IntroHeadline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: ${variableGlsp(6)};

  ${media.mediumUp`
    margin-bottom: ${variableGlsp(4)};
  `}

  ${media.xlargeUp`
    margin-bottom: ${variableGlsp(3)};
  `}

  ${CollecticonBrandSatsummit} {
    order: -2;
    margin-bottom: ${variableGlsp()};
    transform: rotate(45deg);
    animation: ${satTranslation} linear 32s infinite alternate 4s;
  }
`;

const IntroTitle = styled(VarHeading).attrs({
  as: 'h1'
})`
  font-size: clamp(3.5rem, 12vw, 8rem);

  span {
    font-size: 0;
  }
`;

const IntroSubtitle = styled.p`
  font-size: clamp(1.25rem, 4vw, 2rem);
`;

const IntroOverline = styled(VarHeading).attrs({
  as: 'p',
  size: 'large'
})`
  order: -1;

  span {
    font-size: 0;

    &::before {
      content: '•';
      font-size: 1.75rem;
      margin: 0 0.25rem;

      ${media.mediumUp`
        font-size: 2rem;
        margin: 0 0.5rem;
      `}
    }
  }
`;

const IntroFigure = styled(Figure)`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    ${themeVal('color.primary-500')} 0%,
    ${themeVal('color.secondary-500')}64 100%
  );

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    mix-blend-mode: screen;
  }

  &::after {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      to top,
      ${themeVal('color.primary-500')} 0%,
      ${themeVal('color.primary-500')}00 100%
    );
    content: '';
  }

  figcaption {
    ${visuallyHidden()}
  }
`;

const BlockGrid = styled(Hug)`
  padding: ${variableGlsp(2, 0)};
`;

const BlockGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp(2)};

  ${media.mediumUp`
    padding: ${variableGlsp(2)};
  `}
`;

const Block = withReveal(
  styled.section`
    display: flex;
    flex-direction: column;
    gap: ${variableGlsp()};

    &:not(:first-child) {
      padding-top: ${variableGlsp()};
      border-top: ${multiply(themeVal('layout.border'), 4)} solid
        ${themeVal('color.secondary-500')};
      margin-top: ${variableGlsp(-0.75)};
    }
  `,
  <Fade />
);

const BlockGroupAlpha = styled(BlockGroup)`
  grid-column: content-start / content-end;
  grid-row: 1;
  margin: ${variableGlsp(-4, 0, 2, 0)};

  ${media.mediumUp`
    margin: ${variableGlsp(-5, 0, 0, 0)};
  `}

  ${media.largeUp`
    grid-column: content-7 / content-end;
  `}
`;

const BlockGroupBeta = styled(BlockGroup)`
  grid-column: content-start / content-end;
  grid-row: 4;
  margin: ${variableGlsp(2, 0)};

  ${media.mediumUp`
    margin: ${variableGlsp(0)};
  `}

  ${media.largeUp`
    grid-column: content-start / content-7;
    grid-row: 3;
    margin: ${variableGlsp(2, 0, -4, 0)};
    padding-bottom: 0;
  `}

  ${media.xlargeUp`
    margin-bottom: 0;
  `}
`;

const FigureStyled = styled(Figure)`
  border-top: ${multiply(themeVal('layout.border'), 4)} solid
    ${themeVal('color.secondary-500')};

  .gatsby-image-wrapper {
    background: linear-gradient(
      to top,
      ${themeVal('color.primary-500')}48 0%,
      ${themeVal('color.secondary-500')}08 100%
    );
  }

  img {
    mix-blend-mode: multiply;
  }
`;

const FigureA = withReveal(
  styled(FigureStyled)`
    grid-column: content-start / content-end;
    align-self: end;
    grid-row: 2;

    ${media.largeUp`
      grid-row: 1;
      grid-column: content-start / content-7;
    `}
  `,
  <Fade />
);

const FigureB = withReveal(
  styled(FigureStyled)`
    grid-column: full-start / content-4;
    grid-row: 3;

    ${media.smallUp`
      grid-column: content-start / content-4;
    `}

    ${media.mediumUp`
      grid-column: content-start / content-5;
    `}

    ${media.largeUp`
      grid-column: content-start / content-5;
      grid-row: 2;
    `}
  `,
  <Fade />
);

const FigureC = withReveal(
  styled(FigureStyled)`
    grid-column: content-start / full-end;
    grid-row: 5;

    ${media.mediumUp`
      grid-column: content-2 / full-end;
    `}

    ${media.largeUp`
      grid-column: content-5 / content-end;
      grid-row: 2;
    `}
  `,
  <Fade />
);

const FigureD = withReveal(
  styled(FigureStyled)`
    grid-column: content-2 / content-end;
    grid-row: 6;

    ${media.mediumUp`
      grid-column: content-2 / content-8;
    `}

    ${media.largeUp`
      grid-column: content-7 / content-end;
      grid-row: 3;
    `}
  `,
  <Fade />
);

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          subtitle
          edition
        }
      }
    }
  `);

  return (
    <Layout>
      <PageMainContent>
        <Intro>
          <IntroInner>
            <IntroHeadline>
              <CollecticonBrandSatsummit size='xxlarge' />
              <IntroTitle>
                {data.site.siteMetadata.title}
                <span> is back. Welcome to the</span>{' '}
                {data.site.siteMetadata.edition}
                <span> edition!</span>
              </IntroTitle>
              <IntroSubtitle>{data.site.siteMetadata.subtitle}</IntroSubtitle>
              <IntroOverline>
                <time dateTime='2022-09-28/2022-09-29'>Sep. 28 & 29</time>{' '}
                <span>in</span> Washington, DC
              </IntroOverline>
            </IntroHeadline>
            <IntroFigure>
              <StaticImage
                style={{ position: 'static' }}
                src='../images/welcome-intro.jpg'
                alt='Satellite image of canadian waters teem with phytoplankton'
              />
              <Figcaption>
                <FigureAttribution
                  author='NASA Earth Observatory'
                  url='https://earthobservatory.nasa.gov/images/88687/canadian-waters-teem-with-phytoplankton'
                />
              </Figcaption>
            </IntroFigure>
          </IntroInner>
        </Intro>

        <BlockGrid>
          <BlockGroupAlpha>
            <Block>
              <VarProse>
                <h2>About</h2>
                <p>
                  <strong>SatSummit</strong> convenes leaders in the satellite
                  industry and experts in global development for 2 days of
                  presentations and in-depth conversations on solving the
                  world&apos;s most critical development challenges with
                  satellite data.
                </p>
                <p>
                  From climate change to population growth to natural resource
                  availability, earth observation data offers insights into
                  today&apos;s biggest global issues. Stay tuned for more
                  information on <strong>SatSummit 2022</strong>!
                </p>
              </VarProse>
            </Block>

            <TicketsCallout />
          </BlockGroupAlpha>

          <BlockGroupBeta>
            <Block>
              <VarProse>
                <h2>Where is SatSummit being held?</h2>
                <p>
                  SatSummit will take place at{' '}
                  <a href='https://convene.com/locations/washington-dc/600-14th-street-nw/'>
                    <strong>Convene</strong>
                  </a>
                  , located at 600 14th St NW, Washington, DC 20005.
                </p>
              </VarProse>
            </Block>

            <HealthProtocolsCallout />
          </BlockGroupBeta>

          <FigureA>
            <StaticImage
              src='../images/content-06.jpg'
              alt='A moment from SatSummit 2018'
              placeholder='blurred'
              layout='constrained'
              width={960}
            />
            <Figcaption>
              <FigureAttribution
                author='Mapbox'
                url='https://www.flickr.com/photos/mapbox/43082615860/'
              />
            </Figcaption>
          </FigureA>

          <FigureB>
            <StaticImage
              src='../images/content-04.jpg'
              alt='A moment from SatSummit 2018'
              placeholder='blurred'
              layout='constrained'
              width={960}
            />
            <Figcaption>
              <FigureAttribution
                author='Mapbox'
                url='https://www.flickr.com/photos/147278163@N08/31875079283/'
              />
            </Figcaption>
          </FigureB>

          <FigureC>
            <StaticImage
              src='../images/content-07.jpg'
              alt='A moment from SatSummit 2018'
              placeholder='blurred'
              layout='constrained'
              width={960}
            />
            <Figcaption>
              <FigureAttribution
                author='Mapbox'
                url='https://www.flickr.com/photos/mapbox/29957540547/'
              />
            </Figcaption>
          </FigureC>

          <FigureD>
            <StaticImage
              src='../images/content-05.jpg'
              alt='A moment from SatSummit 2018'
              placeholder='blurred'
              layout='constrained'
              width={960}
            />
            <Figcaption>
              <FigureAttribution
                author='Mapbox'
                url='https://www.flickr.com/photos/mapbox/43082616700/'
              />
            </Figcaption>
          </FigureD>
        </BlockGrid>
      </PageMainContent>
    </Layout>
  );
};

export default IndexPage;

function TicketsCallout() {
  const { isLargeUp } = useMediaQuery();

  return (
    <Block>
      <VarProse>
        <h2>How do I register?</h2>
        <p>
          Registration for in-person attendance is available now! Onsite
          registration will not be available. Virtual participation tickets will
          be available at a later date.
        </p>
      </VarProse>
      <div>
        <Button
          forwardedAs={Link}
          variation='base-fill'
          to='/tickets'
          size={isLargeUp ? 'xlarge' : 'large'}
          fitting='relaxed'
        >
          Get tickets <CollecticonArrowRight />
        </Button>
      </div>
    </Block>
  );
}

function HealthProtocolsCallout() {
  const { isLargeUp } = useMediaQuery();

  return (
    <Block>
      <VarProse>
        <h2>Health Protocols</h2>
        <p>
          We want everyone to have a safe and enjoyable conference. We have put
          guidance in place which you can review.
        </p>
        <p>
          We will follow CDC guidance and any Washington, DC protocols that are
          in effect at the time, and we will update or modify our health
          protocols accordingly.
        </p>
      </VarProse>
      <div>
        <Button
          forwardedAs={Link}
          variation='base-fill'
          to='/health-protocols'
          size={isLargeUp ? 'xlarge' : 'large'}
          fitting='relaxed'
        >
          Learn more <CollecticonArrowRight />
        </Button>
      </div>
    </Block>
  );
}
