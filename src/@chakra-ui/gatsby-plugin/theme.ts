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
        xxs: {
          fontSize: '1rem',
          lineHeight: '1.5rem'
        },
        xs: {
          fontSize: '1.25rem',
          lineHeight: '1.75rem'
        },
        sm: {
          fontSize: '1.5rem',
          lineHeight: '2rem'
        },
        md: {
          fontSize: '1.75rem',
          lineHeight: '2.25rem'
        },
        lg: {
          fontSize: '2rem',
          lineHeight: '2.5rem'
        },
        xl: {
          fontSize: '2.25rem',
          lineHeight: '2.75rem'
        },
        xxl: {
          fontSize: '2.5rem',
          lineHeight: '3rem'
        },
        jumbo: {
          fontSize: '3.25rem',
          lineHeight: '3.75rem'
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
