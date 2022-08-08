import React, { useCallback, useEffect, useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import T from 'prop-types';
import {
  listReset,
  media,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';
import { Heading } from '@devseed-ui/typography';
import {
  CollecticonArrowLeft,
  CollecticonArrowRight
} from '@devseed-ui/collecticons';
import { Button } from '@devseed-ui/button';

import Layout from '$components/layout';
import {
  TabContent,
  TabItem,
  TabsManager,
  TabsNav,
  useTabs
} from '$components/tabs';
import { EventPeople } from '$components/event-people';
import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';
import Hug from '$styles/hug';
import { VarHeading, VarProse } from '$styles/variable-components';
import { variableGlsp } from '$styles/variable-utils';
import { timeFromDate } from '$utils/date';

const TabbedContent = styled(Hug).attrs({
  as: 'div'
})`
  row-gap: 0;
`;

const TabHeader = styled.header`
  ${visuallyHidden()}
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
  &:not(:first-of-type) > *:first-child {
    margin-top: ${variableGlsp(0.75)};
    padding-top: ${variableGlsp(2)};
    border-top: 8px solid ${themeVal('color.secondary-500')};

    ${media.mediumUp`
      margin-top: 0;
      padding-top: ${variableGlsp()};
    `}
  }

  &:not(:first-of-type) > * {
    ${media.mediumUp`
      margin-top: 0;
      padding-top: ${variableGlsp()};
      border-top: 8px solid ${themeVal('color.secondary-500')};
    `}
  }
`;

const TimeSlotHeader = styled.header`
  grid-column: content-start / content-end;

  ${media.mediumUp`
    grid-column: content-start / content-2;
  `}

  ${media.largeUp`
    grid-column: content-start / content-3;
  `}
`;

const TimeSlotTitle = styled(VarHeading).attrs({
  as: 'h3',
  size: 'small'
})`
  /* styled-component */
`;

const TimeSlotBody = styled(Hug).attrs({
  as: 'section',
  grid: {
    smallUp: ['content-start', 'content-end'],
    mediumUp: ['content-2', 'content-end'],
    largeUp: ['content-3', 'content-end']
  }
})`
  /* styled-component */
`;

const TimeSlotEntryList = styled(Hug).attrs({
  as: 'section',
  grid: {
    mediumUp: ['content-2', 'content-8'],
    largeUp: ['content-3', 'content-11']
  }
})`
  ${listReset()};
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp()};

  > li:not(:first-child) {
    padding-top: ${variableGlsp()};
    border-top: 4px solid ${themeVal('color.secondary-500')};

    ${media.mediumUp`
      border-width: 8px;
    `}
  }
`;

const AgendaEntry = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp()};
`;

const AgendaEntryHeader = styled.header`
  display: flex;
  flex-direction: column;
`;

const AgendaEntryTitle = styled(VarHeading).attrs({
  as: 'h4',
  size: 'xlarge'
})`
  a,
  a:visited {
    text-decoration: none;
  }
`;

const AgendaEntryOverline = styled(VarHeading).attrs({
  as: 'h3',
  size: 'small'
})`
  order: -1;

  span {
    font-size: 0;

    &::before {
      content: '•';
      font-size: 1.25rem;
      margin: 0 0.25rem;

      ${media.mediumUp`
        font-size: 1.5rem;
        margin: 0 0.5rem;
      `}
    }
  }
`;

const AgendaEntryBody = styled.div`
  /* styled-component */
`;

const AgendaEntryFooter = styled.footer`
  display: flex;
  flex-flow: row wrap;
  gap: ${variableGlsp(0.5)};
`;

const AgendaEntryParticipants = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: ${variableGlsp(0.25)};
`;

const AgendaEntryParticipantsTitle = styled(Heading).attrs({
  as: 'h4',
  size: 'xsmall'
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

const peopleCategories = [
  'Hosts',
  'Moderators',
  'Panelists',
  'Facilitators',
  'Speakers'
];

const AgendaPage = ({ location }) => {
  const { allEvent } = useStaticQuery(graphql`
    query {
      allEvent(sort: { fields: [date, slug] }) {
        nodes {
          id
          cId
          title
          type
          date
          room
          lead
          people {
            ...AllEventPeople
          }
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

            {days.map((d) => {
              const dayEvents = allEvent.nodes.filter(
                (n) => new Date(n.date).getDate() === d.day
              );

              const hourGroups = dayEvents.reduce((acc, event) => {
                const t = timeFromDate(new Date(event.date));
                return {
                  ...acc,
                  [t]: [...(acc[t] || []), event]
                };
              }, {});

              return (
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
                  {Object.entries(hourGroups).map(([time, eventsByTime]) => (
                    <TimeSlot key={time}>
                      <TimeSlotHeader>
                        <TimeSlotTitle>{time}</TimeSlotTitle>
                      </TimeSlotHeader>
                      <TimeSlotBody>
                        <TimeSlotEntryList>
                          {eventsByTime.map((node) => (
                            <li key={node.id}>
                              <AgendaEntry>
                                <AgendaEntryHeader>
                                  <AgendaEntryTitle id={node.cId}>
                                    <a href={`#${node.cId}`}>{node.title}</a>
                                  </AgendaEntryTitle>
                                  <AgendaEntryOverline>
                                    {node.type}
                                    <span> at {time} in </span>
                                    {node.room}
                                  </AgendaEntryOverline>
                                </AgendaEntryHeader>
                                <AgendaEntryBody>
                                  <VarProse>
                                    <p>{node.lead}</p>
                                  </VarProse>
                                </AgendaEntryBody>
                                <AgendaEntryFooter>
                                  {peopleCategories.map((cat) => {
                                    const key = cat.toLowerCase();

                                    if (!node.people?.[key]?.length) {
                                      return null;
                                    }

                                    return (
                                      <AgendaEntryParticipants key={key}>
                                        <AgendaEntryParticipantsTitle>
                                          {cat}
                                        </AgendaEntryParticipantsTitle>
                                        <EventPeople list={node.people[key]} />
                                      </AgendaEntryParticipants>
                                    );
                                  })}
                                </AgendaEntryFooter>
                              </AgendaEntry>
                            </li>
                          ))}
                        </TimeSlotEntryList>
                      </TimeSlotBody>
                    </TimeSlot>
                  ))}
                </TabContent>
              );
            })}
          </TabbedContent>
          <TabsSecNav />
        </TabsManager>
      </PageMainContent>
    </Layout>
  );
};

AgendaPage.propTypes = {
  location: T.object
};

export default AgendaPage;

const TabsSecNavSelf = styled.div`
  grid-column: content-start / content-end;
  display: flex;
  gap: ${variableGlsp()};
  justify-content: end;
`;

function TabsSecNav() {
  const { tabList, activeTab, setActiveTab } = useTabs();
  const activeIdx = tabList.findIndex((t) => t.id === activeTab);

  const goToTab = useCallback(
    (idx) => {
      setActiveTab(tabList[idx].id);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    [setActiveTab, tabList]
  );

  return (
    <Hug>
      <TabsSecNavSelf>
        {activeIdx < tabList.length - 1 && (
          <Button
            variation='base-outline'
            size='medium'
            onClick={() => {
              goToTab(activeIdx + 1);
            }}
          >
            Next day <CollecticonArrowRight />
          </Button>
        )}
        {activeIdx > 0 && (
          <Button
            variation='base-outline'
            size='medium'
            onClick={() => {
              goToTab(activeIdx - 1);
            }}
          >
            <CollecticonArrowLeft /> Previous day
          </Button>
        )}
      </TabsSecNavSelf>
    </Hug>
  );
}
