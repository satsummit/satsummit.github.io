import { extendTheme, mergeThemeOverride } from '@chakra-ui/react';
import { extendHugConfig } from '@devseed-ui/hug-chakra';
import { withProse } from '@nikolovlazar/chakra-ui-prose';

import { createColorPalette } from './color-palette';

const headingStyles = {
  baseStyle: {
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  sizes: {
    xs: {
      fontSize: ['xs', null, null, 'sm'],
      lineHeight: 'calc(0.5rem + 1em)'
    },
    sm: {
      fontSize: ['sm', null, null, 'md'],
      lineHeight: 'calc(0.5rem + 1em)'
    },
    md: {
      fontSize: ['md', null, null, 'lg'],
      lineHeight: 'calc(0.5rem + 1em)'
    },
    lg: {
      fontSize: ['lg', null, null, 'xl'],
      lineHeight: 'calc(0.5rem + 1em)'
    },
    xl: {
      fontSize: ['xl', null, null, '2xl'],
      lineHeight: 'calc(0.5rem + 1em)'
    },
    '2xl': {
      fontSize: ['2xl', null, null, '3xl'],
      lineHeight: 'calc(0.5rem + 1em)'
    },
    '3xl': {
      fontSize: ['3xl', null, null, '4xl'],
      lineHeight: 'calc(0.5rem + 1em)'
    },
    '4xl': {
      fontSize: ['4xl', null, null, '5xl'],
      lineHeight: 'calc(0.5rem + 1em)'
    }
  }
};

const theme = {
  colors: {
    primary: createColorPalette('#1a5bdb'),
    secondary: createColorPalette('#46d6cd'),
    base: createColorPalette('#0d1658'),
    danger: createColorPalette('#ff5353'),
    warning: createColorPalette('#ffc849'),
    success: createColorPalette('#46d6cd'),
    info: createColorPalette('#1a5bdb'),
    surface: createColorPalette('#fff')
  },
  fonts: {
    body: 'Barlow, sans-serif',
    heading: 'Barlow Condensed, serif'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '1.75rem',
    '2xl': '2rem',
    '3xl': '2.25rem',
    '4xl': '2.5rem',
    '5xl': '2.75rem',
    '6xl': '3rem',
    '7xl': '3.25rem',
    '8xl': '3.5rem',
    '9xl': '3.75rem',
    '10xl': '4rem'
  },
  styles: {
    global: {
      html: {
        '&': {
          scrollBehavior: 'smooth'
        }
      },
      body: {
        fontSize: ['sm', null, null, 'md'],
        color: 'base.500'
      },
      '*': {
        lineHeight: 'calc(0.5rem + 1em)'
      }
    }
  },
  textStyles: {
    lead: {
      sm: {
        fontSize: 'sm'
      },
      md: {
        fontSize: 'md'
      },
      lg: {
        fontSize: 'lg'
      }
    }
  },
  components: {
    Divider: {
      baseStyle: {
        opacity: 1,
        borderRadius: '2px'
      },
      sizes: {
        xs: {
          borderWidth: '2px'
        },
        sm: {
          borderWidth: '4px'
        },
        md: {
          borderWidth: '8px'
        }
      }
    },
    Heading: headingStyles,
    Link: {
      baseStyle: {
        color: 'primary.500'
      }
    },
    Button: {
      baseStyle: {
        textTransform: 'uppercase',
        borderRadius: 'sm',
        fontFamily: 'Barlow Condensed, serif'
      },
      sizes: {
        xs: {
          fontSize: 'xs'
        },
        sm: {
          fontSize: 'xs'
        },
        md: {
          fontSize: 'sm'
        },
        lg: {
          fontSize: 'sm'
        }
      },
      variants: {
        outline: {
          border: '2px solid',
          '.chakra-button__group[data-attached][data-orientation=horizontal] > &:not(:last-of-type)':
            { marginEnd: '-2px' },
          '.chakra-button__group[data-attached][data-orientation=vertical] > &:not(:last-of-type)':
            { marginBottom: '-2px' }
        },
        // @ts-expect-error no type for props
        'soft-outline': (props) => {
          const { colorScheme: c } = props;
          return {
            border: '2px solid',
            borderColor: `${c}.200a`,
            '.chakra-button__group[data-attached][data-orientation=horizontal] > &:not(:last-of-type)':
              { marginEnd: '-2px' },
            '.chakra-button__group[data-attached][data-orientation=vertical] > &:not(:last-of-type)':
              { marginBottom: '-2px' },
            _hover: {
              bg: `${c}.50a`
            },
            _active: {
              bg: `${c}.100a`
            }
          };
        }
      }
    }
  },
  config: {
    ...extendHugConfig({
      layoutMax: 'container.xl'
    })
  }
};

const proseThemeOverrides: (
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  theme: Record<string, any>
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
) => Record<string, any> = (chakraTheme) => {
  // Override Prose theme.
  const proseTheme = withProse({
    baseStyle: {
      ':first-child': {
        mt: 0
      },
      a: {
        color: 'primary.500',
        fontWeight: 'inherit'
      },
      'h1, h2, h3, h4, h5, h6': {
        ...headingStyles.baseStyle,
        fontFamily: 'heading'
      },
      h1: {
        ...headingStyles.sizes['3xl']
      },
      h2: {
        ...headingStyles.sizes['2xl']
      },
      h3: {
        ...headingStyles.sizes.xl
      },
      h4: {
        ...headingStyles.sizes.lg
      },
      h5: {
        ...headingStyles.sizes.md,
        mt: { base: 6, md: 8 },
        mb: 2
      },
      h6: {
        ...headingStyles.sizes.sm,
        mt: { base: 6, md: 8 },
        mb: 2
      },
      'h5 + *, h6 + *': {
        mt: 0
      },
      p: {
        fontSize: 'inherit',
        lineHeight: 'inherit'
      }
    }
  })(chakraTheme);

  // Get the style of the Prose component after the override. We need this because
  // the chakra-ui-prose package does not export the base theme.
  // https://github.com/nikolovlazar/chakra-ui-prose/blob/main/packages/chakra-ui-prose/src/theme.ts
  // @ts-expect-error This is possible to do but it is hackish.
  const proseStyles = proseTheme.components.Prose.baseStyle();

  // We want to apply the style to all elements in the mdx file, except if
  // they're inside a custom component.
  const proseFinalTheme = {
    baseStyle: {
      ':not(.not-mdx, .not-mdx *)': {
        ...Object.entries(proseStyles).reduce(
          (acc, [k, v]) => ({
            ...acc,
            [`> :is(${k})`]: v
          }),
          {}
        )
      }
    }
  };

  return mergeThemeOverride(chakraTheme, {
    components: {
      Prose: proseFinalTheme
    }
  });
};

export default extendTheme(theme, proseThemeOverrides);
