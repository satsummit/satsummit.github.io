import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { glsp, listReset, media } from '@devseed-ui/theme-provider';
import { CollecticonArrowRight } from '@devseed-ui/collecticons';

import Hug from '$styles/hug';
import MenuLinkAppearance from '$styles/menu-link';

import { Button } from '@devseed-ui/button';

import { variableGlsp } from '$styles/variable-utils';
import { useMediaQuery } from '$utils/use-media-query';

import Brand from './brand';

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
  ${MenuLinkAppearance}
`;

const GlobalMenuLinkPlaceholder = styled.span`
  ${MenuLinkAppearance}
  cursor: not-allowed;

  &,
  &:hover {
    opacity: 0.32;
  }
`;

function PageHeader() {
  const { isLargeUp } = useMediaQuery();

  return (
    <PageHeaderSelf>
      <PageHeaderInner>
        <Brand />
        <GlobalNav aria-label='Global'>
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
                Get tickets <CollecticonArrowRight />
              </Button>
            </li>
          </GlobalMenu>
        </GlobalNav>
      </PageHeaderInner>
    </PageHeaderSelf>
  );
}

export default PageHeader;
