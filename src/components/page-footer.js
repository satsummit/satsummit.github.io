import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import {
  listReset,
  media,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';

import { variableGlsp } from '$styles/variable-utils';
import { VarHeading } from '$styles/variable-components';
import Hug from '$styles/hug';
import { Button } from '@devseed-ui/button';
import {
  CollecticonArrowRight,
  CollecticonBrandGithub,
  CollecticonBrandTwitter,
  CollecticonEnvelope
} from '@devseed-ui/collecticons';

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

  ol,
  ul {
    ${listReset()};
  }

  &:not(:first-child) {
    padding-top: ${variableGlsp()};
    border-top: 4px solid ${themeVal('color.secondary-500')};
  }

  &:last-child {
    ${media.largeUp`
      padding: 0;
      border: 0;
    `}
  }

  &:not(:first-child):not(:last-child) {
    ${media.smallUp`
      padding: 0;
      border: 0;
    `}
  }
`;

const FootBlockTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'medium'
})`
  /* styled-component */
`;

const EditionsBlock = styled(FootBlock)`
  grid-column: content-start / content-end;
  grid-row: 1;

  ${media.smallUp`
    grid-column: content-start / span 2;
  `}

  ${media.mediumUp`
    grid-column: content-2 / span 3;
  `}

  ${media.largeUp`
    grid-column: content-start / span 3;
  `}
`;

const ConnectBlock = styled(FootBlock)`
  grid-column: content-start / content-end;
  grid-row: 2;

  ${media.smallUp`
    grid-column: content-3 / span 2;
    grid-row: 1;
  `}

  ${media.mediumUp`
    grid-column: content-5 / span 3;
    grid-row: 1;
  `}

  ${media.largeUp`
    grid-column: content-4 / span 3;
  `}
`;

const FooterCredits = styled(FootBlock).attrs({
  as: 'address'
})`
  font-size: 1rem;
  font-style: normal;
  gap: 0;
  grid-column: content-start / content-end;
  grid-row: 3;

  ${media.smallUp`
    grid-row: 2;
    gap: 0.25rem;
  `}

  ${media.mediumUp`
    grid-column: content-2 / span 6;
  `}

  ${media.largeUp`
    grid-column: content-9 / span 4;
    grid-row: 1;
    text-align: right;
    align-self: end;
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

function PageFooter(props) {
  const nowDate = new Date();

  return (
    <PageFooterSelf isHidden={props.isHidden}>
      <EditionsBlock>
        <FootBlockTitle>Previous editions</FootBlockTitle>
        <ol>
          <li>
            <Button forwardedAs='a' href='https://2018.satsummit.io/'>
              <CollecticonArrowRight /> SatSummit 2018
            </Button>
          </li>
          <li>
            <Button forwardedAs='a' href='https://2017.satsummit.io/'>
              <CollecticonArrowRight /> SatSummit 2017
            </Button>
          </li>
          <li>
            <Button forwardedAs='a' href='https://2015.satsummit.io/'>
              <CollecticonArrowRight /> SatSummit 2015
            </Button>
          </li>
        </ol>
      </EditionsBlock>

      <ConnectBlock>
        <FootBlockTitle>Let&apos;s connect</FootBlockTitle>
        <ul>
          <li>
            <Button forwardedAs='a' href='mailto:info@satsummit.io'>
              <CollecticonEnvelope /> Get in touch
            </Button>
          </li>
          <li>
            <Button
              forwardedAs='a'
              href='https://twitter.com/intent/user?screen_name=sat_summit'
            >
              <CollecticonBrandTwitter /> Follow us on Twitter
            </Button>
          </li>
          <li>
            <Button forwardedAs='a' href='https://github.com/satsummit'>
              <CollecticonBrandGithub /> Check us on GitHub
            </Button>
          </li>
        </ul>
      </ConnectBlock>

      <FooterCredits>
        <p>
          <span>Organized by</span>{' '}
          <a href='https://www.cyient.com/'>
            <strong>Cyient</strong>
          </a>
          ,{' '}
          <a href='https://dev.global/'>
            <strong>DevGlobal</strong>
          </a>{' '}
          &{' '}
          <a href='https://developmentseed.org/'>
            <strong>Development Seed</strong>
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

PageFooter.propTypes = {
  isHidden: T.bool
};
