import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import T from 'prop-types';
import { media } from '@devseed-ui/theme-provider';
import { Heading } from '@devseed-ui/typography';

import { EventPeople } from '$components/agenda/event-people';
import { VarHeading, VarProse } from '$styles/variable-components';
import { variableGlsp } from '$styles/variable-utils';

import { peopleCategories } from './utils';
import { timeFromDate } from '$utils/date';

const AgendaEntry = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp()};
`;

const AgendaEntryHeader = styled.header`
  display: flex;
  flex-direction: column;
`;

const AgendaEntryTitle = styled(VarHeading).attrs({
  as: 'h4',
  size: 'xlarge'
})`
  a,
  a:visited {
    text-decoration: none;
  }
`;

const AgendaEntryOverline = styled(VarHeading).attrs({
  as: 'h3',
  size: 'small'
})`
  order: -1;

  span {
    font-size: 0;

    &::before {
      content: '•';
      font-size: 1.25rem;
      margin: 0 0.25rem;

      ${media.mediumUp`
      font-size: 1.5rem;
      margin: 0 0.5rem;
    `}
    }
  }
`;

const AgendaEntryBody = styled.div`
  /* styled-component */
`;

const AgendaEntryFooter = styled.footer`
  display: flex;
  flex-flow: row wrap;
  gap: ${variableGlsp(0.5)};
`;

const AgendaEntryParticipants = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: ${variableGlsp(0.25)};
`;

const AgendaEntryParticipantsTitle = styled(Heading).attrs({
  as: 'h4',
  size: 'xsmall'
})`
  /* styled-component */
`;

export function AgendaEvent(props) {
  const { cId, title, type, date, room, lead, people } = props;
  const time = timeFromDate(new Date(date));

  return (
    <AgendaEntry>
      <AgendaEntryHeader>
        <AgendaEntryTitle id={cId}>
          <Link to={`/agenda#${cId}`}>{title}</Link>
        </AgendaEntryTitle>
        <AgendaEntryOverline>
          {type}
          <span> at {time} in </span>
          {room}
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
              <AgendaEntryParticipants key={key}>
                <AgendaEntryParticipantsTitle>
                  {cat}
                </AgendaEntryParticipantsTitle>
                <EventPeople list={people[key]} />
              </AgendaEntryParticipants>
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
  people: T.shape({
    facilitators: T.array,
    hosts: T.array,
    moderators: T.array,
    panelists: T.array,
    speakers: T.array
  })
};
