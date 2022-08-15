import { css, keyframes } from 'styled-components';

import { glsp, themeVal } from '@devseed-ui/theme-provider';

const underliner = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
`;

const MenuLinkAppearance = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${glsp(0.25)};
  font-family: ${themeVal('button.type.family')};
  font-weight: ${themeVal('button.type.weight')};
  text-transform: ${themeVal('button.type.case')};
  text-decoration: none;
  height: 2rem;
  transition: opacity 0.24s ease;
  color: ${themeVal('color.primary')};

  &:visited {
    color: inherit;
  }

  &:hover {
    opacity: 0.64;
  }

  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    content: '';
    width: 0;
    height: 2px;
    background: ${themeVal('color.secondary-500')};
    transform: translate(-50%, 0);
  }

  &.active::after {
    transform: translate(-50%, 0);
    animation: ${underliner} ease-in 0.24s 0s forwards;
  }
`;

export default MenuLinkAppearance;
