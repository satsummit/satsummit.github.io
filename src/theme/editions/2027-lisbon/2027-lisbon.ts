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

const globeBg = `url('${globe}') center bottom / clamp(1100px, 100%, 1440px) auto no-repeat`;
const shapesBg = [
  `url('${dodecahedron}') left 18% bottom 0.75rem / 11rem auto no-repeat`,
  `url('${torus}') left 84% bottom 2.5rem / 10rem auto no-repeat`
].join(', ');
const shapesBgMobile = [
  `url('${dodecahedron}')  left 6% bottom -1rem / 7rem auto no-repeat`,
  `url('${torus}') right -4rem top 3rem / 9rem auto no-repeat`
].join(', ');
// Speakers and agenda pages use a different pair of shapes.
const hubShapesBg = [
  `url('${star}') left 7% top 10rem / 11rem auto no-repeat`,
  `url('${pentagon}') left 97% top 9rem / 16rem auto no-repeat`
].join(', ');
const hubShapesBgMobile = [
  `url('${star}') left 6% bottom -1rem / 7rem auto no-repeat`,
  `url('${pentagon}') right -4rem top 3rem / 9rem auto no-repeat`
].join(', ');

// Page icon to the left of the title, replacing the logo badge.
const titleIcon = (
  url: string,
  pos: { top: string; left: string; width: string }
) => ({
  ...pos,
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
        'segmented-button': {
          ...createColorAlias('basi'),
          fg: { value: '{colors.basi.900}' }
        }
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
                color: 'colorPalette.contrast',
                _hover: { bg: 'colorPalette.500' }
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
            _before: {
              content: '""',
              position: 'absolute',
              inset: 0,
              zIndex: 19,
              pointerEvents: 'none',
              display: 'block',
              background:
                'linear-gradient(transparent, white) center bottom / 100% 3rem no-repeat'
            },
            _after: {
              display: 'block',
              background: {
                base: `${shapesBgMobile}, ${globeBg}`,
                lg: `${shapesBg}, ${globeBg}`
              },
              width: '100%',
              maxW: '1440px',
              left: '50%',
              transform: 'translateX(-50%)'
            },
            '.page-speakers &, .page-agenda &': {
              _after: {
                background: {
                  base: `${hubShapesBgMobile}, ${globeBg}`,
                  lg: `${hubShapesBg}, ${globeBg}`
                }
              }
            }
          },
          content: {
            color: 'basi.900',
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center !important',
            pt: 16,
            pb: { base: 24, lg: '24' },
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
                aspectRatio: 1,
                background: `url('${logo}') center / contain no-repeat`,
                base: {
                  top: '-5rem',
                  left: '-2rem',
                  width: '5rem'
                },
                lg: {
                  top: '-8.25rem',
                  left: '-2.5rem',
                  width: '9.5rem'
                }
              }
            },
            '.page-speakers &': {
              '& h1': {
                _before: { left: '-0.08em', right: '-0.11em' },
                _after: {
                  base: titleIcon(iconSpeaker, {
                    top: '-5rem',
                    left: '-1.5em',
                    width: '5rem'
                  }),
                  lg: titleIcon(iconSpeaker, {
                    top: '-0.6em',
                    left: '-1.2em',
                    width: '6rem'
                  })
                }
              }
            },
            '.page-agenda &': {
              '& h1': {
                _before: { left: '0', right: '-0.15em' },
                _after: {
                  base: titleIcon(iconAgenda, {
                    top: '-5rem',
                    left: '-1.5em',
                    width: '5rem'
                  }),
                  lg: titleIcon(iconAgenda, {
                    top: '-0.6em',
                    left: '-1.2em',
                    width: '6rem'
                  })
                }
              }
            }
          }
        }
      }
    }
  }
});
