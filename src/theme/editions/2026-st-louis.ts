import { defineEditionTheme } from '../edition-theme';
import { createColorPalette } from '../color-palette';

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
      }
    }
  }
});
