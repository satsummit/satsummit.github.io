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
  },
  fonts: {
    body: "Barlow, sans-serif",
    heading: "Barlow, serif",
  }
};

export default extendTheme(theme);
