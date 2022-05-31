import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

import { themeVal } from '@devseed-ui/theme-provider';

import { variableGlsp } from '$styles/variable-utils';
import { VarHeading, VarLead, VarProse } from '$styles/variable-components';
import { Newsletter } from '$components/newsletter';

import Layout from '$components/layout';
import { Figcaption, Figure, FigureAttribution } from '$components/figure';

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  padding: ${variableGlsp()};
  color: ${themeVal('color.surface')};
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0.5rem 0 ${themeVal('color.primary-500')});

  &::before {
    position: absolute;
    z-index: -1;
    inset: 0;
    background: ${themeVal('color.base')};
    clip-path: polygon(0 0, 100% 0, 100% 64%, 0 100%);
    content: '';
  }
`;

const Title = styled(VarHeading).attrs({
  as: 'h1',
  size: 'jumbo'
})`
  /* styled-component */
`;

const Slogan = styled(VarLead).attrs({
  as: 'p'
})`
  /* styled-component */
`;

const Meta = styled.p`
  order: -1;

  span {
    font-size: 0;

    &::before {
      content: '•';
      font-size: 1rem;
    }
  }
`;

const Block = styled.section`
  padding: ${variableGlsp()};
`;

const BlockTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'xxlarge'
})`
  /* styled-component */
`;

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <Hero>
          <Title>SatSummit 2022</Title>
          <Slogan>Satellite data for global development.</Slogan>
          <Meta>
            <time dateTime='2022-09-28/2022-09-29'>September 28 & 29</time>{' '}
            <span>in</span> Washington, DC
          </Meta>
        </Hero>

        <Block>
          <BlockTitle>About</BlockTitle>
          <VarProse>
            <p>
              SatSummit convenes leaders in the satellite industry and experts
              in global development for 2 days of presentations and in-depth
              conversations on solving the world&apos;s most critical
              development challenges with satellite data. From climate change to
              population growth to natural resource availability, earth
              observation data offers insights into today&apos;s biggest global
              issues. Stay tuned for more information on SatSummit 2022!
            </p>
          </VarProse>
        </Block>

        <Block>
          <BlockTitle>How do I register?</BlockTitle>
          <VarProse>
            <p>
              Registration is not yet open. Please sign-up to be the first to
              receive updates about SatSummit 2022, including when Registration
              opens.
            </p>
            <Newsletter />
          </VarProse>
        </Block>

        <Block>
          <BlockTitle>Sponsorship opportunities</BlockTitle>
          <VarProse>
            <p>
              We&apos;re excited to partner with thought and industry leaders in
              the satellite and development communities, and through their
              sponsorship and support of SatSummit, we are solving real-world
              and global development challenges. Please contact{' '}
              <a href='mailto:sponsorship@satsummit.io'>
                sponsorship@satsummit.io
              </a>{' '}
              to get involved!
            </p>
          </VarProse>
        </Block>

        <Block>
          <BlockTitle>Where is SatSummit being held?</BlockTitle>
          <VarProse>
            <p>
              SatSummit will take place at{' '}
              <a href='https://convene.com/locations/washington-dc/600-14th-street-nw/'>
                CONVENE
              </a>
              , located at 600 14th St NW, Washington, DC 20005.
            </p>
          </VarProse>
        </Block>

        <Block>
          <Figure>
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
          </Figure>
        </Block>
      </main>
    </Layout>
  );
};

export default IndexPage;
