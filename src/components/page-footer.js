import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import {
  glsp,
  listReset,
  media,
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

const PageFooterSelf = styled(Hug).attrs({
  as: 'footer'
})`
  border-top: 8px solid ${themeVal('color.secondary-500')};
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

  ${media.mediumUp`
    grid-column: content-6 / span 2;
    grid-row: 1;
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
  gap: ${glsp(0.5)};
`;

const FooterMenuLink = styled.a`
  ${MenuLinkAppearance}
`;

const FooterCredits = styled(FootBlock).attrs({
  as: 'address'
})`
  font-size: ${themeVal('type.base.size')};
  font-style: normal;
  gap: 0.25rem;
  grid-column: content-start / content-end;
  grid-row: 3;
  align-self: end;
  margin-top: ${variableGlsp()};
  padding-top: ${variableGlsp()};
  border-top: 4px solid ${themeVal('color.secondary-500')};

  ${media.mediumUp`
    grid-column: content-2 / content-8;
    grid-row: 2;
    margin: 0;
    text-align: center;
  `}

  ${media.largeUp`
    grid-column: content-10 / span 3;
    grid-row: 1;
    text-align: right;
    padding: 0;
    border: 0;
    margin-top: ${variableGlsp(-1)};
  `}

  span {
    ${visuallyHidden()}
  }

  small {
    font-size: inherit;
    display: block;
    opacity: 0.64;
  }
`;

const FooterCopyright = styled.p`
  /* styled-component */
`;

function PageFooter() {
  const nowDate = new Date();

  return (
    <PageFooterSelf>
      <BrowseBlock>
        <FootBlockTitle>Browse</FootBlockTitle>
        <FooterMenu>
          <li>
            <FooterMenuLink forwardedAs={Link} href='/'>
              <CollecticonArrowRight /> Welcome
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink forwardedAs={Link} href='/tickets'>
              <CollecticonArrowRight /> Tickets
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink forwardedAs={Link} href='/code-of-conduct'>
              <CollecticonArrowRight /> Code of Conduct
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink forwardedAs={Link} href='/terms'>
              <CollecticonArrowRight /> Terms & Conditions
            </FooterMenuLink>
          </li>
        </FooterMenu>
      </BrowseBlock>

      <EditionsBlock>
        <FootBlockTitle>Previous editions</FootBlockTitle>
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
              <CollecticonBrandTwitter /> Follow on Twitter
            </FooterMenuLink>
          </li>
          <li>
            <FooterMenuLink href='https://github.com/satsummit'>
              <CollecticonBrandGithub /> Check the GitHub
            </FooterMenuLink>
          </li>
        </FooterMenu>
      </ConnectBlock>

      <FooterCredits>
        <p>
          <Brand /> <span>Organized by</span>{' '}
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
          </a>{' '}
        </p>
        <FooterCopyright>
          ©{' '}
          <time dateTime={`2015/${nowDate.getFullYear()}`}>
            2015-{nowDate.getFullYear()}
          </time>
        </FooterCopyright>
      </FooterCredits>
    </PageFooterSelf>
  );
}

export default PageFooter;
