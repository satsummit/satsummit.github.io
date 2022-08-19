import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import T from 'prop-types';
import { Heading } from '@devseed-ui/typography';

import { EventPeople } from '$components/agenda/event-people';
import { VarHeading, VarProse } from '$styles/variable-components';
import { variableGlsp } from '$styles/variable-utils';

import { peopleCategories } from './utils';
import { timeFromDate } from '$utils/date';
import { format } from 'date-fns';

const AgendaEntry = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp()};
`;

const AgendaEntryHeader = styled.header`
  display: flex;
  flex-direction: column;
`;

const AgendaEntryTitle = styled(VarHeading).attrs((props) => {
  return {
    as: props.as || 'h2',
    size: 'xlarge'
  };
})`
  /* styled-components */
`;

const AgendaEntryTitleLink = styled(Link)`
  text-decoration: none;
  transition: opacity 0.24s ease;

  &:visited {
    color: inherit;
  }

  &:hover {
    opacity: 0.64;
  }
`;

export const AgendaEntryOverline = styled(VarHeading).attrs((props) => {
  return {
    as: props.as || 'p',
    size: 'small'
  };
})`
  order: -1;
`;

const AgendaEntryBody = styled.div`
  /* styled-component */
`;

const AgendaEntryFooter = styled.footer`
  display: flex;
  flex-flow: row wrap;
  gap: ${variableGlsp(0.25, 0.75)};
`;

const AgendaEntryPeople = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: ${variableGlsp(0.25)};
`;

const AgendaEntryPeopleTitle = styled(Heading).attrs((props) => {
  return {
    as: props.as || 'h3',
    size: 'xsmall'
  };
})`
  /* styled-component */
`;

// Get the Heading tag.
const hl = (l) => l > 0 && `h${l}`;

export function AgendaEvent(props) {
  const {
    cId,
    title,
    type,
    date,
    room,
    lead,
    people,
    // Starting level for the highest heading on this component.
    startingHLevel = -1
  } = props;
  const dateObj = new Date(date);
  const time = timeFromDate(dateObj);

  return (
    <AgendaEntry>
      <AgendaEntryHeader>
        <AgendaEntryTitle as={hl(startingHLevel)} id={cId}>
          <AgendaEntryTitleLink to={`/agenda#${cId}`}>
            {title}
          </AgendaEntryTitleLink>
        </AgendaEntryTitle>
        <AgendaEntryOverline>
          {type}
          <span>
            {' '}
            • {format(dateObj, 'MMM. dd')}, {time}
          </span>{' '}
          • {room}
        </AgendaEntryOverline>
      </AgendaEntryHeader>
      <AgendaEntryBody>
        <VarProse>
          <p>{lead}</p>
        </VarProse>
      </AgendaEntryBody>
      {people && (
        <AgendaEntryFooter>
          {peopleCategories.map((cat) => {
            const key = cat.toLowerCase();

            if (!people?.[key]?.length) {
              return null;
            }

            return (
              <AgendaEntryPeople key={key}>
                <AgendaEntryPeopleTitle as={hl(startingHLevel + 1)}>
                  {cat}
                </AgendaEntryPeopleTitle>
                <EventPeople list={people[key]} />
              </AgendaEntryPeople>
            );
          })}
        </AgendaEntryFooter>
      )}
    </AgendaEntry>
  );
}

AgendaEvent.propTypes = {
  cId: T.string,
  title: T.string,
  type: T.string,
  date: T.string,
  room: T.string,
  lead: T.string,
  startingHLevel: T.number,
  people: T.shape({
    facilitators: T.array,
    hosts: T.array,
    moderators: T.array,
    panelists: T.array,
    speakers: T.array
  })
};
