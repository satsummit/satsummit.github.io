import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import { themeVal, visuallyHidden } from '@devseed-ui/theme-provider';

import { variableGlsp } from '../styles/variable-utils';
import { VarHeading } from '$styles/variable-components';

const PageFooterSelf = styled.footer`
  padding: ${variableGlsp(0.75, 1)};
  background: ${themeVal('color.base-50')};
`;

const FootBlock = styled.section`
  /* styled-component */
`;

const FootBlockTitle = styled(VarHeading).attrs({
  as: 'h3',
  size: 'small'
})`
  /* styled-component */
`;

const FooterCredits = styled.address`
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-style: normal;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;

  a {
    font-weight: bold;
  }

  span {
    ${visuallyHidden()}
  }

  h3 {
    ${visuallyHidden()}
  }

  time {
    display: block;
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
      <FootBlock>
        <FootBlockTitle>Previous editions</FootBlockTitle>
        <ol>
          <li>
            <a href='https://2018.satsummit.io/'>SatSummit 2018</a>
          </li>
          <li>
            <a href='https://2017.satsummit.io/'>SatSummit 2017</a>
          </li>
          <li>
            <a href='https://2015.satsummit.io/'>SatSummit 2015</a>
          </li>
        </ol>
      </FootBlock>

      <FootBlock>
        <FootBlockTitle>Let&apos;s connect</FootBlockTitle>
        <ul>
          <li>
            <a href='mailto:info@satsummit.io'>Get in touch</a>
          </li>
          <li>
            <a href='https://twitter.com/intent/user?screen_name=sat_summit'>
              Follow us on Twitter
            </a>
          </li>
        </ul>
      </FootBlock>

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
