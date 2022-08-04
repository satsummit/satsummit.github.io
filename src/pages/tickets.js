import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Layout from '$components/layout';

import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';

import { themeVal } from '@devseed-ui/theme-provider';

import { BlockAlpha } from '$styles/blocks';
import { VarProse } from '$styles/variable-components';
import { variableGlsp } from '$styles/variable-utils';

const TicketsWidget = styled.div`
  margin-top: ${variableGlsp(0.75)};
  border: ${themeVal('shape.border')} solid ${themeVal('color.base-100')};
  border-radius: ${themeVal('shape.rounded')};
  padding: ${variableGlsp()};
`;

const TicketsPage = () => {
  const { tickets } = useStaticQuery(graphql`
    query {
      tickets: letter(slug: { in: "/tickets/" }) {
        parent {
          ... on MarkdownRemark {
            html
          }
        }
      }
    }
  `);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const exampleCallback = function () {
        // eslint-disable-next-line
        console.log('Order complete!');
      };

      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: '377386512217',
        iframeContainerId: 'eb-widget',
        iframeContainerHeight: 700,
        onOrderComplete: exampleCallback
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout title='Tickets'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Tickets</PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <VarProse dangerouslySetInnerHTML={{ __html: tickets.parent.html }} />
          <VarProse>
            <h3>Book your ticket</h3>
            <TicketsWidget id='eb-widget' />
          </VarProse>
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default TicketsPage;
