import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HeadProps, PageProps, graphql, navigate } from 'gatsby';
import { format } from 'date-fns';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import { Hug } from '@devseed-ui/hug-chakra';
import { Global } from '@emotion/react';
import {
  CollecticonArrowLeft,
  CollecticonArrowRight
} from '@devseed-ui/collecticons-chakra';

import Seo from '$components/seo';
import PageLayout from '$components/page-layout';
import { AgendaEvent, EVENT_DISPLAY_DURATION } from '$components/agenda/event';
import SmartLink from '$components/smart-link';
import { ChakraFade } from '$components/reveal';
import { parseEventDate, timeFromDate } from '$utils/utils';
import { utcString2userTzDate } from '$utils/date';
import { useEditionCId } from '$context/edition';
import { PageHeroFoundation, PageHeroHeadline } from '$components/page-hero';

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

interface AgendaPageQuery extends Queries.EditionContextualDataFragment {
  allEvent: {
    nodes: AgendaEvent[];
  };
  edition: Queries.EditionContextualDataFragment['edition'] & {
    dates: string[];
  };
}

interface AgendaPageContext {
  start: string;
  end: string;
  dayIndex: number;
  editionCId: string;
}

export default function AgendaPage(
  props: PageProps<AgendaPageQuery, AgendaPageContext>
) {
  const { allEvent, edition } = props.data;
  const { start, editionCId, dayIndex } = props.pageContext;

  const hourGroups = allEvent.nodes.reduce<Record<string, AgendaEvent[]>>(
    (acc, event) => {
      const t = timeFromDate(parseEventDate(event.date));
      return {
        ...acc,
        [t]: [...(acc[t] || []), event]
      };
    },
    {}
  );

  const scrollPad = useBreakpointValue({ base: '5rem', md: '6rem' });

  const eventDates = edition.dates.map((d) => utcString2userTzDate(d));
  const currentDay = utcString2userTzDate(start);

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
      <PageHeroFoundation
        innerProps={{
          gap: 8,
          flexFlow: 'column',
          alignItems: 'start'
        }}
      >
        <PageHeroHeadline
          title='Agenda'
          parent={{ url: `/${editionCId}/agenda`, title: 'Agenda' }}
        />

        <Text textStyle='lead.lg' maxW='container.sm'>
          {edition.dates.length} days of presentations and in-depth
          conversations.
        </Text>

        <ButtonGroup
          isAttached
          colorScheme='surface'
          variant='soft-outline'
          size={{ base: 'sm', md: 'md' }}
        >
          {eventDates.map((date, i) => (
            <Button
              key={date.getTime()}
              as={SmartLink}
              noLinkStyles
              to={
                !i ? `/${editionCId}/agenda/` : `/${editionCId}/agenda/${i + 1}`
              }
              isActive={date.getTime() === currentDay.getTime()}
              color='currentColor'
            >
              {format(date, 'EEEE, LLL dd')}
            </Button>
          ))}
        </ButtonGroup>
      </PageHeroFoundation>

      <Hug py={{ base: 8, md: 16 }}>
        <Heading as='h2' size='2xl' gridColumn='content-start/content-end'>
          {format(currentDay, 'EEEE, LLL dd')}
        </Heading>
        {Object.entries(hourGroups).length === 0 && (
          <Text gridColumn='content-start/content-end'>
            No events scheduled for this day.
          </Text>
        )}
        {Object.entries(hourGroups).map(([time, eventsByTime]) => (
          <EventHourGroup
            key={time}
            dayIndex={dayIndex}
            time={time}
            day={format(currentDay, 'EEE, LLL dd')}
            events={eventsByTime}
          />
        ))}
      </Hug>

      <TabsSecNav dates={eventDates} currentDay={currentDay} />
    </PageLayout>
  );
}

interface EventHourGroup {
  dayIndex: number;
  time: string;
  day: string;
  events: AgendaEvent[];
}

