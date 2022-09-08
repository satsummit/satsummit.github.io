import { createUITheme, media, themeVal } from '@devseed-ui/theme-provider';
import { createGlobalStyle } from 'styled-components';

export default function themeOverrides() {
  return createUITheme({
    color: {
      // Persian Blue
      base: '#2037E9',
      // Persian Blue
      primary: '#2037E9',
      // Bright Turquoise
      secondary: '#19E9D4',
      // Alizarin (Red-ish)
      danger: '#e74c3c',
      // Dark Sprint Green
      success: '#2C6E49',
      // Orange
      warning: '#f39c12',
      // Belize Hole (Blue)
      info: '#2980b9',
      link: 'inherit'
    },
    type: {
      base: {
        family: 'Barlow',
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
        weight: '500',
        case: 'uppercase'
      }
    },
    button: {
      type: {
        family: 'Barlow Condensed',
        case: 'uppercase',
        weight: '600'
      }
    },
    shape: {
      rounded: '0.125rem'
    },
    layout: {
      min: '384px',
      max: '1440px',
      border: '2px',
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
  a:not([class]),
  a[class=""] {
    text-decoration: underline;
    text-decoration-color: ${themeVal('color.secondary-500')};
    text-decoration-thickness: 2px;
    transition: opacity 0.24s ease;

    &:visited {
      color: inherit;
    }

    &:hover {
      opacity: 0.64;
    }
  }

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
