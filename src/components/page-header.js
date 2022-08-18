import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

import { glsp, listReset, media, themeVal } from '@devseed-ui/theme-provider';
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
    z-index: 50;
    inset: 0;
    background: ${themeVal('color.surface')};
    content: '';

    ${media.largeUp`
      z-index: 1;
    `}
  }
`;

const PageHeaderInner = styled.div`
  grid-column: content-start / content-end;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: ${variableGlsp()};

  > * {
    position: relative;
    z-index: 60;
  }
`;

const GlobalNavToggle = styled(Button)`
  margin-left: auto;

  ${media.largeUp`
    display: none;
  `}
`;

const GlobalNav = styled.nav`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 20;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  transform: translate(0, -100%);
  will-change: transform;
  transition: all 0.32s ease-in-out 0s;

  ${media.largeUp`
    position: static;
    height: auto;
    flex-direction: row;
    transform: translate(0, 0);
    margin-left: auto;
  `}

  ${({ revealed }) =>
    revealed &&
    css`
      transform: translate(0, 0);
    `}

  &::after {
    position: absolute;
    content: '';
    inset: 0;
    z-index: -1;
    background: ${themeVal('color.base-400a')};

    ${media.largeUp`
      display: none;
    `}
  }
`;

const GlobalNavInner = styled.div`
  background: ${themeVal('color.surface')};
  padding: ${variableGlsp(0, 1, 1, 1)};
  box-shadow: ${themeVal('boxShadow.elevationD')};

  ${media.largeUp`
    padding: 0;
    box-shadow: none;
  `}
`;

const GlobalMenu = styled.ul`
  ${listReset()}
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;

  gap: ${glsp(0.25)};
  padding-top: ${variableGlsp()};
  border-top: 4px solid ${themeVal('color.secondary-500')};

  ${media.mediumUp`
    flex-direction: row;
    align-items: center;
    gap: ${glsp(1.5)};
  `}

  ${media.largeUp`
    gap: ${glsp(2)};
    padding: 0;
    border: 0;
  `}

  li:last-child {
    margin-top: ${glsp(0.75)};

    ${media.mediumUp`
      margin: 0 0 0 auto;
    `}

    ${media.largeUp`
      margin: 0;
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

  const globalNavBodyRef = useRef(null);
  // Click listener for the whole global nav body so we can close it when
  // clicking the overlay on medium down media query.
  const onGlobalNavClick = useCallback((e) => {
    // Any click on the global nav will close it except if in the GlobalNavInner
    // (first and only child). This is the only way to reach the ::after pseudo
    // element.
    const child = globalNavBodyRef.current?.children[0];
    if (!child?.contains(e.target)) {
      setNavRevealed(false);
    }
  }, []);

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

        <GlobalNav
          aria-label='Global'
          revealed={navRevealed}
          ref={globalNavBodyRef}
          onClick={onGlobalNavClick}
        >
          <GlobalNavInner>
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
                <GlobalMenuLink to='/call-for-lightning-talks'>
                  Call for Lightning Talks
                </GlobalMenuLink>
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
          </GlobalNavInner>
        </GlobalNav>
      </PageHeaderInner>
    </PageHeaderSelf>
  );
}

export default PageHeader;
