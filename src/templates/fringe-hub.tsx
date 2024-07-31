import React, { Fragment, useEffect } from 'react';
import { HeadFC, PageProps, graphql } from 'gatsby';
import { Global } from '@emotion/react';
import { format } from 'date-fns';
import {
  Box,
  Heading,
  ListItem,
  OrderedList,
  useBreakpointValue
} from '@chakra-ui/react';
import { Hug } from '@devseed-ui/hug-chakra';

import Seo from '$components/seo';
import PageLayout from '$components/page-layout';
import { AgendaEvent, EVENT_DISPLAY_DURATION } from '$components/agenda/event';
import { ChakraFade } from '$components/reveal';
import { parseEventDate, timeFromDate } from '$utils/utils';
import { utcString2userTzDate } from '$utils/date';
import { PageHero } from '$components/page-hero';

interface AgendaEvent {
  parent: {
    body: string;
  };
  id: string;
  cId: string;
  title: string;
  type: string;
  date: string;
  room: string;
  people: Queries.EventPeople;
}

interface FringePageQuery {
  allEvent: {
    nodes: AgendaEvent[];
  };
}

export default function FringePage(props: PageProps<FringePageQuery>) {
  const { allEvent } = props.data;

  // Create day and hour groups for the events.
  const eventsTimeGroups = allEvent.nodes.reduce<
    Record<string, Record<string, AgendaEvent[]>>
  >((acc, event) => {
    const date = parseEventDate(event.date);
    const evDate = format(date, 'yyyy-MM-dd');
    const evTime = timeFromDate(date);

    // Create a map of events by day and time.
    const timeEvents = [...(acc[evDate]?.[evTime] || []), event];

    return {
      ...acc,
      [evDate]: {
        ...(acc[evDate] || {}),
        [evTime]: timeEvents
      }
    };
  }, {});

  const scrollPad = useBreakpointValue({ base: '5rem', md: '6rem' });

  useEffect(() => {
    window.scrollTo(0, 0);
    // When the page loads the animation has to run before being able to scroll,
    // otherwise the position will be off.
    setTimeout(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }, EVENT_DISPLAY_DURATION + 100);
  }, []);

  return (
    <PageLayout pageProps={props}>
      <Global
        styles={{
          html: {
            scrollPaddingTop: scrollPad
          }
        }}
      />
      <PageHero
        title='Fringe Events'
        lead='Happenings for the SatSummit Community.'
      />

      <Hug py={16}>
        {Object.entries(eventsTimeGroups).map(([day, eventsByHour]) => {
          return (
            <Fragment key={day}>
              <Heading
                size='2xl'
                gridColumn='content-start/content-end'
                _notFirst={{
                  pt: 8
                }}
                // Needed to override the border set around each event section.
                sx={{
                  '& + .agenda-time-group': {
                    '.agenda-time, .agenda-events': {
                      border: 'none !important',
                      paddingTop: '0 !important'
                    }
                  }
                }}
              >
                {format(utcString2userTzDate(day), 'EEEE, LLL dd')}
              </Heading>

              {Object.entries(eventsByHour).map(([time, events]) => (
                <ChakraFade
                  key={time}
                  className='agenda-time-group'
                  direction='up'
                  triggerOnce
                  duration={EVENT_DISPLAY_DURATION}
                  gridColumn='content-start / content-end'
                  _notFirst={{
                    '.agenda-time': {
                      borderTop: '8px solid',
                      borderTopColor: 'base.200a',
                      paddingTop: 8,
                      mt: { base: 2, md: 0 }
                    },
                    '.agenda-events': {
                      borderTop: { md: '8px solid' },
                      borderTopColor: { md: 'base.200a' },
                      paddingTop: { md: 8 }
                    }
                  }}
                >
                  <Hug
                    as='section'
                    hugGrid={{ base: ['content-start', 'content-end'] }}
                  >
                    <Box
                      as='header'
                      className='agenda-time'
                      gridColumn={{
                        base: 'content-start/content-end',
                        md: 'content-start/content-2',
                        lg: 'content-start/content-3'
                      }}
                    >
                      <Heading as='h3' size='md'>
                        {time}
                      </Heading>
                    </Box>
                    <Hug
                      as='section'
                      className='agenda-events'
                      hugGrid={{
                        base: ['content-start', 'content-end'],
                        md: ['content-2', 'content-end'],
                        lg: ['content-3', 'content-end']
                      }}
                    >
                      <Hug
                        as={OrderedList}
                        listStyleType='none'
                        hugGrid={{
                          base: ['content-start', 'content-end'],
                          md: ['content-2', 'content-8'],
                          lg: ['content-3', 'content-11']
                        }}
                        display='flex'
                        flexFlow='column nowrap'
                        ml={0}
                      >
                        {events.map((node) => (
                          <ListItem
                            key={node.id}
                            gridColumn='1/-1'
                            _notFirst={{
                              borderTop: '4px solid',
                              borderTopColor: 'base.200a',
                              pt: { base: 4, md: 8, lg: 10 }
                            }}
                          >
                            <AgendaEvent
                              linkTo='/fringe/'
                              startingHLevel={4}
                              cId={node.cId}
                              title={node.title}
                              type={node.type}
                              date={node.date}
                              room={node.room}
                              people={node.people}
                            />
                          </ListItem>
                        ))}
                      </Hug>
                    </Hug>
                  </Hug>
                </ChakraFade>
              ))}
            </Fragment>
          );
        })}
      </Hug>
    </PageLayout>
  );
}

export const query = graphql`
  query ($editionCId: String = "") {
    ...EditionContextualData
    allEvent(
      filter: {
        published: { eq: true }
        fringe: { eq: true }
        edition: { cId: { eq: $editionCId } }
      }
      sort: [{ weight: DESC }, { slug: ASC }, { date: ASC }]
    ) {
      nodes {
        internal {
          contentFilePath
        }
        id
        cId
        title
        type
        date
        room
        people {
          ...AllEventPeople
        }
      }
    }
  }
`;

export const Head: HeadFC = () => (
  <Seo
    title='Fringe Events'
    description='Happenings for the SatSummit Community.'
  />
);
