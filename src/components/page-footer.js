import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import {
  listReset,
  media,
  multiply,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';

import {
  CollecticonArrowRight,
  CollecticonBrandGithub,
  CollecticonBrandTwitter,
  CollecticonEnvelope,
  CollecticonExpandTopRight
} from '@devseed-ui/collecticons';

import { variableGlsp } from '$styles/variable-utils';
import { VarHeading } from '$styles/variable-components';

import Hug from '$styles/hug';
import MenuLinkAppearance from '$styles/menu-link';

import Brand from './brand';

const PageFooterSelf = styled(Hug).attrs({
  as: 'footer'
})`
  padding: ${variableGlsp(2, 0)};
`;

const FootBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp(0.5)};
`;

const FootBlockTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'small'
})`
  /* styled-component */
`;

const BrowseBlock = styled(FootBlock)`
  grid-column: content-start / content-3;
  grid-row: 1;

  ${media.mediumUp`
    grid-column: content-2 / span 2;
  `}

  ${media.largeUp`
    grid-column: content-start / span 3;
  `}
`;

const EditionsBlock = styled(FootBlock)`
  grid-column: content-3 / content-end;
  grid-row: 1;

  ${media.mediumUp`
    grid-column: content-4 / span 2;
    grid-row: 1;
  `}

  ${media.largeUp`
    grid-column: content-4 / span 3;
  `}
`;

const ConnectBlock = styled(FootBlock)`
  grid-column: content-3 / content-end;
  grid-row: 2;
  margin-top: ${variableGlsp(-9.25)};

  ${media.mediumUp`
    grid-column: content-6 / span 2;
    grid-row: 1;
    margin-top: 0;
  `}

  ${media.largeUp`
    grid-column: content-7 / span 3;
    grid-row: 1;
  `}
`;

const FooterMenu = styled.ul`
  ${listReset()};
  display: flex;
  flex-flow: column nowrap;
`;

const FooterMenuLink = styled.a`
  ${MenuLinkAppearance}
`;

const FooterCredits = styled(FootBlock)`
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp(0.5)};
  grid-column: content-start / content-end;
  grid-row: 3;
  margin-top: ${variableGlsp()};
  padding-top: ${variableGlsp(1.5)};
  border-top: ${multiply(themeVal('layout.border'), 2)} solid
    ${themeVal('color.secondary-500')};

  ${media.mediumUp`
    grid-column: content-2 / content-8;
    grid-row: 2;
    margin-top: ${variableGlsp(0.5)};
  `}

  ${media.largeUp`
    grid-column: content-10 / span 3;
    grid-row: 1;
    margin: 0;
    padding: 0;
    border: 0;
  `}

  p > strong {
    display: block;
    margin-bottom: ${variableGlsp(0.375)};
  }

  span {
    ${visuallyHidden()}
  }

  small {
    font-size: 0.75rem;
  }
`;

function PageFooter() {
  const nowDate = new Date();

  return (
    <PageFooterSelf>
      <BrowseBlock>
        <FootBlockTitle>Browse this edition</FootBlockTitle>
        <FooterMenu>
          <li>
            <FooterMenuLink as={Link} to='/'>
              <CollecticonArrowRight /> Welcome
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink as={Link} to='/agenda'>
              <CollecticonArrowRight /> Agenda
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink as={Link} to='/speakers'>
              <CollecticonArrowRight /> Speakers
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink as={Link} to='/practical-info'>
              <CollecticonArrowRight /> Practical Info
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink as={Link} to='/tickets'>
              <CollecticonArrowRight /> Tickets
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink as={Link} to='/livestream'>
              <CollecticonArrowRight /> Livestream
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink as={Link} to='/health-protocols'>
              <CollecticonArrowRight /> Health Protocols
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink as={Link} to='/code-of-conduct'>
              <CollecticonArrowRight /> Code of Conduct
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink as={Link} to='/call-for-lightning-talks'>
              <CollecticonArrowRight /> Call for Lightning Talks
            </FooterMenuLink>
          </li>
        </FooterMenu>
      </BrowseBlock>

      <EditionsBlock>
        <FootBlockTitle>Check past editions</FootBlockTitle>
        <FooterMenu as='ol'>
          <li>
            <FooterMenuLink href='https://2018.satsummit.io/'>
              <CollecticonExpandTopRight /> SatSummit 2018
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink href='https://2017.satsummit.io/'>
              <CollecticonExpandTopRight /> SatSummit 2017
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink href='https://2015.satsummit.io/'>
              <CollecticonExpandTopRight /> SatSummit 2015
            </FooterMenuLink>
          </li>
        </FooterMenu>
      </EditionsBlock>

      <ConnectBlock>
        <FootBlockTitle>Let&apos;s connect</FootBlockTitle>
        <FooterMenu>
          <li>
            <FooterMenuLink href='mailto:info@satsummit.io'>
              <CollecticonEnvelope /> Get in touch
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink href='https://twitter.com/intent/user?screen_name=sat_summit'>
              <CollecticonBrandTwitter /> Follow us on Twitter
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink href='https://github.com/satsummit'>
              <CollecticonBrandGithub /> Find us on GitHub
            </FooterMenuLink>
          </li>
        </FooterMenu>
      </ConnectBlock>

      <FooterCredits>
        <p>
          <Brand />
          <span>: </span>An event by{' '}
          <a href='https://www.cyient.com/'>
            <strong>Cyient</strong>
          </a>
          ,{' '}
          <a href='https://developmentseed.org/'>
            <strong>Development Seed</strong>
          </a>{' '}
          &{' '}
          <a href='https://dev.global/'>
            <strong>DevGlobal</strong>
          </a>
          .
        </p>
        <p>
          <small>
            <Link to='/terms'>Terms & Conditions</Link> ©{' '}
            <time dateTime={`2015/${nowDate.getFullYear()}`}>
              2015-{nowDate.getFullYear()}
            </time>
          </small>
        </p>
      </FooterCredits>
    </PageFooterSelf>
  );
}

export default PageFooter;
