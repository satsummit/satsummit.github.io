import { useMediaQuery, useTheme } from '@chakra-ui/react';

export function useMediaQueries(): Record<string, boolean> {
  const theme = useTheme();
  const breakpoints = theme.__breakpoints;

  // window.matchMedia does not work with @media
  const clean = (str: string) => str.replace('@media', 'only');

  const queries = (breakpoints?.details ?? []).flatMap(
    ({ maxWQuery, minMaxQuery, minWQuery }) => [
      clean(minWQuery),
      clean(minMaxQuery),
      clean(maxWQuery)
    ]
  );

  const results = useMediaQuery(queries);

  return results.reduce((acc, isActive, i) => {
    const bk = breakpoints?.details[Math.floor(i / 3)].breakpoint;
    const name = ['Up', 'Only', 'Down'][i % 3];

    // The last item is true since it is the largest down which is always true.
    const isLast = i === results.length - 1;
    return { ...acc, [`${bk}${name}`]: isLast || isActive };
  }, {});
}
