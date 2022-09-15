import React, { useMemo } from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import { listReset } from '@devseed-ui/theme-provider';
import { variableGlsp } from '$styles/variable-utils';
import { Link } from 'gatsby';
import { VarProse } from '$styles/variable-components';

const AgendaEntryPeopleList = styled(VarProse).attrs({
  as: 'ol'
})`
  ${listReset()};
  display: flex;
  flex-flow: row wrap;
  gap: ${variableGlsp(0.125)};

  > * {
    margin: 0;
  }

  li:not(:last-child)::after {
    content: ', ';
  }

  > li:nth-last-of-type(2)::after {
    content: ' & ';
  }
`;

const toArray = (v) => {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
};

export function EventPeople(props) {
  const list = useMemo(() => toArray(props.list), [props.list]);

  return (
    <AgendaEntryPeopleList>
      {list.map((person) => {
        if (person.isVoid || person.group !== 'main') {
          return (
            <li key={person.title}>
              <strong>{person.title}</strong>
            </li>
          );
        } else {
          return (
            <li key={person.slug}>
              <Link to={`/speakers/${person.slug}`}>
                <strong>{person.title}</strong>
              </Link>
            </li>
          );
        }
      })}
    </AgendaEntryPeopleList>
  );
}

EventPeople.propTypes = {
  list: T.arrayOf(
    T.oneOfType([
      T.shape({
        title: T.string,
        slug: T.string
      }),
      T.shape({
        title: T.string,
        isVoid: T.boolean
      })
    ])
  )
};
