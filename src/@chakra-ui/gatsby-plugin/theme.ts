import { extendTheme } from '@chakra-ui/react';
import { createColorPalette } from './color-palette';

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
        fontSize: 'md'
      },
      lg: {
        fontSize: 'lg'
      }
    }
  },
  components: {
    Heading: {
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
    },
    Button: {
      baseStyle: {
        textTransform: 'uppercase',
        borderRadius: 'sm',
        fontFamily: 'Barlow Condensed, serif'
      }
    }
  }
};

export default extendTheme(theme);
