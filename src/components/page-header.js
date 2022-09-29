import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'gatsby';
import T from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

import {
  glsp,
  listReset,
  media,
  multiply,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';
import {
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
import { StreamIcon } from './icon-stream';
import { time2Counter, useLive } from '$utils/use-live';

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

  ${media.mediumUp`
    gap: ${variableGlsp(0.25)};
  `}

  ${media.largeUp`
    gap: ${variableGlsp()};
  `}

  > * {
    position: relative;
    z-index: 60;

    &:first-child {
      margin-right: auto;
    }
  }
`;

const GlobalNavToggle = styled(Button)`
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
  border-top: ${multiply(themeVal('layout.border'), 2)} solid
    ${themeVal('color.secondary-500')};

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
`;

const GlobalMenuLink = styled(Link).attrs({
  activeClassName: 'active'
})`
  ${MenuLinkAppearance}

  ${media.largeUp`
    height: 2.5rem;
  `}
`;

const GlobalAction = styled.div`
  ${media.largeUp`
    order: 3;
  `}
`;

const LivestreamCTASelf = styled.div`
  position: relative;
`;

const Counter = styled.strong`
  display: inline-flex;
  width: 4.125rem;
`;

const LivestreamCTAInfo = styled.p`
  position: absolute;
  top: calc(100% - ${glsp(0.25)});
  right: 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: end;
  filter: drop-shadow(0 0 4px ${themeVal('color.base-100a')})
    drop-shadow(0 12px 24px ${themeVal('color.base-100a')});

  /* Improve performance */
  transform: translate3d(0, 0, 0);

  ${media.largeUp`
    top: calc(100% + ${glsp(0.25)});
  `}

  &::after {
    margin: ${glsp(0, 1)};
    width: ${glsp(0.5)};
    height: ${glsp(0.5)};
    background: ${themeVal('color.surface')};
    content: '';
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
    pointer-events: none;
    order: -1;
  }

  span {
    background: ${themeVal('color.surface')};
    padding: ${glsp(0.5, 1)};
    border-radius: ${themeVal('shape.rounded')};
    white-space: nowrap;
  }
`;

const LivestreamCTAButton = styled(Button)`
  display: flex;

  svg {
    width: 1rem;
    fill: currentColor;

    ${({ $isAnimating }) =>
      $isAnimating &&
      css`
        #stream-icon-outer {
          animation: ${breath} 2s ease-in-out infinite;
          animation-delay: -1.8s;
        }

        #stream-icon-inner {
          animation: ${breath} 2s ease-in-out infinite;
        }
      `}
  }

  span {
    ${media.mediumDown`
      ${visuallyHidden()}
    `}
  }
`;

const breath = keyframes`
  0% {
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  40% {
    opacity: 1;
  }

  60% {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  100% {
    opacity: 0;
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
        <GlobalAction>
          <LivestreamCTA isLargeUp={isLargeUp} />
        </GlobalAction>
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
                <GlobalMenuLink to='/agenda'>Agenda</GlobalMenuLink>
              </li>
              <li>
                <GlobalMenuLink to='/speakers' partiallyActive>
                  Speakers
                </GlobalMenuLink>
              </li>
              <li>
                <GlobalMenuLink to='/tickets'>Tickets</GlobalMenuLink>
              </li>
              <li>
                <GlobalMenuLink to='/practical-info'>
                  Practical Info
                </GlobalMenuLink>
              </li>
            </GlobalMenu>
          </GlobalNavInner>
        </GlobalNav>
      </PageHeaderInner>
    </PageHeaderSelf>
  );
}

export default PageHeader;

function LivestreamCTA({ isLargeUp }) {
  const { isLive, nextIn } = useLive();

  return (
    <LivestreamCTASelf>
      <LivestreamCTAButton
        forwardedAs={Link}
        variation={isLargeUp ? 'base-outline' : 'base-text'}
        size={isLargeUp ? 'large' : 'medium'}
        fitting={isLargeUp ? 'regular' : 'skinny'}
        to='/livestream'
        $isAnimating={isLive}
      >
        <StreamIcon />
        <span>Watch livestream</span>
      </LivestreamCTAButton>
      {isLive ? (
        <LivestreamCTAInfo>
          <span>
            Live <strong>now</strong>!
          </span>
        </LivestreamCTAInfo>
      ) : nextIn ? (
        <LivestreamCTAInfo>
          <span>
            Live in <Counter>{time2Counter(nextIn).join(':')}</Counter>!
          </span>
        </LivestreamCTAInfo>
      ) : null}
    </LivestreamCTASelf>
  );
}

LivestreamCTA.propTypes = {
  isLargeUp: T.bool
};
