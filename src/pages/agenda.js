import React, { useEffect, useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import T from 'prop-types';

import { listReset, visuallyHidden } from '@devseed-ui/theme-provider';

import Layout from '$components/layout';
import { TabContent, TabItem, TabsManager, TabsNav } from '$components/tabs';

import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';
import Hug from '$styles/hug';
import { VarHeading, VarProse } from '$styles/variable-components';
import { variableGlsp } from '$styles/variable-utils';

const TabbedContent = styled(Hug).attrs({
  as: 'div'
})`
  row-gap: 0;
`;

const TabHeader = styled.header`
  grid-column: content-start / content-end;
`;

const TabTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'xlarge'
})`
  /* styled-component */
`;

const TimeSlot = styled(Hug).attrs({
  as: 'section',
  grid: { smallUp: ['content-start', 'content-end'] }
})`
  /* styled-component */
`;

const TimeSlotHeader = styled.header`
  grid-column: content-start / span 3;
`;

const TimeSlotTitle = styled(VarHeading).attrs({
  as: 'h3',
  size: 'xsmall'
})`
  /* styled-component */
`;

const TimeSlotBody = styled.div`
  grid-column: content-4 / content-end;
`;

const TimeSlotEntryList = styled.ol`
  ${listReset()};
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp()};
`;

const AgendaEntry = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp(0.5)};
`;

const AgendaEntryHeader = styled.header`
  display: flex;
  flex-direction: column;
`;

const AgendaEntryTitle = styled(VarHeading).attrs({
  as: 'h4',
  size: 'large'
})`
  /* styled-component */
`;

const AgendaEntryOverline = styled(VarHeading).attrs({
  as: 'h3',
  size: 'xsmall'
})`
  order: -1;

  span {
    ${visuallyHidden()}
  }
`;

const AgendaEntryBody = styled.div`
  /* styled-component */
`;

const AgendaEntryFooter = styled.footer`
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
          type
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
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
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
                as={Hug}
                grid={{ smallUp: ['content-start', 'content-end'] }}
                key={d.day}
                role='tabpanel'
                aria-labelledby={`tab-sep-${d.day}`}
                tabId={`tab-${d.day}`}
                id={`sep-${d.day}`}
              >
                <TabHeader>
                  <TabTitle>{d.label}</TabTitle>
                </TabHeader>
                <TimeSlot>
                  <TimeSlotHeader>
                    <TimeSlotTitle>8:00AM</TimeSlotTitle>
                  </TimeSlotHeader>
                  <TimeSlotBody>
                    <TimeSlotEntryList>
                      {allEvent.nodes
                        .filter((n) => new Date(n.date).getDate() === d.day)
                        .map((node) => (
                          <li key={node.id}>
                            <AgendaEntry>
                              <AgendaEntryHeader>
                                <AgendaEntryTitle id={node.cId}>
                                  <a href={`#${node.cId}`}>{node.title}</a>
                                </AgendaEntryTitle>
                                <AgendaEntryOverline>
                                  {node.type} <span>at {node.time}</span> in{' '}
                                  {node.room}
                                </AgendaEntryOverline>
                              </AgendaEntryHeader>
                              <AgendaEntryBody>
                                <VarProse>
                                  <p>{node.lead}</p>
                                </VarProse>
                              </AgendaEntryBody>
                              <AgendaEntryFooter>
                                <p>
                                  Speakers: <a href='/'>Lorem Ipsum</a>
                                </p>
                              </AgendaEntryFooter>
                            </AgendaEntry>
                          </li>
                        ))}
                    </TimeSlotEntryList>
                  </TimeSlotBody>
                </TimeSlot>
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
