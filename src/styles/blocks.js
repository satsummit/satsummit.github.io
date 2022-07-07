import styled from 'styled-components';

import { VarProse } from './variable-components';
import { variableGlsp } from './variable-utils';

import { media } from '@devseed-ui/theme-provider';

import Hug from './hug';

export const TextBlock = styled(Hug).attrs({
  as: 'div'
})`
  padding: ${variableGlsp(2, 0)};

  ${VarProse} {
    grid-column: content-start / content-end;

    ${media.largeUp`
      grid-column: content-start / content-8;
    `}
  }
`;
