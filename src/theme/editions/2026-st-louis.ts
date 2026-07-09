import { defineEditionTheme } from '../edition-theme';
import { createColorPalette } from '../color-palette';
import { pageHeroRecipe } from '$components/page-hero.recipe';

import satelliteArch from './satsummit-stlouis-2026--arch-sat-motif.png';
const heroBg = `url('${satelliteArch}') right top / auto 16rem no-repeat {colors.primary.500}`;

// Theme override for St Louis '26.
export default defineEditionTheme({
  theme: {
    tokens: {
      colors: {
        basi: createColorPalette('#0D1658'),
        primary: createColorPalette('#4CA6FF'),
        secondary: createColorPalette('#f2a900')
      },
      // Science Gothic (variable font) as the edition's heading typeface.
      // Must be registered with gatsby-plugin-webfonts in gatsby-config.mjs.
      fonts: {
        heading: { value: 'Science Gothic, sans-serif' }
      },
      // fontSizes: {
      //   xs: { value: '0.5rem' },
      //   sm: { value: '0.875rem' },
      //   md: { value: '1rem' },
      //   lg: { value: '1.25rem' },
      //   xl: { value: '1.5rem' },
      //   '2xl': { value: '1.75rem' },
      //   '3xl': { value: '2rem' },
      //   '4xl': { value: '2.25rem' },
      //   '5xl': { value: '2.5rem' },
      //   '6xl': { value: '2.75rem' },
      //   '7xl': { value: '3rem' },
      //   '8xl': { value: '3.35rem' },
      //   '9xl': { value: '3.5rem' },
      //   '10xl': { value: '3.75rem' }
      // }
    },
    textStyles: {
      menuLink: {
        value: {
          fontSize: '0.875rem'
        }
      }
    },
    // Shrink the edition-name marker label in the header for this edition.
    recipes: {
      itemMarker: {
        base: { fontSize: '0.75rem' }
      },
      button: {
        variants: {
          size: {
            md: {
              fontSize: '0.875rem'
            },
            lg: {
              fontSize: '1rem'
            }
          }
        }
      },
      heading: {
        variants: {
          size: {
            md: {
              fontSize: 'md'
    slotRecipes: {
      pageHero: {
        slots: pageHeroRecipe.slots,
        base: {
          root: {
            _after: {
              background: heroBg,
              backgroundBlendMode: 'multiply'
            }
          }
        }
      }
    }
  }
});
