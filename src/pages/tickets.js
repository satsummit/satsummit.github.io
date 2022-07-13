import React, { useEffect } from 'react';

import Layout from '$components/layout';

import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';

import { BlockAlpha } from '$styles/blocks';
import { VarProse } from '$styles/variable-components';
import { Table } from '@devseed-ui/typography';

const TicketsPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const exampleCallback = function () {
        console.log('Order complete!');
      };

      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: '377386512217',
        iframeContainerId: 'eb-widget',
        iframeContainerHeight: 425,
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
          <VarProse>
            <h2>SatSummit is back!</h2>
            <p>
              We&apos;re excited to host you September 28 & 29 at{' '}
              <a href='https://convene.com/locations/washington-dc/600-14th-street-nw/'>
                <strong>Convene</strong>
              </a>
              , in Washington DC, or <strong>virtually</strong>! The two days
              will be filled with panel discussions and breakout sessions from
              some of the leading satellite experts from around the globe!
            </p>
            <h3>About the event</h3>
            <p>
              <strong>SatSummit</strong> convenes leaders in the satellite
              industry and experts in global development for 2 days of
              presentations and in-depth conversations on solving the
              world&apos;s most critical development challenges with satellite
              data.
            </p>
            <p>
              From climate change to population growth to natural resource
              availability, earth observation data offers insights into
              today&apos;s biggest global issues. Stay tuned for more
              information on <strong>SatSummit 2022</strong>!
            </p>
            <h3>Health Protocols</h3>
            <p>
              We want everyone to have a safe and enjoyable conference, and
              highly recommend COVID-19 vaccination or a negative test before
              attending <strong>SatSummit</strong>. We will follow any
              Washington DC protocols that are in effect at the time which can
              be followed closely on this site. We will take social distancing
              measures, provide outdoor spaces, and will provide indoor face
              coverings and hand sanitizer.
            </p>
            <h2>Tickets</h2>
            <p>
              All tickets include attendance for both Sept. 28 & Sept. 29. There
              are no one day tickets offered at this time. The prices include
              breakfast and lunch during the conference and light fare at social
              events. If you are unable to attend the event after purchasing a
              ticket, please contact{' '}
              <a href='mailto:info@satsummit.io'>
                <strong>info@satsummit.io</strong>
              </a>{' '}
              and we&apos;ll work to get you a full refund.
            </p>
            <h3>Pricing</h3>
            <Table>
              <thead>
                <tr>
                  <th scope='col'>Type</th>
                  <th scope='col'># released July 18</th>
                  <th scope='col'># released XX</th>
                  <th scope='col'>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>Standard 2 Day Ticket, Corporate</th>
                  <td>100</td>
                  <td>25</td>
                  <td>$279</td>
                </tr>
                <tr>
                  <th scope='row'>
                    Standard 2 Day Ticket, Government/Non-profit
                  </th>
                  <td>75</td>
                  <td>25</td>
                  <td>$139</td>
                </tr>
                <tr>
                  <th scope='row'>Virtual Attendee</th>
                  <td>500</td>
                  <td aria-label='No value'>-</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <th scope='row'>Comped Tickets (Hosts)</th>
                  <td>50</td>
                  <td aria-label='No value'>-</td>
                  <td>$0</td>
                </tr>
              </tbody>
            </Table>
            <h3>Book your ticket</h3>
            <div id='eb-widget' />
          </VarProse>
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default TicketsPage;
