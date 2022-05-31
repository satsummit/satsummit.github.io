import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

import { themeVal } from '@devseed-ui/theme-provider';

import { variableGlsp } from '$styles/variable-utils';
import { VarHeading, VarProse } from '$styles/variable-components';
import { Newsletter } from '$components/newsletter';

import Layout from '$components/layout';
import { Figcaption, Figure, FigureAttribution } from '$components/figure';
import Hug from '$styles/hug';
import { CollecticonBrandSatsummit } from '@devseed-ui/collecticons';

import heroFigure from '../images/welcome-hero.jpg';

const Hero = styled.div`
  filter: drop-shadow(0 0.5rem 0 ${themeVal('color.primary-500')});
`;

const HeroInner = styled.div`
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
  background: ${themeVal('color.base')};
  clip-path: polygon(0 0, 100% 0, 100% 72%, 0 100%);
`;

const HeroHeadline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: ${variableGlsp(4)};

  ${CollecticonBrandSatsummit} {
    order: -2;
    margin-bottom: ${variableGlsp(1.5)};
    transform: rotate(45deg);
  }
`;

const HeroTitle = styled(VarHeading).attrs({
  as: 'h1'
})`
  font-size: clamp(3.5rem, 12vw, 8rem);
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.25rem, 4vw, 2rem);
`;

const HeroOverline = styled(VarHeading).attrs({
  as: 'p',
  size: 'large'
})`
  order: -1;

  span {
    font-size: 0;

    &::before {
      content: '•';
      font-size: 2rem;
      margin: 0 0.5rem;
    }
  }
`;

const HeroFigure = styled(Figure)`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    ${themeVal('color.base-500')} 0%,
    ${themeVal('color.primary-500')}64 100%
  );

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    mix-blend-mode: screen;
  }

  &::after {
    position: absolute;
    z-index: 40;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      to top,
      ${themeVal('color.base-500')} 0%,
      ${themeVal('color.base-500')}00 100%
    );
    content: '';
  }
`;

const BlockGrid = styled(Hug)`
  padding: ${variableGlsp(2)};

  ${Figure} {
    border-top: 0.5rem solid ${themeVal('color.primary-500')};
  }
`;

const BlockGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp(1)};
  padding: ${variableGlsp(2)};
`;

const Block = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp()};

  &:not(:first-child) {
    padding-top: ${variableGlsp(1)};
    border-top: 0.5rem solid ${themeVal('color.primary-500')};
  }
`;

const BlockHeader = styled.header`
  /* styled-component */
`;

const BlockBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp()};
`;

const BlockTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'xxlarge'
})`
  /* styled-component */
`;

const BlockGroupAlpha = styled(BlockGroup)`
  grid-column: content-7 / content-end;
  grid-row: 1;
  margin-top: ${variableGlsp(-4)};
`;

const BlockGroupBeta = styled(BlockGroup)`
  grid-column: content-start / content-7;
  grid-row: 3;
  margin-top: ${variableGlsp(4)};
`;

const AboutBlock = styled(Block)`
  /* styled-component */
`;

const RegistrationBlock = styled(Block)`
  /* styled-component */
`;

const SponsorshipBlock = styled(Block)`
  /* styled-component */
`;

const VenueBlock = styled(Block)`
  /* styled-component */
`;

const FigureA = styled(Figure)`
  grid-column: content-start / content-7;
  grid-row: 1;
  align-self: end;
`;

const FigureB = styled(Figure)`
  grid-column: content-start / content-5;
  grid-row: 2;
`;

const FigureC = styled(Figure)`
  grid-column: content-5 / content-end;
  grid-row: 2;
`;

