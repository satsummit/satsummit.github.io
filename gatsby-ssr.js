const React = require('react');
const { DevseedUiThemeProvider } = require('@devseed-ui/theme-provider');

const themeOverrides = require('$styles/theme').default;
const { MediaQueryProvider } = require('$utils/use-media-query');

exports.wrapPageElement = ({ element }) => {
  return (
    <DevseedUiThemeProvider theme={themeOverrides}>
      <MediaQueryProvider>{element}</MediaQueryProvider>
    </DevseedUiThemeProvider>
  );
};
