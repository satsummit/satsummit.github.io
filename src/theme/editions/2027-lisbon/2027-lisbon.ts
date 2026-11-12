import { defaultConfig } from '@chakra-ui/react';

import { defineEditionTheme } from '../../edition-theme';
import { createColorAlias, createColorPalette } from '../../color-palette';
import { pageHeroRecipe } from '$components/page-hero.recipe';

import globe from './header_globle_bg.png';
import logo from './icon_satsummit_logo.png';
import dodecahedron from './shape_dodecahedron.png';
import torus from './shape_torus.png';
import star from './shape_star.png';
import pentagon from './shape_pentagon.png';
import iconSpeaker from './icon_speaker.png';
import iconAgenda from './icon_agenda.png';
import { BRAND_PRIMARY } from '../..';

// Fade layer sits over the globe so its grid blends into the page.
const globeBg = [
  'linear-gradient(transparent, white) center bottom / 100% 6rem no-repeat',
  `url('${globe}') center bottom / 100% auto no-repeat`
].join(', ');
const shapesBg = [
  `url('${dodecahedron}') left 18% bottom 0.75rem / 11rem auto no-repeat`,
  `url('${torus}') left 84% bottom 2.5rem / 10rem auto no-repeat`
].join(', ');
// Speakers and agenda pages use a different pair of shapes.
const hubShapesBg = [
  `url('${star}') left 7% top 10rem / 11rem auto no-repeat`,
  `url('${pentagon}') left 97% top 9rem / 16rem auto no-repeat`
].join(', ');

// Page icon to the left of the title, replacing the logo badge.
const titleIcon = (
  url: string,
  ratio: string,
  pos: { top: string; left: string; width: string }
) => ({
  ...pos,
  aspectRatio: ratio,
  background: `url('${url}') center / contain no-repeat`
});

// Theme override for Lisbon '27.
export default defineEditionTheme({
  theme: {
    tokens: {
      colors: {
        basi: createColorPalette('#2a2118'),
        primary: createColorPalette('#ffcb21'),
        secondary: createColorPalette('#fd7400'),
        warning: createColorPalette('#fd7400')
      }
    },
    semanticTokens: {
      colors: {
        link: { value: BRAND_PRIMARY },
        'action-button': createColorAlias('basi'),
        nav: {
          ...createColorAlias('basi'),
          fg: { value: '{colors.basi.900}' }
        },
        'segmented-button': createColorAlias('basi')
      }
    },
    recipes: {
      button: {
        variants: {
          variant: {
            // Header ticket button: filled, like Chakra's `solid` variant.
            // `_active` replaces the base soft-outline pressed tint.
            'nav-action': {
              ...defaultConfig.theme?.recipes?.button?.variants?.variant?.solid,
              _active: { bg: 'colorPalette.solid/90' }
            },
            // Agenda day switcher: white with dark stroke, selected day
            // (`data-active`) filled dark.
            segmented: {
              bg: 'colorPalette.contrast',
              color: 'colorPalette.900',
              borderColor: 'colorPalette.900',
              _hover: { bg: 'colorPalette.50' },
              _active: {
                bg: 'colorPalette.900',
                color: 'colorPalette.contrast'
              }
            }
          }
        }
      }
    },
    slotRecipes: {
      pageHero: {
        slots: pageHeroRecipe.slots,
        base: {
          root: {
            _after: {
              display: 'block',
              background: { base: globeBg, lg: `${shapesBg}, ${globeBg}` }
            },
            '.page-speakers &, .page-agenda &': {
              _after: {
                background: { base: globeBg, lg: `${hubShapesBg}, ${globeBg}` }
              }
            }
          },
          content: {
            color: 'basi.900',
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center !important',
            pt: '8',
            pb: { base: '16', lg: '24' },
            '& > div': { alignItems: 'center' },
            // Edition / parent breadcrumb
            '& div:has(+ h1)': {
              justifyContent: 'center',
              '& a': { fontSize: { base: 'xl', lg: '2xl' } }
            },
            '& h1': {
              position: 'relative',
              display: 'inline-block',
              isolation: 'isolate',
              fontSize: { base: '3.5rem', md: '5rem', lg: '8rem' },
              lineHeight: '1',
              // Orange highlight bar behind the lower part of the title.
              _before: {
                content: '""',
                position: 'absolute',
                zIndex: -1,
                left: '0.4em',
                right: '0.35em',
                bottom: '0.06em',
                height: '0.28em',
                bg: 'secondary.500'
              },
              // Logo badge overlapping the title's top-left corner.
              _after: {
                content: '""',
                position: 'absolute',
                top: '-0.80em',
                left: '-0.2em',
                width: '8rem',
                aspectRatio: '284 / 190',
                background: `url('${logo}') center / contain no-repeat`
              }
            },
            '.page-speakers &': {
              '& h1': {
                _before: { left: '-0.08em', right: '-0.11em' },
                _after: titleIcon(iconSpeaker, '214 / 238', {
                  top: '-0.04em',
                  left: '-1.2em',
                  width: '6rem'
                })
              }
            },
            '.page-agenda &': {
              '& h1': {
                _before: { left: '0', right: '-0.15em' },
                _after: titleIcon(iconAgenda, '222 / 228', {
                  top: '-0.5em',
                  left: '-1.5em',
                  width: '4rem'
                })
              }
            }
          }
        }
      }
    }
  }
});
