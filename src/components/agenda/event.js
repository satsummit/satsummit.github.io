import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import styled, { css } from 'styled-components';
import T from 'prop-types';
import Clipboard from 'clipboard';
import { Transition } from 'react-transition-group';

import { glsp, themeVal } from '@devseed-ui/theme-provider';
import { Button } from '@devseed-ui/button';
import {
  CollecticonCirclePlay,
  CollecticonLink
} from '@devseed-ui/collecticons';

import { EventPeople } from '$components/agenda/event-people';

import { VarHeading, VarProse } from '$styles/variable-components';
import { variableGlsp } from '$styles/variable-utils';

import { peopleCategories } from './utils';
import { parseEventDate, timeFromDate } from '$utils/date';
import { useMediaQuery } from '$utils/use-media-query';

import { format } from 'date-fns';

const AgendaEntryActions = styled.div`
  position: absolute;
  bottom: calc(100% + ${glsp(0.25)});
  left: 0;
  display: flex;
  flex-direction: row nowrap;
  background: ${themeVal('color.surface')};
  padding: ${glsp(0.25)};
  box-shadow: ${themeVal('boxShadow.elevationD')};
  border-radius: ${themeVal('shape.rounded')};
  opacity: 0;
  transform: translateY(25%);
  transition: opacity 0.16s ease 0.32s, transform 0.16s ease 0.32s;

  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    width: ${glsp(0.5)};
    height: ${glsp(0.5)};
    background: ${themeVal('color.surface')};
    content: '';
    clip-path: polygon(0 0, 0 100%, 100% 0);
    pointer-events: none;
  }
`;

const AgendaEntry = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp(0.5)};

  &:hover {
    ${AgendaEntryActions} {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0s, 0s;
    }
  }
`;

const AgendaEntryHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: row nowrap;
  align-items: flex-end;
  gap: ${glsp()};
`;

const AgendaEntryHeadline = styled.div`
  display: flex;
  flex-direction: column;
`;

const AgendaEntryTitle = styled(VarHeading).attrs((props) => {
  return {
    as: props.as || 'h2',
    size: 'xlarge'
  };
})`
  /* styled-component */
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

  i {
    font-style: inherit;
    margin: ${variableGlsp(0, 0.075)};
  }
`;

const AgendaEntryBody = styled.div`
  /* styled-component */
`;

const AgendaEntryFooter = styled.footer`
  display: flex;
  flex-flow: row wrap;
  gap: ${variableGlsp(0.25, 0.75)};
  margin-top: ${variableGlsp(0.5)};
`;

const AgendaEntryPeople = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: ${variableGlsp(0.25)};
`;

const AgendaEntryPeopleTitle = styled(VarHeading).attrs((props) => {
  return {
    as: props.as || 'h3',
    size: 'xsmall'
  };
})`
  /* styled-component */
`;

const CopyResult = styled.span`
  align-self: center;
  max-width: 0;
  padding: 0;
  overflow: hidden;
  transition: max-width 240ms ease-in-out, padding 240ms ease-in-out;
  width: 100%;

  ${({ transitionState }) =>
    transitionState.includes('enter') &&
    css`
      padding: ${glsp(0, 0.5)};
      max-width: 100px;
    `}
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
    htmlContent,
    people,
    // Starting level for the highest heading on this component.
    startingHLevel = -1
  } = props;

  const { isLargeUp } = useMediaQuery();
  const copyBtnRef = useRef();
  const [showCopiedMsg, setShowCopiedMsg] = useState();
  const { origin } = useLocation();

  const dateObj = parseEventDate(date);
  const time = timeFromDate(dateObj);

  useEffect(() => {
    let copiedMsgTimeout = null;
    const clipboard = new Clipboard(copyBtnRef.current, {
      text: () => `${origin}/agenda#${cId}`
    });

    clipboard.on('success', () => {
      setShowCopiedMsg(true);
      copiedMsgTimeout = setTimeout(() => {
        setShowCopiedMsg(false);
      }, 1000);
    });

    return () => {
      clipboard.destroy();
      if (copiedMsgTimeout) clearTimeout(copiedMsgTimeout);
    };
  }, [origin, cId]);

  return (
    <AgendaEntry>
      <AgendaEntryHeader>
        <AgendaEntryHeadline>
          <AgendaEntryTitle as={hl(startingHLevel)} id={cId}>
            <AgendaEntryTitleLink to={`/agenda#${cId}`}>
              {title}
            </AgendaEntryTitleLink>
          </AgendaEntryTitle>
          <AgendaEntryOverline>
            <span>
              {format(dateObj, 'MMM. dd')}, {time} <i>•</i>{' '}
            </span>
            {type} <i>•</i> {room}
          </AgendaEntryOverline>
        </AgendaEntryHeadline>
        <AgendaEntryActions>
          <Button
            variation='primary-text'
            size={isLargeUp ? 'large' : 'medium'}
            fitting='skinny'
            ref={copyBtnRef}
          >
            <CollecticonLink title='Copy link' meaningful />
          </Button>
          <Transition
            in={showCopiedMsg}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            {(state) => (
              <CopyResult transitionState={state}>Copied!</CopyResult>
            )}
          </Transition>
          {/* <Button
            variation='primary-text'
            size={isLargeUp ? 'large' : 'medium'}
            fitting='skinny'
            forwardedAs='a'
            href='/'
            disabled
          >
            <CollecticonCirclePlay title='Watch recording' meaningful />
          </Button> */}
        </AgendaEntryActions>
      </AgendaEntryHeader>
      {htmlContent && (
        <AgendaEntryBody>
          <VarProse dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </AgendaEntryBody>
      )}
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
  htmlContent: T.string,
  startingHLevel: T.number,
  people: T.shape({
    facilitators: T.array,
    hosts: T.array,
    moderators: T.array,
    panelists: T.array,
    speakers: T.array
  })
};
