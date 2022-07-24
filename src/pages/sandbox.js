import React from 'react';
import styled from 'styled-components';

import { listReset, media, themeVal } from '@devseed-ui/theme-provider';

import Layout from '$components/layout';

import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';

import { BlockAlpha } from '$styles/blocks';
import { VarHeading, VarProse } from '$styles/variable-components';
import Hug from '$styles/hug';
import { variableGlsp } from '$styles/variable-utils';

const TabbedContent = styled(Hug).attrs({
  as: 'div'
})`
  /* styled-component */
`;

const TabbedContentList = styled.ul`
  ${listReset()};
  display: flex;
  flex-flow: row nowrap;
  background: ${themeVal('color.surface')};
  border-bottom: 8px solid ${themeVal('color.secondary-500')};
  margin-top: -8px;
  grid-column: content-start / content-end;

  ${media.smallUp`
    margin-top: -8px;
    justify-content: flex-end;
    margin-top: calc(8px - ${variableGlsp(2.75)});
  `}

  li {
    width: 50%;

    ${media.smallUp`
      width: auto;
    `}
  }
`;

const TabbedContentListLink = styled(VarHeading).attrs({
  as: 'a',
  size: 'xsmall'
})`
  position: relative;
  display: block;
  text-align: center;
  font-weight: ${themeVal('button.type.weight')};
  text-decoration: none;
  border-radius: ${themeVal('shape.rounded')} ${themeVal('shape.rounded')} 0 0;
  border: 8px solid transparent;
  margin-bottom: -8px;
  transition: all 0.24s ease;

  &,
  &:visited {
    color: ${themeVal('color.primary')};
  }

  &:hover {
    color: ${themeVal('color.primary-400')};
  }

  &.selected {
    border-color: ${themeVal('color.secondary-500')};

    > span {
      box-shadow: 0 8px 0 0 white;
    }
  }

  * {
    line-height: 1;
  }

  > span {
    display: block;
    padding: ${variableGlsp(0.75)};

    /* span {
      display: block;

      ${media.smallUp`
        display: initial;
      `}
    } */
  }
`;

const TabbedContentPanel = styled.section`
  grid-column: content-start / content-end;
`;

const SandboxPage = () => {
  return (
    <Layout title='Sandbox'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Sandbox</PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>

        <TabbedContent>
          <TabbedContentList role='tablist'>
            <li>
              <TabbedContentListLink
                aria-controls='sep-28'
                aria-selected='true'
                href='#sep-28'
                id='tab-sep-28'
                role='tab'
                className='selected'
              >
                <span>
                  <span>Wednesday, </span>Sep. 28
                </span>
              </TabbedContentListLink>
            </li>
            <li>
              <TabbedContentListLink
                aria-controls='sep-29'
                aria-selected='false'
                href='#sep-28'
                id='tab-sep-29'
                role='tab'
                tabIndex='-1'
              >
                <span>
                  <span>Thursday, </span>Sep. 29
                </span>
              </TabbedContentListLink>
            </li>
          </TabbedContentList>

          <TabbedContentPanel
            aria-labelledby='tab-sep-28'
            className='tab-panel current'
            role='tabpanel'
            id='sep-28'
          >
            <h2>Sep. 28</h2>
            <p>
              {' '}
              Lorem ipsum dolor sit amet, urna class vestibulum tincidunt atque,
              habitasse sit wisi erat dapibus. Vitae curae natoque a, donec
              nulla conubia in mollis. Sapien pede in tortor, lectus neque vitae
              in et, vitae aliquam eget orci at, non turpis faucibus id morbi.
              Elit tempor turpis donec inceptos, fringilla arcu sollicitudin
              ligula magna, sed justo viverra lacus erat, vestibulum id in justo
              nulla. Viverra dui leo donec, aptent deserunt nostra magnis
              lobortis, id ultrices ac aenean, interdum vestibulum rhoncus
              phasellus libero.
            </p>
          </TabbedContentPanel>

          <TabbedContentPanel
            aria-labelledby='tab-sep-29'
            className='tab-panel hidden'
            role='tabpanel'
            id='sep-29'
          >
            <h2>Sep. 29</h2>
            <p>
              Lorem ipsum dolor sit amet, urna class vestibulum tincidunt atque,
              habitasse sit wisi erat dapibus. Vitae curae natoque a, donec
              nulla conubia in mollis. Sapien pede in tortor, lectus neque vitae
              in et, vitae aliquam eget orci at, non turpis faucibus id morbi.
              Elit tempor turpis donec inceptos, fringilla arcu sollicitudin
              ligula magna, sed justo viverra lacus erat, vestibulum id in justo
              nulla. Viverra dui leo donec, aptent deserunt nostra magnis
              lobortis, id ultrices ac aenean, interdum vestibulum rhoncus
              phasellus libero.
            </p>
          </TabbedContentPanel>
        </TabbedContent>

        <BlockAlpha>
          <VarProse>
            <h2>Testing sandbox</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque faucibus vehicula vulputate. Nulla eget purus tellus.
              Duis vel euismod metus, sed eleifend eros.
            </p>
          </VarProse>
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default SandboxPage;
