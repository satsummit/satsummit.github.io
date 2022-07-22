import React, { useEffect, useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import T from 'prop-types';

import Layout from '$components/layout';
import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';
import Hug from '$styles/hug';
import { TabContent, TabItem, TabsManager, TabsNav } from '$components/tabs';

const TabbedContent = styled(Hug).attrs({
  as: 'div'
})`
  /* styled-component */
`;

const days = [
  {
    day: 28,
    label: (
      <span>
        <span>Wednesday, </span>Sep. 28
      </span>
    )
  },
  {
    day: 29,
    label: (
      <span>
        <span>Thursday, </span>Sep. 29
      </span>
    )
  }
];

const AgendaPage = ({ location }) => {
  const { allEvent } = useStaticQuery(graphql`
    query {
      allEvent(sort: { fields: [time] }) {
        nodes {
          id
          cId
          title
          date
          time
          room
          lead
        }
      }
    }
  `);

  const hashActiveEvent = useMemo(() => {
    const cId = location.hash.slice(1);
    return allEvent.nodes.find((node) => node.cId === cId);
  }, [allEvent, location.hash]);

  const initialTab = useMemo(() => {
    return hashActiveEvent
      ? `tab-${new Date(hashActiveEvent.date).getDate()}`
      : undefined;
  }, [hashActiveEvent]);

  useEffect(() => {
    document.getElementById(location.hash.slice(1)).scrollIntoView();
  }, []);

  return (
    <Layout title='Agenda'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Agenda</PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>

        <TabsManager initialActive={initialTab}>
          <TabbedContent>
            <TabsNav role='tablist'>
              {days.map((d, idx) => (
                <TabItem
                  key={d.day}
                  aria-controls={`sep-${d.day}`}
                  href={`#sep-${d.day}`}
                  tabId={`tab-${d.day}`}
                  id={`tab-sep-${d.day}`}
                  role='tab'
                  tabIndex={idx > 0 ? '-1' : undefined}
                >
                  {d.label}
                </TabItem>
              ))}
            </TabsNav>

            {days.map((d) => (
              <TabContent
                key={d.day}
                role='tabpanel'
                aria-labelledby={`tab-sep-${d.day}`}
                tabId={`tab-${d.day}`}
                id={`sep-${d.day}`}
              >
                {allEvent.nodes
                  .filter((n) => new Date(n.date).getDate() === d.day)
                  .map((node) => (
                    <React.Fragment key={node.id}>
                      <a href={`#${node.cId}`}>
                        <h2 id={node.cId}>{node.title}</h2>
                      </a>
                      <strong>
                        {node.room} at {node.time}
                      </strong>
                      <p>{node.lead}</p>
                    </React.Fragment>
                  ))}
              </TabContent>
            ))}
          </TabbedContent>
        </TabsManager>
      </PageMainContent>
    </Layout>
  );
};

AgendaPage.propTypes = {
  location: T.object
};

export default AgendaPage;
