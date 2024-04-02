import React from 'react';
import { As, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

import { peopleCategories } from './utils';
import SmartLink from '../smart-link';
import { parseEventDate, timeFromDate } from '../../templates/agenda-hub';

import { EventPeople } from '$components/agenda/event-people';
import { events } from '$components/agenda/events-gen';
import { MDXProse } from '$components/mdx-prose';

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
    startingHLevel = -1
  } = props;

  const dateObj = parseEventDate(date);
  const time = timeFromDate(dateObj);

  const EventMDXContent = events[cId];

  return (
    <Flex as='article' flexDir='column' gap={2}>
      <Flex pos='relative' align='flex-end' gap={4}>
        <Flex flexDir='column'>
          <Heading as={hl(startingHLevel)} id={cId} size='xl'>
            <SmartLink to={`/agenda#${cId}`}>{title}</SmartLink>
          </Heading>
          <Heading as='p' size='sm' order={-1}>
            <span>
              {format(dateObj, 'MMM. dd')}, {time} <i>•</i>{' '}
            </span>
            {type} <Text as='i'>•</Text> {room}
          </Heading>
        </Flex>
      </Flex>
      {EventMDXContent && (
        <Box>
          <MDXProse>
            <EventMDXContent />
          </MDXProse>
        </Box>
      )}
      {people && (
        <Flex as='footer' flexFlow='row wrap'>
          {peopleCategories.map((cat) => {
            const key = cat.toLowerCase() as keyof Queries.EventPeople;
            const eventPeople = people[key] as
              | Queries.PeopleOrVoid[]
              | undefined;

            if (!eventPeople?.length) {
              return null;
            }

            return (
              <Flex
                flexFlow='row wrap'
                key={key}
                gap={{ base: 1, md: 1.5, lg: 2 }}
              >
                <Heading as={hl(startingHLevel + 1)} size='xs'>
                  {cat}
                </Heading>
                <EventPeople list={eventPeople!} />
              </Flex>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}
