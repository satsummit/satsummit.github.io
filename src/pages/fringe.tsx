import React, { Fragment, useEffect } from 'react';
import { HeadFC, PageProps, graphql } from 'gatsby';
import { Global } from '@emotion/react';
import { format } from 'date-fns';
import {
  Box,
  Container,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import { Hug } from '@devseed-ui/hug-chakra';

import Seo from '$components/seo';
import PageLayout from '$components/page-layout';
import { AgendaEvent } from '$components/agenda/event';
import { ChakraFade } from '$components/reveal';
import { parseEventDate, timeFromDate } from '$utils/utils';
import { utcString2userTzDate } from '$utils/date';

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
  site: { siteMetadata: { eventDates: string[] } };
}

export default function FringePage(
  props: PageProps<FringePageQuery, { start: string; end: string }>
) {
  // Create day and hour groups for the events.
  const eventsTimeGroups = props.data.allEvent.nodes.reduce<
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

  useEffect(() => {
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const scrollPad = useBreakpointValue({ base: '5rem', md: '6rem' });

  return (
    <PageLayout>
      <Global
        styles={{
          html: {
            scrollPaddingTop: scrollPad
          }
        }}
      />
      <Box
        background='primary.500'
        px={{ base: '4', md: '8' }}
        py={{ base: '8', lg: '16' }}
      >
        <Container
          maxW='container.xl'
          color='white'
          display='flex'
          flexFlow={{ base: 'column', md: 'row' }}
          gap={8}
          p='0'
        >
          <Flex flexFlow='column' gap='4'>
            <Heading size='4xl' as='h1'>
              Fringe
            </Heading>
            <Text textStyle='lead.lg' maxW='container.sm'>
              Because SatSummit is not just the conference.
            </Text>
          </Flex>
        </Container>
      </Box>

      <Hug py={16}>
        {Object.entries(eventsTimeGroups).map(([day, eventsByHour]) => {
          return (
            <Fragment key={day}>
              <Heading
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
                      <Heading as='h3' size='sm'>
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
  query {
    allEvent(
      filter: { published: { eq: true }, fringe: { eq: true } }
      sort: [{ slug: ASC }, { date: ASC }]
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
    site {
      siteMetadata {
        eventDates
      }
    }
  }
`;

export const Head: HeadFC = () => (
  <Seo
    title='Fringe'
    description='Because SatSummit is not just the conference.'
  />
);
