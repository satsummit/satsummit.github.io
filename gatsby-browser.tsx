export { wrapPageElement } from './src/theme/app-provider';

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}: {
  routerProps: { location: Location };
  getSavedScrollPosition: (location: Location) => [number, number] | null;
}) => {
  if (location.hash) {
    return location.hash;
  }
  const currentPosition = getSavedScrollPosition(location);
  setTimeout(() => window.scrollTo(...(currentPosition || [0, 0])), 1);
  return false;
};
