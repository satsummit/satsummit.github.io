import styled from 'styled-components';

import { themeVal } from '@devseed-ui/theme-provider';

export const PersonAvatar = styled.figure`
  position: relative;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to top,
    ${themeVal('color.primary-500')} 0%,
    ${themeVal('color.secondary-500')}64 100%
  );
  border-top: 8px solid ${themeVal('color.secondary-500')};

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    /* stylelint-disable-next-line */
    mix-blend-screen: luminosity;
    mix-blend-mode: screen;
    filter: grayscale(100%) contrast(108%);
  }

  &::after {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      to top,
      ${themeVal('color.primary-500')} 0%,
      ${themeVal('color.primary-500')}00 100%
    );
    content: '';
    opacity: 0.16;
  }
`;
