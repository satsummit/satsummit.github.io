export const shouldUpdateScroll = ({
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
