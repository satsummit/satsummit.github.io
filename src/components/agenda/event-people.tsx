import React from 'react';
import { List } from '@chakra-ui/react';

import { LinkedSpeaker } from './linked-speaker';

interface EventPeopleProps {
  list: readonly Queries.PeopleOrVoid[];
}

export function EventPeople(props: EventPeopleProps) {
  const { list } = props;

  return (
    <List as='ol' display='flex' flexFlow='row wrap' gap={{ base: 0.5, md: 1 }}>
      {list.map((person) => (
        <li key={(person as Queries.People).slug || person.title}>
          <LinkedSpeaker name={person.title} />
        </li>
      ))}
    </List>
  );
}