const FigureD = styled(Figure)`
  grid-column: content-7 / content-end;
  grid-row: 3;
`;

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <Hero>
          <HeroInner>
            <HeroHeadline>
              <CollecticonBrandSatsummit
                title='SatSummit logo symbol'
                meaningful
                size='xxlarge'
              />
              <HeroTitle>SatSummit 2022</HeroTitle>
              <HeroSubtitle>
                Satellite data for global development.
              </HeroSubtitle>
              <HeroOverline>
                <time dateTime='2022-09-28/2022-09-29'>Sep. 28 & 29</time>{' '}
                <span>in</span> Washington, DC
              </HeroOverline>
            </HeroHeadline>

            <HeroFigure>
              <img
                src={heroFigure}
                alt='Satellite image of canadian waters teem with phytoplankton'
              />
              <Figcaption>
                <FigureAttribution
                  author='NASA Earth Observatory'
                  url='https://earthobservatory.nasa.gov/images/88687/canadian-waters-teem-with-phytoplankton'
                />
              </Figcaption>
            </HeroFigure>
          </HeroInner>
        </Hero>

        <BlockGrid>
          <BlockGroupAlpha>
            <AboutBlock>
              <BlockHeader>
                <BlockTitle>About</BlockTitle>
              </BlockHeader>
              <BlockBody>
                <VarProse>
                  <p>
                    SatSummit convenes leaders in the satellite industry and
                    experts in global development for 2 days of presentations
                    and in-depth conversations on solving the world&apos;s most
                    critical development challenges with satellite data.
                  </p>
                  <p>
                    From climate change to population growth to natural resource
                    availability, earth observation data offers insights into
                    today&apos;s biggest global issues. Stay tuned for more
                    information on SatSummit 2022!
                  </p>
                </VarProse>
              </BlockBody>
            </AboutBlock>

            <RegistrationBlock>
              <BlockHeader>
                <BlockTitle>How do I register?</BlockTitle>
              </BlockHeader>
              <BlockBody>
                <VarProse>
                  <p>
                    Registration is not yet open. Please sign-up to be the first
                    to receive updates about SatSummit 2022, including when
                    registration opens.
                  </p>
                </VarProse>
                <Newsletter />
              </BlockBody>
            </RegistrationBlock>
          </BlockGroupAlpha>

          <BlockGroupBeta>
            <SponsorshipBlock>
              <BlockHeader>
                <BlockTitle>Sponsorship opportunities</BlockTitle>
              </BlockHeader>
              <BlockBody>
                <VarProse>
                  <p>
                    We&apos;re excited to partner with thought and industry
                    leaders in the satellite and development communities, and
                    through their sponsorship and support of SatSummit, we are
                    solving real-world and global development challenges. Please
                    contact{' '}
                    <a href='mailto:info@satsummit.io'>info@satsummit.io</a> to
                    get involved!
                  </p>
                </VarProse>
              </BlockBody>
            </SponsorshipBlock>

            <VenueBlock>
              <BlockHeader>
                <BlockTitle>Where is SatSummit being held?</BlockTitle>
              </BlockHeader>
              <BlockBody>
                <VarProse>
                  <p>
                    SatSummit will take place at{' '}
                    <a href='https://convene.com/locations/washington-dc/600-14th-street-nw/'>
                      CONVENE
                    </a>
                    , located at 600 14th St NW, Washington, DC 20005.
                  </p>
                </VarProse>
              </BlockBody>
            </VenueBlock>
          </BlockGroupBeta>

          <FigureA>
            <StaticImage
              src='../images/fig01.jpg'
              alt='Image alt'
              placeholder='blurred'
              layout='constrained'
              width={1000}
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
              src='../images/fig01.jpg'
              alt='Image alt'
              placeholder='blurred'
              layout='constrained'
              width={1000}
            />
            <Figcaption>
              <FigureAttribution
                author='Mapbox'
                url='https://www.flickr.com/photos/mapbox/43082615860/'
              />
            </Figcaption>
          </FigureB>

          <FigureC>
            <StaticImage
              src='../images/fig01.jpg'
              alt='Image alt'
              placeholder='blurred'
              layout='constrained'
              width={1000}
            />
            <Figcaption>
              <FigureAttribution
                author='Mapbox'
                url='https://www.flickr.com/photos/mapbox/43082615860/'
              />
            </Figcaption>
          </FigureC>

          <FigureD>
            <StaticImage
              src='../images/fig01.jpg'
              alt='Image alt'
              placeholder='blurred'
              layout='constrained'
              width={1000}
            />
            <Figcaption>
              <FigureAttribution
                author='Mapbox'
                url='https://www.flickr.com/photos/mapbox/43082615860/'
              />
            </Figcaption>
          </FigureD>
        </BlockGrid>
      </main>
    </Layout>
  );
};

export default IndexPage;
