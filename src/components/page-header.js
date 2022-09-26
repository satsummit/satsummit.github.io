import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';
import T from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

import {
  glsp,
  listReset,
  media,
  multiply,
  themeVal
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
  gap: ${variableGlsp(0.5)};

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
  position: relative;

  ${media.largeUp`
    order: 3;
  `}
`;

const GlobalActionInfo = styled.p`
  position: absolute;
  top: calc(100% + ${glsp(0.75)});
  right: 0;
  background: ${themeVal('color.surface')};
  padding: ${glsp(0.5, 1)};
  box-shadow: ${themeVal('boxShadow.elevationD')};
  border-radius: ${themeVal('shape.rounded')};
  text-align: center;
  white-space: nowrap;
  min-width: 12rem;

  &::after {
    position: absolute;
    bottom: 100%;
    right: ${glsp(0.5)};
    width: ${glsp(0.5)};
    height: ${glsp(0.5)};
    background: ${themeVal('color.surface')};
    content: '';
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
    pointer-events: none;
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

const LivestreamButtonSelf = styled(Button)`
  display: flex;

  svg {
    width: 1rem;
    fill: currentColor;

    ${({ isAnimating }) =>
      isAnimating &&
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
          <LivestreamButton isLargeUp={isLargeUp} />
          <GlobalActionInfo>
            Live in <strong>01:16:56:24</strong>!
          </GlobalActionInfo>
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

const liveRanges = [
  {
    start: new Date('2022-09-28T08:00:00.000-04:00'),
    end: new Date('2022-09-28T18:15:00.000-04:00')
  },
  {
    start: new Date('2022-09-29T08:00:00.000-04:00'),
    end: new Date('2022-09-29T17:00:00.000-04:00')
  }
];

function LivestreamButton({ isLargeUp }) {
  const [isLive, setLive] = useState(false);

  useEffect(() => {
    let reqId = null;
    let lastTs = 0;
    function tick(ts) {
      const now = Date.now();
      if (!lastTs || ts - lastTs >= 5000) {
        lastTs = ts;
        const live = liveRanges.some(
          ({ start, end }) => now >= start.getTime() && now < end.getTime()
        );
        setLive(live);
      }
      reqId = window.requestAnimationFrame(tick);
    }

    reqId = window.requestAnimationFrame(tick);

    return () => {
      reqId && window.cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <LivestreamButtonSelf
      forwardedAs={Link}
      variation='base-outline'
      size={isLargeUp ? 'large' : 'medium'}
      to='/livestream'
      isAnimating={isLive}
    >
      <StreamIcon />
      {isLive ? 'Watch live now' : 'Watch livestream'}
    </LivestreamButtonSelf>
  );
}

LivestreamButton.propTypes = {
  isLargeUp: T.bool
};
