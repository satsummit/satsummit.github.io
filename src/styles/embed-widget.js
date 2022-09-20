import styled from 'styled-components';
import { themeVal } from '@devseed-ui/theme-provider';

import { variableGlsp } from '$styles/variable-utils';

export const EmbedWidget = styled.div`
  margin-top: ${variableGlsp(0.75)};
  border: ${themeVal('layout.border')} solid ${themeVal('color.base-100')};
  border-radius: ${themeVal('shape.rounded')};
  padding: ${variableGlsp()};
`;
