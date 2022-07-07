import styled from 'styled-components';

import { VarHeading } from './variable-components';
import { variableGlsp } from './variable-utils';

import { themeVal } from '@devseed-ui/theme-provider';

import Hug from './hug';

export const PageMainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const PageMainHero = styled(Hug).attrs({
  as: 'div'
})`
  /* border-top: 8px solid ${themeVal('color.secondary-500')}; */
  padding: ${variableGlsp(2, 0)};
`;

export const PageMainTitle = styled(VarHeading).attrs({
  as: 'h1',
  size: 'xxlarge'
})`
  grid-column: content-start / content-end;
`;
