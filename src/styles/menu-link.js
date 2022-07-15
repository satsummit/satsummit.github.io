import { css } from 'styled-components';

import { glsp, themeVal } from '@devseed-ui/theme-provider';

const MenuLinkAppearance = css`
  display: flex;
  align-items: center;
  gap: ${glsp(0.25)};
  font-family: ${themeVal('button.type.family')};
  font-weight: ${themeVal('button.type.weight')};
  text-transform: ${themeVal('button.type.case')};
  color: inherit;
  text-decoration: none;
  transition: opacity 0.24s ease;

  &:hover {
    opacity: 0.64;
  }
`;

export default MenuLinkAppearance;
