import styled from 'styled-components';

import { VarHeading, VarLead } from './variable-components';
import { variableGlsp } from './variable-utils';

import { media, themeVal } from '@devseed-ui/theme-provider';

import Hug from './hug';

export const PageMainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const PageMainHero = styled(Hug).attrs({
  as: 'div'
})`
  border-bottom: 8px solid ${themeVal('color.secondary-500')};
  padding: ${variableGlsp(2, 0)};
`;

export const PageMainHeroHeadline = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp()};
  grid-column: content-start / content-end;

  ${media.largeUp`
    grid-column: content-start / content-8;
  `}
`;

export const PageMainTitle = styled(VarHeading).attrs({
  as: 'h1',
  size: 'jumbo'
})`
  /* styled-component */
`;

export const PageLead = styled(VarLead)`
  color: inherit;
`;
