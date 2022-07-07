import styled from 'styled-components';

import { VarProse } from './variable-components';
import { variableGlsp } from './variable-utils';

import { media } from '@devseed-ui/theme-provider';

import Hug from './hug';

export const BlockAlpha = styled(Hug).attrs({
  as: 'div'
})`
  padding: ${variableGlsp(2, 0)};

  ${VarProse} {
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-2 / content-8;
    `}

    ${media.largeUp`
      grid-column: content-2 / content-12;
    `}

    ${media.xlargeUp`
      grid-column: content-3 / content-11;
    `}
  }
`;
