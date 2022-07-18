import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import {
  glsp,
  listReset,
  media,
  rgba,
  themeVal
} from '@devseed-ui/theme-provider';
import {
  CollecticonArrowRight,
  CollecticonHamburgerMenu,
  CollecticonXmark
} from '@devseed-ui/collecticons';
import { Button } from '@devseed-ui/button';

import Hug from '$styles/hug';
import MenuLinkAppearance from '$styles/menu-link';
import { variableGlsp } from '$styles/variable-utils';
import { useMediaQuery } from '$utils/use-media-query';
import Brand from './brand';
import UnscrollableBody from './unscrollable-body';

const PageHeaderSelf = styled(Hug).attrs({
  as: 'header'
})`
  position: relative;
  padding: ${variableGlsp(1, 0)};

  &::before {
    position: absolute;
    z-index: 30;
    inset: 0;
    background: linear-gradient(
      180deg,
      ${rgba(themeVal('color.surface'), 1)} 75%,
      ${rgba(themeVal('color.surface'), 0)} 100%
    );
    content: '';

    ${media.largeUp`
      display: none;
    `}
  }
`;

const PageHeaderInner = styled.div`
  position: relative;
  grid-column: content-start / content-end;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: ${variableGlsp()};

  > * {
    position: relative;
    z-index: 40;
  }
`;

const GlobalNavToggle = styled(Button)`
  margin-left: auto;
`;

const GlobalNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 20;
  display: flex;
  flex-flow: column nowrap;
  padding: ${variableGlsp(4, 1, 1, 1)};
  overflow: auto;
  pointer-events: auto;
  background: ${themeVal('color.surface')};
  box-shadow: ${themeVal('boxShadow.elevationD')};
  margin: 0;
  transition: all 0.4s ease-in-out 0s;
  transform: translate(0, -100%);
  will-change: transform;

  ${({ revealed }) =>
    revealed &&
    css`
      transform: translate(0, 0);
    `}

  ${media.mediumUp`
    padding: ${variableGlsp(3.25, 1, 1, 1)};
  `}

  ${media.largeUp`
    position: static;
    flex-flow: row nowrap;
    align-items: center;
    margin-left: auto;
    padding: 0;
    box-shadow: none;
    overflow: visible;
    transform: translate(0, 0);
    justify-content: flex-end;
    box-shadow: none;
  `}
`;

const GlobalMenu = styled.ul`
  ${listReset()}
  display: flex;
  flex-flow: column nowrap;
  gap: ${glsp(0.25)};
  padding-top: ${variableGlsp()};
  border-top: 4px solid ${themeVal('color.secondary-500')};

  ${media.largeUp`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: ${glsp(1.5)};
    padding-top: 0;
    border-top: 0;
  `}

  li:last-child {
    margin-top: ${glsp()};

    ${media.largeUp`
      margin-top: 0;
    `}
  }
`;

const GlobalMenuLink = styled(Link).attrs({
  activeClassName: 'active'
})`
  ${MenuLinkAppearance}

  ${media.largeUp`
    height: 2.5rem;
  `}
`;

const GlobalMenuLinkPlaceholder = styled.span`
  ${MenuLinkAppearance}
  cursor: not-allowed;

  ${media.largeUp`
    height: 2.5rem;
  `}

  &,
  &:hover {
    opacity: 0.32;
  }
`;

function PageHeader() {
  const { isLargeUp } = useMediaQuery();
  const [navRevealed, setNavRevealed] = useState(false);

  return (
    <PageHeaderSelf>
      <PageHeaderInner>
        <Brand />
        {!isLargeUp && (
          <GlobalNavToggle
            variation='base-text'
            fitting='skinny'
            onClick={() => setNavRevealed((v) => !v)}
          >
            {navRevealed ? (
              <CollecticonXmark title='Hide navigation' meaningful />
            ) : (
              <CollecticonHamburgerMenu title='Reveal navigation' meaningful />
            )}
          </GlobalNavToggle>
        )}

        {navRevealed && <UnscrollableBody />}

        <GlobalNav aria-label='Global' revealed={navRevealed}>
          <GlobalMenu>
            <li>
              <GlobalMenuLink to='/'>Welcome</GlobalMenuLink>
            </li>
            <li>
              <GlobalMenuLinkPlaceholder aria-hidden='true'>
                Agenda
              </GlobalMenuLinkPlaceholder>
            </li>
            <li>
              <GlobalMenuLinkPlaceholder aria-hidden='true'>
                Speakers
              </GlobalMenuLinkPlaceholder>
            </li>
            <li>
              <GlobalMenuLink to='/code-of-conduct'>
                Code of Conduct
              </GlobalMenuLink>
            </li>
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
