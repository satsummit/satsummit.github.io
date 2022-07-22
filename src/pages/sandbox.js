import React from 'react';
import styled from 'styled-components';

import Layout from '$components/layout';
import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';
import { BlockAlpha } from '$styles/blocks';
import Hug from '$styles/hug';
import { TabContent, TabItem, TabsManager, TabsNav } from '$components/tabs';
import { VarProse } from '$styles/variable-components';

const TabbedContent = styled(Hug).attrs({
  as: 'div'
})`
  /* styled-component */
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

        <TabsManager>
          <TabbedContent>
            <TabsNav role='tablist'>
              <li className='current'>
                <TabItem
                  aria-controls='sep-28'
                  aria-selected='true'
                  href='#sep-28'
                  tabId='sep-28'
                  id='tab-sep-28'
                  role='tab'
                >
                  <span>
                    <span>Wednesday, </span>Sep. 28
                  </span>
                </TabItem>
              </li>
              <li>
                <TabItem
                  aria-controls='sep-29'
                  aria-selected='false'
                  href='#sep-28'
                  tabId='sep-29'
                  id='tab-sep-29'
                  role='tab'
                  tabIndex='-1'
                >
                  <span>
                    <span>Thursday, </span>Sep. 29
                  </span>
                </TabItem>
              </li>
            </TabsNav>

            <TabContent
              aria-labelledby='tab-sep-28'
              className='tab-panel current'
              role='tabpanel'
              tabId='sep-28'
              id='sep-28'
            >
              <h2>Sep. 28</h2>
              <p>
                {' '}
                Lorem ipsum dolor sit amet, urna class vestibulum tincidunt
                atque, habitasse sit wisi erat dapibus. Vitae curae natoque a,
                donec nulla conubia in mollis. Sapien pede in tortor, lectus
                neque vitae in et, vitae aliquam eget orci at, non turpis
                faucibus id morbi. Elit tempor turpis donec inceptos, fringilla
                arcu sollicitudin ligula magna, sed justo viverra lacus erat,
                vestibulum id in justo nulla. Viverra dui leo donec, aptent
                deserunt nostra magnis lobortis, id ultrices ac aenean, interdum
                vestibulum rhoncus phasellus libero.
              </p>
            </TabContent>

            <TabContent
              aria-labelledby='tab-sep-29'
              className='tab-panel hidden'
              role='tabpanel'
              tabId='sep-29'
              id='sep-29'
            >
              <h2>Sep. 29</h2>
              <p>
                Lorem ipsum dolor sit amet, urna class vestibulum tincidunt
                atque, habitasse sit wisi erat dapibus. Vitae curae natoque a,
                donec nulla conubia in mollis. Sapien pede in tortor, lectus
                neque vitae in et, vitae aliquam eget orci at, non turpis
                faucibus id morbi. Elit tempor turpis donec inceptos, fringilla
                arcu sollicitudin ligula magna, sed justo viverra lacus erat,
                vestibulum id in justo nulla. Viverra dui leo donec, aptent
                deserunt nostra magnis lobortis, id ultrices ac aenean, interdum
                vestibulum rhoncus phasellus libero.
              </p>
            </TabContent>
          </TabbedContent>
        </TabsManager>

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
