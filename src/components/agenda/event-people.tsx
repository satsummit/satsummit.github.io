import React from 'react';
import { List } from '@chakra-ui/react';

import SmartLink from '$components/smart-link';

// const toArray = (v) => {
//   if (!v) return [];
//   return Array.isArray(v) ? v : [v];
// };

interface EventPeopleProps {
  list: readonly Queries.PeopleOrVoid[];
}

export function EventPeople(props: EventPeopleProps) {
  const { list } = props;
  // const list = useMemo(() => toArray(props.list), [props.list]);

  return (
    <List as='ol' display='flex' flexFlow='row wrap' gap={{ base: 0.5, md: 1 }}>
      {list.map((person) => {
        const actualPerson = person as Queries.People;
        const voidPerson = person as Queries.VoidPeople;

        if (voidPerson.isVoid || actualPerson.group !== 'main') {
          return (
            <li key={person.title}>
              <strong>{person.title}</strong>
            </li>
          );
        } else {
          return (
            <li key={actualPerson.slug}>
              <SmartLink to={`/speakers/${actualPerson.slug}`}>
                <strong>{actualPerson.title}</strong>
              </SmartLink>
            </li>
          );
        }
      })}
    </List>
  );
}
