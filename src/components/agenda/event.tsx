import React, { Fragment } from 'react';
import {
  As,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  VisuallyHidden
} from '@chakra-ui/react';
import { format } from 'date-fns';

import { peopleCategories } from './utils';
import SmartLink from '../smart-link';

import { EventPeople } from '$components/agenda/event-people';
import { events } from '$components/agenda/events-gen';
import { MDXProse } from '$components/mdx-prose';
import { parseEventDate } from '$utils/utils';
import { useEditionCId, useEditionContext } from '$context/edition';

export const EVENT_DISPLAY_DURATION = 640;

// Get the Heading tag.
const hl = (l: number) => (l > 0 ? (`h${l}` as As) : undefined);

interface AgendaEventProps {
  cId: string;
  title: string;
  type: string;
  date: string;
  room: string;
  people: Queries.EventPeople;
  startingHLevel?: number;
  linkTo?: string;
  dayIndex?: number;
  showDate?: boolean;
}

export function AgendaEvent(props: AgendaEventProps) {
  const {
    cId,
    title,
    type,
    date,
    room,
    people,
    // Starting level for the highest heading on this component.
    startingHLevel = -1,
    linkTo,
    dayIndex = 0,
    showDate = false
  } = props;

  const dateObj = parseEventDate(date);
  const { edition } = useEditionContext();

  const editionCId = useEditionCId();

  const eventMDXContent = events[`${editionCId}-${cId}`];

  const DateWrapper = showDate ? Fragment : VisuallyHidden;

  // If the linkTo prop is not provided, the link will be to the agenda page.
  // Therefore we need to know the day's index to generate the link.
  const eventBaseLink =
    linkTo || dayIndex > 0
      ? `/${editionCId}/agenda/${dayIndex + 1}`
      : `/${editionCId}/agenda`;

  return (
    <Flex as='article' flexDir='column' gap={{ base: 4, md: 6 }}>
      <Flex pos='relative' align='flex-end' gap={4}>
        <Flex flexDir='column'>
          <Heading as={hl(startingHLevel)} id={cId} size='xl'>
            <SmartLink to={`${eventBaseLink}#${cId}`}>{title}</SmartLink>
          </Heading>
          <Heading
            as='div'
            size='md'
            order={-1}
            display='flex'
            alignItems='center'
            gap={2}
          >
            <DateWrapper>
              {format(dateObj, `MMM. dd ''yy`)},{' '}
              {format(dateObj, edition?.format?.event_time || 'HH:mm')}{' '}
              <Divider
                borderColor='base.200a'
                size='xs'
                h='5'
                orientation='vertical'
              />
            </DateWrapper>
            {type}{' '}
            <Divider
              borderColor='base.200a'
              size='xs'
              h='5'
              orientation='vertical'
            />{' '}
            {room}
          </Heading>
        </Flex>
      </Flex>
      {!eventMDXContent.empty && (
        <Box>
          <MDXProse
            sx={{
              '& >:first-child': { mt: '0 !important' },
              '& >:last-child': { mb: '0 !important' }
            }}
          >
            <eventMDXContent.component />
          </MDXProse>
        </Box>
      )}
      {people && (
        <Grid
          as='footer'
          templateColumns='min-content auto'
          rowGap={{ base: 1, lg: 2 }}
          columnGap={{ base: 2, md: 4 }}
        >
          {peopleCategories.map((cat) => {
            const key = cat.toLowerCase() as keyof Queries.EventPeople;
            const eventPeople = people[key] as
              | Queries.PeopleOrVoid[]
              | undefined;

            if (!eventPeople?.length) {
              return null;
            }

            return (
              <Fragment key={key}>
                <Heading as={hl(startingHLevel + 1)} size='sm'>
                  {cat}
                </Heading>
                <EventPeople list={eventPeople!} />
              </Fragment>
            );
          })}
        </Grid>
      )}
    </Flex>
  );
}
