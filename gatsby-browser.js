exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  const currentPosition = getSavedScrollPosition(location);
  setTimeout(() => window.scrollTo(...(currentPosition || [0, 0])), 1);
  return false;
};
