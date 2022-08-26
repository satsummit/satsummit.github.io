import React, { useCallback, useEffect, useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import T from 'prop-types';
import { media, themeVal, visuallyHidden } from '@devseed-ui/theme-provider';
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
import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';
import Hug from '$styles/hug';
import { VarHeading } from '$styles/variable-components';
import { variableGlsp } from '$styles/variable-utils';

import { timeFromDate } from '$utils/date';
import { useMediaQuery } from '$utils/use-media-query';
import { AgendaEventList, AgendaEventListItem } from '$components/agenda';
import { agendaDays } from '$components/agenda/utils';
import { AgendaEntryOverline } from '$components/agenda/event';

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
  &:not(:first-of-type) > * {
    ${media.mediumUp`
      margin-top: 0;
      padding-top: ${variableGlsp()};
      border-top: 8px solid ${themeVal('color.secondary-500')};
    `}
  }

  &:not(:first-of-type) > *:first-child {
    margin-top: ${variableGlsp(0.75)};
    padding-top: ${variableGlsp(2)};
    border-top: 8px solid ${themeVal('color.secondary-500')};

    ${media.mediumUp`
      margin-top: 0;
      padding-top: ${variableGlsp()};
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
  ${AgendaEntryOverline} {
    span {
      ${visuallyHidden()}
    }
  }
`;

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
              {agendaDays.map((d, idx) => (
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

            {agendaDays.map((d) => {
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
                        <AgendaEventList>
                          {eventsByTime.map((node) => (
                            <AgendaEventListItem
                              key={node.id}
                              startingHLevel={4}
                              cId={node.cId}
                              title={node.title}
                              type={node.type}
                              date={node.date}
                              room={node.room}
                              lead={node.lead}
                              people={node.people}
                            />
                          ))}
                        </AgendaEventList>
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

const TabsSecNavSelf = styled(Hug)`
  /* styled-component */
`;

const TabsSecNavInner = styled(Hug).attrs({
  grid: { smallUp: ['content-start', 'content-end'] }
})`
  margin-top: ${variableGlsp(0.5)};
  padding-bottom: ${variableGlsp(2)};

  /* stylelint-disable no-descending-specificity */
  > * {
    ${media.mediumUp`
      grid-column-start: content-2;
    `}

    ${media.largeUp`
      grid-column-start: content-3;
    `}
  }
  /* stylelint-enable no-descending-specificity */
`;

function TabsSecNav() {
  const { tabList, activeTab, setActiveTab } = useTabs();
  const activeIdx = tabList.findIndex((t) => t.id === activeTab);
  const { isLargeUp } = useMediaQuery();

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
    <TabsSecNavSelf>
      <TabsSecNavInner>
        {activeIdx < tabList.length - 1 && (
          <Button
            variation='base-fill'
            size={isLargeUp ? 'xlarge' : 'large'}
            fitting='relaxed'
            onClick={() => {
              goToTab(activeIdx + 1);
            }}
          >
            View next day <CollecticonArrowRight />
          </Button>
        )}
        {activeIdx > 0 && (
          <Button
            variation='base-fill'
            size={isLargeUp ? 'xlarge' : 'large'}
            fitting='relaxed'
            onClick={() => {
              goToTab(activeIdx - 1);
            }}
          >
            <CollecticonArrowLeft /> View previous day
          </Button>
        )}
      </TabsSecNavInner>
    </TabsSecNavSelf>
  );
}
