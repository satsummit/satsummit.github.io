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
  styles: {
    global: {
      body: {
        fontSize: ['1rem', null, null, '1.25rem'],
        lineHeight: 'calc(0.5rem + 1em)',
        color: 'base.500'
      }
    }
  },
  textStyles: {
    lead: {
      sm: {
        fontSize: '1.25rem'
      },
      lg: {
        fontSize: '1.5rem'
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
          fontSize: ['0.75rem', null, null, '1rem'],
          lineHeight: 'calc(0.5rem + 1em)'
        },
        sm: {
          fontSize: ['1rem', null, null, '1.25rem'],
          lineHeight: 'calc(0.5rem + 1em)'
        },
        md: {
          fontSize: ['1.25rem', null, null, '1.5rem'],
          lineHeight: 'calc(0.5rem + 1em)'
        },
        lg: {
          fontSize: ['1.5rem', null, null, '1.75rem'],
          lineHeight: 'calc(0.5rem + 1em)'
        },
        xl: {
          fontSize: ['1.75rem', null, null, '2rem'],
          lineHeight: 'calc(0.5rem + 1em)'
        },
        '2xlg': {
          fontSize: ['2rem', null, null, '2.25rem'],
          lineHeight: 'calc(0.5rem + 1em)'
        },
        '3xlg': {
          fontSize: ['2.25rem', null, null, '2.5rem'],
          lineHeight: 'calc(0.5rem + 1em)'
        },
        '4xl': {
          fontSize: ['2.5rem', null, null, '2.75rem'],
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
