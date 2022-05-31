import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import { listReset, themeVal, visuallyHidden } from '@devseed-ui/theme-provider';

import { variableGlsp } from '$styles/variable-utils';
import { VarHeading } from '$styles/variable-components';
import Hug from '$styles/hug';
import { Button } from '@devseed-ui/button';
import { CollecticonArrowRight, CollecticonBrandTwitter, CollecticonEnvelope } from '@devseed-ui/collecticons';

const PageFooterSelf = styled(Hug).attrs({
  as: 'footer'
})`
  border-top: 0.5rem solid ${themeVal('color.primary-500')};
  padding: ${variableGlsp(2)};
`;

const FootBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp(0.5)};
  padding: ${variableGlsp(2)};

  ol,
  ul {
    ${listReset()};
  }
`;

const FootBlockTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'small'
})`
  /* styled-component */
`;

const EditionsBlock = styled(FootBlock)`
  grid-column: content-start / content-5;
`;

const ConnectBlock = styled(FootBlock)`
  grid-column: content-5 / content-9;
`;

const FooterCredits = styled(FootBlock).attrs({
  as: 'address'
})`
  font-size: 1rem;
  font-style: normal;
  display: flex;
  flex-flow: column nowrap;
  grid-column: content-9 / content-end;

  a {
    font-weight: bold;
  }

  span {
    ${visuallyHidden()}
  }

  time {
    display: block;
    margin-top: ${variableGlsp(0.25)};
  }

  small {
    font-size: inherit;
    display: block;
    opacity: 0.64;
  }

  a {
    &,
    &:visited {
      color: inherit;
    }
  }
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
        </ul>
      </ConnectBlock>

      <FooterCredits>
        <p>
          <span>Organized by</span> <a href='https://www.cyient.com/'>Cyent</a>,{' '}
          <a href='https://dev.global/'>DevGlobal</a> &{' '}
          <a href='https://developmentseed.org/'>Development Seed</a>
          <time dateTime={`2015/${nowDate.getFullYear()}`}>
            © 2015-{nowDate.getFullYear()}
          </time>
        </p>
      </FooterCredits>
    </PageFooterSelf>
  );
}

export default PageFooter;

PageFooter.propTypes = {
  isHidden: T.bool
};
