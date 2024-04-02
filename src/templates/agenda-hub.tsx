import React from 'react';
import { HeadFC, PageProps, graphql } from 'gatsby';
import { format, parse } from 'date-fns';
import { Box, Heading, ListItem, OrderedList } from '@chakra-ui/react';
import { Hug } from '@devseed-ui/hug-chakra';

import Seo from '$components/seo';
import PageLayout from '$components/page-layout';
import PageHero from '$components/page-hero';
import { AgendaEvent } from '$components/agenda/event';

export const timeFromDate = (d: Date) => format(d, 'hh:mmaaa');

export const parseEventDate = (d: string) =>
  parse(d, 'yyyy-MM-dd HH:mm', new Date());

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

interface AgendaPageQuery {
  allEvent: {
    nodes: AgendaEvent[];
  };
}

export default function AgendaPage(props: PageProps<AgendaPageQuery>) {
  const hourGroups = props.data.allEvent.nodes.reduce<
    Record<string, AgendaEvent[]>
  >((acc, event) => {
    const t = timeFromDate(parseEventDate(event.date));
    return {
      ...acc,
      [t]: [...(acc[t] || []), event]
    };
  }, {});

  return (
    <PageLayout>
      <PageHero title='Agenda' lead='Everything you can see at satsummit' />

      <Hug>
        {Object.entries(hourGroups).map(([time, eventsByTime]) => (
          <Hug
            as='section'
            key={time}
            hugGrid={{ base: ['content-start', 'content-end'] }}
          >
            <Box
              as='header'
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
              >
                {eventsByTime.map((node) => (
                  <ListItem key={node.id} gridColumn='1/-1'>
                    <AgendaEvent
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
        ))}
      </Hug>
    </PageLayout>
  );
}

export const query = graphql`
  query ($start: Date, $end: Date) {
    allEvent(
      filter: { date: { gt: $start, lt: $end } }
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
  }
`;

export const Head: HeadFC = () => <Seo title='Agenda' />;
