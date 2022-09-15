import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
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
import MapboxStyleOverride from '$styles/mapbox-style-override';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJjbDgwM2xra3kwMmJpM3dyMTNwODVoZjZwIn0.e-ZxA8VIcxhCmR1kprskpQ';

const ProseWithMap = styled(VarProse)`
  #location-map {
    ${MapboxStyleOverride}
    aspect-ratio: 16/9;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    max-height: 44rem;
  }
`;

const InfoPage = () => {
  const { talks } = useStaticQuery(graphql`
    query {
      talks: letter(slug: { in: "practical-info" }) {
        parent {
          ... on MarkdownRemark {
            html
          }
        }
      }
    }
  `);

  useEffect(() => {
    const mbMap = new mapboxgl.Map({
      container: 'location-map',
      style: 'mapbox://styles/devseed/cl803wr4400eh15n04usidflr',
      logoPosition: 'bottom-left',
      attributionControl: false,
      trackResize: true,
      pitchWithRotate: false,
      dragRotate: false,
      scrollZoom: false
    });

    // Include attribution.
    mbMap.addControl(new mapboxgl.AttributionControl(), 'bottom-right');

    mbMap.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-left'
    );

    return () => {
      mbMap.remove();
    };
  }, []);

  return (
    <Layout title='Practical Info'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Practical Info</PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <ProseWithMap
            dangerouslySetInnerHTML={{ __html: talks.parent.html }}
          />
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default InfoPage;
