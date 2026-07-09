import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe
} from '@chakra-ui/react';
import { hugConfig } from '@devseed-ui/hug-chakra';

import { createColorPalette, createColorSemanticTokens } from './color-palette';
import { pageHeroRecipe } from '$components/page-hero.recipe';

export const MENU_BRKPOINT = 'lg';

// Base brand primary (hex). Single source of truth for the palette seed below,
// and usable outside the Chakra system — e.g. in Gatsby `Head`, which renders
// without providers and so cannot read theme tokens.
export const BRAND_PRIMARY = '#1a5bdb';

const lineHeight = 'calc(0.5rem + 1em)';

const headingRecipe = defineRecipe({
  base: {
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  variants: {
    size: {
      xs: {
        fontSize: { base: 'xs', lg: 'sm' },
        lineHeight
      },
      sm: {
        fontSize: { base: 'sm', lg: 'md' },
        lineHeight
      },
      md: {
        fontSize: { base: 'md', lg: 'lg' },
        lineHeight
      },
      lg: {
        fontSize: { base: 'lg', lg: 'xl' },
        lineHeight
      },
      xl: {
        fontSize: { base: 'xl', lg: '2xl' },
        lineHeight
      },
      '2xl': {
        fontSize: { base: '2xl', lg: '3xl' },
        lineHeight
      },
      '3xl': {
        fontSize: { base: '3xl', lg: '4xl' },
        lineHeight
      },
      '4xl': {
        fontSize: { base: '4xl', lg: '5xl' },
        lineHeight,
        letterSpacing: '0'
      }
    }
  }
});

const buttonRecipe = defineRecipe({
  base: {
    textTransform: 'uppercase',
    borderRadius: 'xs',
    fontFamily: 'heading',
    fontWeight: '600'
  },
  variants: {
    size: {
      xs: { fontSize: 'xs' },
      sm: { fontSize: 'xs' },
      md: { fontSize: 'sm' },
      lg: { fontSize: 'sm' }
    },
    variant: {
      outline: {
        borderWidth: '2px',
        borderStyle: 'solid'
      },
      'soft-outline': {
        borderWidth: '2px',
        borderColor: 'colorPalette.200a',
        _hover: { bg: 'colorPalette.50a' },
        _active: { bg: 'colorPalette.100a' }
      }
    }
  }
});

const linkRecipe = defineRecipe({
  base: {
    color: '{colors.primary.500}'
  }
});

const badgeRecipe = defineRecipe({
  variants: {
    size: {
      sm: { fontSize: '0.875rem', px: 2, py: 1 }
    },
    variant: {
      'satsummit-dark': {
        fontFamily: 'heading',
        fontWeight: '600',
        textTransform: 'uppercase',
        borderRadius: 'xs',
        bg: '{colors.basi.400a}',
        color: 'white'
      }
    }
  }
});

const separatorRecipe = defineRecipe({
  base: {
    opacity: 1,
    borderRadius: '2px'
  },
  variants: {
    size: {
      xs: { '--separator-thickness': '2px' },
      sm: { '--separator-thickness': '4px' },
      md: { '--separator-thickness': '8px' }
    }
  }
});

const itemMarkerRecipe = defineRecipe({
  className: 'item-marker',
  base: {
    bg: 'basi.500',
    color: 'white',
    p: '2',
    // Text size for the marker label. The inner element inherits this, so
    // editions can restyle it by overriding `recipes.itemMarker`.
    fontSize: '1rem',
    _after: {
      position: 'absolute',
      content: '""',
      width: '1rem',
      height: '0.75rem',
      background: 'basi.500',
      top: '100%',
      left: '0',
      right: 'auto',
      bottom: 'auto',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
    }
  }
});

export const baseConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: createColorPalette(BRAND_PRIMARY),
        secondary: createColorPalette('#46d6cd'),
        basi: createColorPalette('#0d1658'),
        danger: createColorPalette('#ff5353'),
        warning: createColorPalette('#ffc849'),
        success: createColorPalette('#46d6cd'),
        info: createColorPalette('#1a5bdb'),
        surface: createColorPalette('#fff')
      },
      fonts: {
        body: { value: 'Barlow, sans-serif' },
        heading: { value: 'Barlow Condensed, serif' }
      },
      fontSizes: {
        xs: { value: '0.75rem' },
        sm: { value: '1rem' },
        md: { value: '1.25rem' },
        lg: { value: '1.5rem' },
        xl: { value: '1.75rem' },
        '2xl': { value: '2rem' },
        '3xl': { value: '2.25rem' },
        '4xl': { value: '2.5rem' },
        '5xl': { value: '2.75rem' },
        '6xl': { value: '3rem' },
        '7xl': { value: '3.25rem' },
        '8xl': { value: '3.5rem' },
        '9xl': { value: '3.75rem' },
        '10xl': { value: '4rem' }
      }
    },
    semanticTokens: {
      colors: {
        fg: {
          DEFAULT: {
            value: '{colors.basi.500}'
          }
        },
        ...createColorSemanticTokens('primary'),
        ...createColorSemanticTokens('secondary'),
        ...createColorSemanticTokens('basi'),
        ...createColorSemanticTokens('danger'),
        ...createColorSemanticTokens('warning'),
        ...createColorSemanticTokens('success'),
        ...createColorSemanticTokens('info'),
        surface: {
          contrast: {
            value: '{colors.basi.500}'
          },
          solid: { value: '{colors.surface.500}' },
          muted: { value: '{colors.surface.200a}' },
          fg: { value: '{colors.surface.500}' },
          subtle: { value: '{colors.surface.300a}' }
        }
      }
    },
    textStyles: {
      menuLink: {
        value: {
          fontFamily: 'heading',
          fontWeight: '600',
          fontSize: 'sm',
          textTransform: 'uppercase',
          transition: 'opacity 0.24s ease 0s',
          color: 'currentColor',
          _hover: {
            opacity: '0.64',
            textDecoration: 'none'
          }
        }
      }
    },
    recipes: {
      heading: headingRecipe,
      button: buttonRecipe,
      link: linkRecipe,
      badge: badgeRecipe,
      separator: separatorRecipe,
      itemMarker: itemMarkerRecipe,
      hug: {
        base: {
          maxW: '7xl',
          gap: {
            lg: 8
          }
        }
      }
    },
    slotRecipes: {
      pageHero: pageHeroRecipe
    }
  },
  globalCss: {
    html: { scrollBehavior: 'smooth' },
    body: {
      fontSize: { base: 'sm', lg: 'md' },
      color: '{colors.basi.500}'
    },
    '*': { lineHeight }
  }
});

export const system = createSystem(defaultConfig, hugConfig, baseConfig);
