import React, { useCallback, useEffect } from 'react';
import { HeadFC, PageProps, graphql, navigate } from 'gatsby';
import { format } from 'date-fns';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
  VisuallyHidden,
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
import { AgendaEvent } from '$components/agenda/event';
import SmartLink from '$components/smart-link';
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

interface AgendaPageQuery {
  allEvent: {
    nodes: AgendaEvent[];
  };
  site: { siteMetadata: { eventDates: string[] } };
}

export default function AgendaPage(
  props: PageProps<AgendaPageQuery, { start: string; end: string }>
) {
  const hourGroups = props.data.allEvent.nodes.reduce<
    Record<string, AgendaEvent[]>
  >((acc, event) => {
    const t = timeFromDate(parseEventDate(event.date));
    return {
      ...acc,
      [t]: [...(acc[t] || []), event]
    };
  }, {});

  useEffect(() => {
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const scrollPad = useBreakpointValue({ base: '5rem', md: '6rem' });

  const eventDates = props.data.site.siteMetadata.eventDates.map((d) =>
    utcString2userTzDate(d)
  );
  const currentDay = utcString2userTzDate(props.pageContext.start);

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
              Agenda
            </Heading>
            <Text textStyle='lead.lg' maxW='container.sm'>
              2 days of presentations and in-depth conversations
            </Text>
          </Flex>
          <Flex
            alignSelf={{ base: 'flex-start', md: 'flex-end' }}
            ml={{ md: 'auto' }}
          >
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
                  to={!i ? '/agenda/' : `/agenda/${i + 1}`}
                  isActive={date.getTime() === currentDay.getTime()}
                  color='currentColor'
                >
                  {format(date, 'EEEE, LLL dd')}
                </Button>
              ))}
            </ButtonGroup>
          </Flex>
        </Container>
      </Box>

      <Hug py={{ base: 8, md: 16 }}>
        <VisuallyHidden>
          <Heading as='h2'>{format(currentDay, 'EEEE, LLL dd')}</Heading>
        </VisuallyHidden>
        {Object.entries(hourGroups).map(([time, eventsByTime]) => (
          <ChakraFade
            key={time}
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
                  {eventsByTime.map((node) => (
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
      </Hug>

      <TabsSecNav dates={eventDates} currentDay={currentDay} />
    </PageLayout>
  );
}

function TabsSecNav(props: { dates: Date[]; currentDay: Date }) {
  const { dates, currentDay } = props;

  const activeIdx = dates.findIndex(
    (d) => d.getTime() === currentDay.getTime()
  );

  const goToTab = useCallback((idx: number) => {
    navigate(!idx ? '/agenda/' : `/agenda/${idx + 1}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

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
          >
            <CollecticonArrowLeft /> View previous day
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
          >
            View next day <CollecticonArrowRight />
          </Button>
        )}
      </Flex>
    </Hug>
  );
}

export const query = graphql`
  query ($start: Date, $end: Date) {
    allEvent(
      filter: {
        date: { gt: $start, lt: $end }
        published: { eq: true }
        fringe: { eq: false }
      }
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
        fringe
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
    title='Agenda'
    description='2 days of presentations and in-depth conversations.'
  />
);