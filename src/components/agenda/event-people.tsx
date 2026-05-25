import React from 'react';
import { List } from '@chakra-ui/react';

import { LinkedSpeaker } from './linked-speaker';

interface EventPeopleProps {
  list: readonly Queries.PeopleOrVoid[];
}

export function EventPeople(props: EventPeopleProps) {
  const { list } = props;

  return (
    <List.Root
      as='ol'
      unstyled
      display='flex'
      flexFlow='row wrap'
      columnGap={{ base: 3, md: 4 }}
      ml={0}
    >
      {list.map((person) => (
        <List.Item key={(person as Queries.People).slug || person.title}>
          <LinkedSpeaker name={person.title} />
        </List.Item>
      ))}
    </List.Root>
  );
}
