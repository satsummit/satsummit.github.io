import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

import { glsp, media, themeVal } from '@devseed-ui/theme-provider';

import { variableGlsp } from '$styles/variable-utils';
import { VarHeading } from '$styles/variable-components';
import Hug from '$styles/hug';

import { CollecticonBrandSatsummit } from '@devseed-ui/collecticons';
import { Button } from '@devseed-ui/button';
import { useMediaQuery } from '$utils/use-media-query';

const PageHeaderSelf = styled(Hug).attrs({
  as: 'header'
})`
  padding: ${variableGlsp(1, 0)};
`;

const PageHeaderInner = styled.div`
  grid-column: content-start / content-end;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: ${variableGlsp()};

  &,
  &:visited {
    color: ${themeVal('color.primary')};
  }
`;

const Brand = styled.span`
  flex-shrink: 0;

  a {
    display: flex;
    gap: ${glsp(0.5)};
    align-items: center;
    color: inherit;
    text-decoration: none;
    transition: opacity 0.24s ease;

    ${media.mediumUp`
      gap: ${glsp(0.75)};
    `}
  }

  a:hover {
    opacity: 0.64;
  }
`;

const BrandLabel = styled(VarHeading).attrs({
  as: 'span',
  size: 'small'
})`
  font-weight: 700;

  span:last-of-type {
    color: ${themeVal('color.secondary')};
  }
`;

const GlobalCTA = styled.div`
  margin-left: auto;
`;

function PageHeader() {
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
    <PageHeaderSelf>
      <PageHeaderInner>
        <Brand>
          <Link to='/'>
            <CollecticonBrandSatsummit
              title='SatSummit logo symbol'
              meaningful
              size={isLargeUp ? 'xlarge' : 'large'}
            />
            <BrandLabel>
              <span>{data.site.siteMetadata.title}</span>{' '}
              <span>{data.site.siteMetadata.edition}</span>
            </BrandLabel>
          </Link>
        </Brand>
        <GlobalCTA>
          <Button
            forwardedAs={Link}
            variation='base-outline'
            size={isLargeUp ? 'large' : 'medium'}
            to='/tickets'
          >
            Get tickets
          </Button>
        </GlobalCTA>
      </PageHeaderInner>
    </PageHeaderSelf>
  );
}

export default PageHeader;
