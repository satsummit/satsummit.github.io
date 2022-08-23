import React from 'react';
import styled from 'styled-components';
import { listReset, multiply, themeVal } from '@devseed-ui/theme-provider';

import Hug from '$styles/hug';
import { variableGlsp } from '$styles/variable-utils';

import { AgendaEvent } from './event';

export const AgendaEventList = styled(Hug).attrs({
  as: 'ol',
  grid: {
    mediumUp: ['content-2', 'content-8'],
    largeUp: ['content-3', 'content-11']
  }
})`
  ${listReset()};
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp()};

  > li:not(:first-child) {
    padding-top: ${variableGlsp()};
    border-top: ${multiply(themeVal('layout.border'), 2)} solid
      ${themeVal('color.secondary-500')};
  }
`;

export function AgendaEventListItem(props) {
  return (
    <li>
      <AgendaEvent {...props} />
    </li>
  );
}