function EventHourGroup(props: EventHourGroup) {
  const { dayIndex, time, day, events } = props;

  const timeRef = useRef<HTMLDivElement>(null);
  const [isStuck, setStuck] = useState(false);

  useEffect(() => {
    if (!timeRef.current) return;

    const observer = new IntersectionObserver(
      ([e]) => setStuck(e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(timeRef.current);

    return () => observer.disconnect();
  });

  return (
    <ChakraFade
      direction='up'
      triggerOnce
      gridColumn='content-start / content-end'
      duration={EVENT_DISPLAY_DURATION}
      _notFirst={{
        '.agenda-time': {
          borderTop: '8px solid',
          borderTopColor: 'base.200a',
          paddingTop: 8,
          mt: { base: 2, md: 0 },
          top: { base: '-2rem', md: '-1rem' }
        },
        '.agenda-events': {
          borderTop: { md: '8px solid' },
          borderTopColor: { md: 'base.200a' },
          paddingTop: { md: 8 }
        }
      }}
    >
      <Hug as='section' hugGrid={{ base: ['content-start', 'content-end'] }}>
        <Box
          as='header'
          ref={timeRef}
          className='agenda-time'
          gridColumn={{
            base: 'content-start/content-end',
            md: 'content-start/content-2',
            lg: 'content-start/content-3'
          }}
          position='sticky'
          top={{ base: '-1px' }}
          zIndex={10}
          alignSelf='flex-start'
          margin={{
            base: '0 -1rem',
            md: 0
          }}
          px={{
            base: 4,
            md: 0
          }}
          py={{
            base: isStuck ? 2 : 0,
            md: isStuck ? 4 : 0
          }}
          background='surface.500'
          boxShadow={{ base: isStuck ? 'md' : undefined, md: 'none' }}
        >
          <Heading
            as='h3'
            size='md'
            display={{ base: 'flex', md: 'block' }}
            alignItems='center'
            gap={2}
          >
            {isStuck ? (
              <>
                {day}
                <Divider
                  borderColor='base.200a'
                  size='xs'
                  h='5'
                  orientation='vertical'
                  display={{ md: 'none' }}
                />{' '}
              </>
            ) : null}
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
                  startingHLevel={4}
                  dayIndex={dayIndex}
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
  );
}

function TabsSecNav(props: { dates: Date[]; currentDay: Date }) {
  const { dates, currentDay } = props;

  const editionCId = useEditionCId();

  const activeIdx = dates.findIndex(
    (d) => d.getTime() === currentDay.getTime()
  );

  const goToTab = useCallback((idx: number) => {
    navigate(
      !idx ? `/${editionCId}/agenda/` : `/${editionCId}/agenda/${idx + 1}`
    );
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [editionCId]);

  return (
    <Hug pb={16}>
      <Flex gridColumn='content-start / content-end'>
        {activeIdx > 0 && (
          <Button
            variant='solid'
            colorScheme='primary'
            size={{ base: 'md', md: 'lg' }}
            onClick={() => {
              goToTab(activeIdx - 1);
            }}
            leftIcon={<CollecticonArrowLeft />}
          >
            View previous day
          </Button>
        )}
        {activeIdx < dates.length - 1 && (
          <Button
            variant='solid'
            colorScheme='primary'
            size={{ base: 'md', md: 'lg' }}
            ml='auto'
            onClick={() => {
              goToTab(activeIdx + 1);
            }}
            rightIcon={<CollecticonArrowRight />}
          >
            View next day
          </Button>
        )}
      </Flex>
    </Hug>
  );
}

export const query = graphql`
  query AgendaHub($start: Date, $end: Date, $editionCId: String = "") {
    ...EditionContextualData
    allEvent(
      filter: {
        date: { gt: $start, lt: $end }
        published: { eq: true }
        fringe: { eq: false }
        edition: { cId: { eq: $editionCId } }
      }
      sort: [{ date: ASC }, { weight: DESC }, { slug: ASC }]
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
        fringe
        people {
          ...AllEventPeople
        }
      }
    }
    edition(cId: { eq: $editionCId }) {
      dates
    }
  }
`;

export const Head = (props: HeadProps<AgendaPageQuery>) => (
  <Seo
    title='Agenda'
    description={`${props.data.edition.dates.length} days of presentations and in-depth conversations.`}
    edition={props.data.edition}
  />
);
