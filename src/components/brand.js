import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

import { glsp, media, themeVal } from '@devseed-ui/theme-provider';
import { CollecticonBrandSatsummit } from '@devseed-ui/collecticons';

import { VarHeading } from '$styles/variable-components';

import { useMediaQuery } from '$utils/use-media-query';

const BrandSelf = styled.strong`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${themeVal('color.base-500')};
`;

const BrandLink = styled(Link)`
  display: inline-flex;
  gap: ${glsp(0.5)};
  align-items: center;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.24s ease;

  ${media.mediumUp`
    gap: ${glsp(0.75)};
  `}

  &:hover {
    opacity: 0.64;
  }
`;

const BrandLabel = styled(VarHeading).attrs({
  as: 'i',
  size: 'small'
})`
  font-weight: 700;

  i {
    font-style: normal;
  }

  i:nth-of-type(1) {
    color: ${themeVal('color.primary')};
  }

  i:nth-of-type(2) {
    color: ${themeVal('color.secondary')};
  }
`;

function Brand() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          edition
        }
      }
    }
  `);

  const { isLargeUp } = useMediaQuery();

  return (
    <BrandSelf>
      <BrandLink to='/'>
        <CollecticonBrandSatsummit
          title='SatSummit logo symbol'
          meaningful
          size={isLargeUp ? 'xlarge' : 'large'}
        />
        <BrandLabel>
          <i>{data.site.siteMetadata.title}</i>{' '}
          <i>{data.site.siteMetadata.edition}</i>
        </BrandLabel>
      </BrandLink>
    </BrandSelf>
  );
}

export default Brand;
