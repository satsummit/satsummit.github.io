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
import { parseEventDate, timeFromDate } from '$utils/utils';

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
    linkTo = '/agenda/',
    showDate = false
  } = props;

  const dateObj = parseEventDate(date);
  const time = timeFromDate(dateObj);

  const EventMDXContent = events[cId];

  const DateWrapper = showDate ? Fragment : VisuallyHidden;

  return (
    <Flex as='article' flexDir='column' gap={{ base: 4, md: 6 }}>
      <Flex pos='relative' align='flex-end' gap={4}>
        <Flex flexDir='column'>
          <Heading as={hl(startingHLevel)} id={cId} size='xl'>
            <SmartLink to={`${linkTo}#${cId}`}>{title}</SmartLink>
          </Heading>
          <Heading
            as='p'
            size='md'
            order={-1}
            display='flex'
            alignItems='center'
            gap={2}
          >
            <DateWrapper>
              {format(dateObj, 'MMM. dd')}, {time}{' '}
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
      {EventMDXContent && (
        <Box>
          <MDXProse
            sx={{
              '& >:first-child': { mt: 0 },
              '& >:last-child': { mb: 0 }
            }}
          >
            <EventMDXContent />
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
