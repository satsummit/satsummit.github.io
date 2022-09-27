import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';

import { glsp, multiply, themeVal } from '@devseed-ui/theme-provider';

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
import { createHeadingStyles } from '@devseed-ui/typography';

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
    border-top: ${multiply(themeVal('layout.border'), 4)} solid
      ${themeVal('color.secondary-500')};
  }

  .location-marker {
    position: absolute;
    display: flex;
    flex-direction: row nowrap;
    background: ${themeVal('color.surface')};
    padding: ${glsp(0.5, 1)};
    box-shadow: ${themeVal('boxShadow.elevationD')};
    font-size: ${themeVal('type.base.size')};
    border-radius: ${themeVal('shape.rounded')};

    &,
    > * {
      transition: opacity 0.24s ease;
    }

    &,
    &:visited {
      color: inherit;
      text-decoration: none;
    }

    &:hover {
      > * {
        opacity: 0.64;
      }
    }

    &::after {
      position: absolute;
      top: 100%;
      left: 50%;
      width: ${glsp()};
      height: ${glsp(0.5)};
      transform: translateX(-50%);
      background: ${themeVal('color.surface')};
      content: '';
      clip-path: polygon(100% 0, 0 0, 50% 100%);
      pointer-events: none;
    }

    strong {
      ${createHeadingStyles({ size: 'medium' })}
    }
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
      scrollZoom: false,
      center: [-77.03228, 38.89786],
      zoom: 14
    });

    // Include attribution.
    mbMap.addControl(new mapboxgl.AttributionControl(), 'bottom-right');

    mbMap.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-left'
    );

    // Marker
    const el = document.createElement('a');
    el.href = 'https://convene.com/locations/washington-dc/600-14th-street-nw/';
    el.classList.add('location-marker');
    el.innerHTML = '<strong>Convene</strong>';

    new mapboxgl.Marker({
      element: el
    })
      .setLngLat([-77.03228, 38.89786])
      .addTo(mbMap);

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
