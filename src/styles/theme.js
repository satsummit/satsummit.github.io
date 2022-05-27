import { createUITheme } from '@devseed-ui/theme-provider';
import { createGlobalStyle } from 'styled-components';

export default function themeOverrides() {
  return createUITheme({
    color: {
      // blue
      base: '#2037E9',
      // link-green
      primary: '#19E9D4',
      // grey
      secondary: '#888990',
      // Alizarin (Red-ish)
      danger: '#e74c3c',
      // Nephritis (Green)
      success: '#27ae60',
      // Orange
      warning: '#f39c12',
      // Belize Hole (Blue)
      info: '#2980b9'
    }
  });
}

export const GlobalStyles = createGlobalStyle`
`;
