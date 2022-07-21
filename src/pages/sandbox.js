import React from 'react';
import styled from 'styled-components';

import { listReset, themeVal } from '@devseed-ui/theme-provider';

import Layout from '$components/layout';

import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';

import { BlockAlpha } from '$styles/blocks';
import { VarProse } from '$styles/variable-components';
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
  gap: ${variableGlsp(0.5)};
  background: ${themeVal('color.surface')};
  border-bottom: 8px solid ${themeVal('color.secondary-500')};
  margin-top: -8px;
  grid-column: content-start / content-end;
`;

const TabbedContentListLink = styled.a`
  display: block;
  background: ${themeVal('color.surface')};
  padding: ${variableGlsp(0.5)};
  border-radius: ${themeVal('shape.rounded')} ${themeVal('shape.rounded')} 0 0;
  border: 8px solid ${themeVal('color.secondary-500')};
  border-bottom: none;
  margin-bottom: -8px;
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
            <li className='current'>
              <TabbedContentListLink
                aria-controls='sep-28'
                aria-selected='true'
                href='#sep-28'
                id='tab-sep-28'
                role='tab'
                className='tab selected'
              >
                Sep. 28
              </TabbedContentListLink>
            </li>
            <li>
              <TabbedContentListLink
                aria-controls='sep-29'
                aria-selected='false'
                href='#sep-28'
                id='tab-sep-29'
                role='tab'
                className='tab'
                tabIndex='-1'
              >
                Sep. 29
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
