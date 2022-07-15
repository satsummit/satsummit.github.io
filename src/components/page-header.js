import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

import { glsp, listReset, media, themeVal } from '@devseed-ui/theme-provider';

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

const Brand = styled.strong`
  flex-shrink: 0;
`;

const BrandLink = styled(Link)`
  display: flex;
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
  as: 'span',
  size: 'small'
})`
  font-weight: 700;

  span:last-of-type {
    color: ${themeVal('color.secondary')};
  }
`;

const GlobalNav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-left: auto;
`;

const GlobalMenu = styled.ul`
  ${listReset()}
  display: flex;
  flex-flow: column nowrap;
  gap: ${glsp(0.5)};

  ${media.xlargeUp`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: ${glsp(1.5)};
  `}
`;

const GlobalMenuLink = styled(Link)`
  display: block;
  font-family: ${themeVal('button.type.family')};
  font-weight: ${themeVal('button.type.weight')};
  text-transform: ${themeVal('button.type.case')};
  color: inherit;
  text-decoration: none;
  transition: opacity 0.24s ease;

  &:hover {
    opacity: 0.64;
  }
`;

const GlobalMenuLinkPlaceholder = styled.span`
  display: block;
  font-family: ${themeVal('button.type.family')};
  font-weight: ${themeVal('button.type.weight')};
  text-transform: ${themeVal('button.type.case')};
  color: inherit;
  text-decoration: none;
  transition: opacity 0.24s ease;
  opacity: 0.32;
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
          <BrandLink to='/'>
            <CollecticonBrandSatsummit
              title='SatSummit logo symbol'
              meaningful
              size={isLargeUp ? 'xlarge' : 'large'}
            />
            <BrandLabel>
              <span>{data.site.siteMetadata.title}</span>{' '}
              <span>{data.site.siteMetadata.edition}</span>
            </BrandLabel>
          </BrandLink>
        </Brand>
        <GlobalNav>
          <GlobalMenu>
            <GlobalMenuLink to='/'>Welcome</GlobalMenuLink>
            <GlobalMenuLinkPlaceholder aria-hidden='true'>
              Agenda
            </GlobalMenuLinkPlaceholder>
            <GlobalMenuLinkPlaceholder aria-hidden='true'>
              Speakers
            </GlobalMenuLinkPlaceholder>
            <GlobalMenuLink to='/code-of-conduct'>
              Code of Conduct
            </GlobalMenuLink>
            <li>
              <Button
                forwardedAs={Link}
                variation='base-outline'
                size={isLargeUp ? 'large' : 'medium'}
                to='/tickets'
              >
                Get tickets
              </Button>
            </li>
          </GlobalMenu>
        </GlobalNav>
      </PageHeaderInner>
    </PageHeaderSelf>
  );
}

export default PageHeader;
