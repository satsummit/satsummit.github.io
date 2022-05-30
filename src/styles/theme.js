import { createUITheme, media, themeVal } from '@devseed-ui/theme-provider';
import { createGlobalStyle } from 'styled-components';

export default function themeOverrides() {
  return createUITheme({
    color: {
      // blue
      base: '#2037E9',
      // link-green
      primary: '#19E9D4',
      // grey
      secondary: '#888990',
      // Alizarin (Red-ish)
      danger: '#e74c3c',
      // Nephritis (Green)
      success: '#27ae60',
      // Orange
      warning: '#f39c12',
      // Belize Hole (Blue)
      info: '#2980b9'
    },
    type: {
      base: {
        weight: '400',
        leadSize: '1.25rem',
        // Increments to the type.base.size for each media breakpoint.
        sizeIncrement: {
          small: '0rem',
          medium: '0rem',
          large: '0.25rem',
          xlarge: '0.25rem'
        }
      },
      heading: {
        family: 'Barlow Condensed',
        weight: '500'
      }
    },
    layout: {
      min: '384px',
      max: '1440px',
      glspMultiplier: {
        xsmall: 1,
        small: 1,
        medium: 1.5,
        large: 2,
        xlarge: 2
      }
    }
  });
}

export const GlobalStyles = createGlobalStyle`
  :root {
    --base-space-multiplier: ${themeVal('layout.glspMultiplier.xsmall')};
  }

  ${media.smallUp`
    :root {
      --base-text-increment: ${themeVal('type.base.sizeIncrement.small')};
      --base-space-multiplier: ${themeVal('layout.glspMultiplier.small')};
    }
  `}

  ${media.mediumUp`
    :root {
      --base-text-increment: ${themeVal('type.base.sizeIncrement.medium')};
      --base-space-multiplier: ${themeVal('layout.glspMultiplier.medium')};
    }
  `}

  ${media.largeUp`
    :root {
      --base-text-increment: ${themeVal('type.base.sizeIncrement.large')};
      --base-space-multiplier: ${themeVal('layout.glspMultiplier.large')};
    }
  `}

  ${media.xlargeUp`
    :root {
      --base-text-increment: ${themeVal('type.base.sizeIncrement.xlarge')};
      --base-space-multiplier: ${themeVal('layout.glspMultiplier.xlarge')};
    }
  `}
`;
