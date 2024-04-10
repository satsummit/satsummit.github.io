import React from 'react';
import { List, ListItem } from '@chakra-ui/react';

import { LinkedSpeaker } from './linked-speaker';

interface EventPeopleProps {
  list: readonly Queries.PeopleOrVoid[];
}

export function EventPeople(props: EventPeopleProps) {
  const { list } = props;

  return (
    <List
      as='ol'
      display='flex'
      flexFlow='row wrap'
      columnGap={{ base: 3, md: 4 }}
      ml={0}
    >
      {list.map((person) => (
        <ListItem key={(person as Queries.People).slug || person.title}>
          <LinkedSpeaker name={person.title} />
        </ListItem>
      ))}
    </List>
  );
}
