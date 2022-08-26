import styled from 'styled-components';

import { media, multiply, themeVal } from '@devseed-ui/theme-provider';

import { VarHeading, VarLead } from './variable-components';
import { variableGlsp } from './variable-utils';

import Hug from './hug';

export const PageMainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const PageMainHero = styled(Hug).attrs({
  as: 'div'
})`
  /* styled-component */
`;

export const PageMainHeroHeadline = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp()};
  grid-column: content-start / content-end;
  padding: ${variableGlsp(2, 0)};
  border-bottom: ${multiply(themeVal('layout.border'), 4)} solid
    ${themeVal('color.secondary-500')};

  ${media.mediumUp`
    grid-column: content-start / content-8;
  `}

  ${media.largeUp`
    grid-column: content-start / content-12;
  `}

  ${media.xlargeUp`
    grid-column: content-start / content-11;
  `}
`;

export const PageMainTitle = styled(VarHeading).attrs({
  as: 'h1',
  size: 'jumbo'
})`
  /* styled-component */
`;

export const PageMainSubtitle = styled(VarHeading).attrs({
  as: 'p',
  size: 'small'
})`
  /* styled-component */
`;

export const PageLead = styled(VarLead)`
  color: inherit;
`;
