import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { Heading } from '@devseed-ui/typography';

import Layout from '$components/layout';
import Hug from '$styles/hug';
import { variableGlsp } from '$styles/variable-utils';
import { Figcaption, Figure, FigureAttribution } from '$components/figure';


const Hero = styled(Hug)`
  padding: ${variableGlsp()};
`;

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <Hero>
          <Heading>SatSummit</Heading>
          <p>Hello world.</p>
        </Hero>

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
      </main>
    </Layout>
  );
};

export default IndexPage;
