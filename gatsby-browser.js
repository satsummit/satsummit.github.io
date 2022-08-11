const React = require('react');
const { DevseedUiThemeProvider } = require('@devseed-ui/theme-provider');

const themeOverrides = require('$styles/theme').default;
const { MediaQueryProvider } = require('$utils/use-media-query');

exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  if (location.hash) {
    return location.hash;
  }
  const currentPosition = getSavedScrollPosition(location);
  setTimeout(() => window.scrollTo(...(currentPosition || [0, 0])), 1);
  return false;
};

exports.wrapPageElement = ({ element }) => {
  return (
    <DevseedUiThemeProvider theme={themeOverrides}>
      <MediaQueryProvider>{element}</MediaQueryProvider>
    </DevseedUiThemeProvider>
  );
};
