import React, { useMemo } from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import { listReset } from '@devseed-ui/theme-provider';
import { variableGlsp } from '$styles/variable-utils';
import { Link } from 'gatsby';

const AgendaEntryFolksList = styled.ol`
  ${listReset()};
  display: flex;
  flex-flow: row wrap;
  gap: ${variableGlsp(0.125)};

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
  const raw = useMemo(() => toArray(props.raw), [props.raw]);

  // List contains the list of people that have a relationship with the People
  // content type. For people that don't have a relationship (i.e. no .md file),
  // the value will be null. In this case we look at the raw value (before a
  // relationship is established) and render the name as it was added.
  // We check this using the index because the order is the same.
  return (
    <AgendaEntryFolksList>
      {list.map((person, idx) => {
        if (!person) {
          const personNoRel = raw[idx];
          return (
            <li key={personNoRel}>
              <strong>{personNoRel}</strong>
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
    </AgendaEntryFolksList>
  );
}

EventPeople.propTypes = {
  list: T.arrayOf(
    T.shape({
      title: T.string,
      slug: T.string
    })
  ),
  raw: T.oneOfType(T.string, T.arrayOf(T.string))
};
