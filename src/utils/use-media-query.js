import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import T from 'prop-types';
import { useTheme } from 'styled-components';
import useDimensions from 'react-cool-dimensions';

/**
 * Returns the current media query and a series of boolean values indicating
 * which media ranges are active.
 *
 * @returns object
 * {
 *  "current": String,
 *  "isXsmallUp": Boolean,
 *  "isXsmallOnly": Boolean,
 *  "isXsmallDown": Boolean,
 *  "isSmallUp": Boolean,
 *  "isSmallOnly": Boolean,
 *  "isSmallDown": Boolean,
 *  "isMediumUp": Boolean,
 *  "isMediumOnly": Boolean,
 *  "isMediumDown": Boolean,
 *  "isLargeUp": Boolean,
 *  "isLargeOnly": Boolean,
 *  "isLargeDown": Boolean,
 *  "isXlargeUp": Boolean,
 *  "isXlargeOnly": Boolean,
 *  "isXlargeDown": Boolean
 * }
 */
export function useMediaQuery() {
  const { currentBreakpoint, width, ranges } = useContext(MediaQueryContext);

  // To ensure a match between server and client on the rehydration process we
  // need to keep track of mount.
  // https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const rangeBooleans = useMemo(
    () =>
      ranges.reduce((acc, [rangeKey, bounds]) => {
        const upper = `${rangeKey.charAt(0).toUpperCase()}${rangeKey.slice(1)}`;
        const makeKey = (b) => `is${upper}${b}`;

        if (!width) {
          return {
            ...acc,
            [makeKey('Up')]: undefined,
            [makeKey('Only')]: undefined,
            [makeKey('Down')]: undefined
          };
        }

        let [lBound, uBound] = bounds;
        lBound = lBound ?? -Infinity;
        uBound = uBound ?? Infinity;

        return {
          ...acc,
          [makeKey('Up')]: width >= lBound,
          [makeKey('Only')]: width >= lBound && width <= uBound,
          [makeKey('Down')]: width <= uBound
        };
      }, {}),
    [ranges, width]
  );

  return useMemo(
    () => ({
      isMounted,
      current: currentBreakpoint,
      ...rangeBooleans
    }),
    [currentBreakpoint, rangeBooleans, isMounted]
  );
}

// Context
const MediaQueryContext = createContext();

// Context provider
export const MediaQueryProvider = ({ children }) => {
  const theme = useTheme();

  if (!theme.mediaRanges)
    throw new Error('There are no media ranges defined in the theme');

  const ranges = Object.entries(theme.mediaRanges);

  // Create breakpoints from media ranges.
  const breakpoints = useMemo(
    () =>
      ranges.reduce(
        (acc, [breakpoint, [lowerBound]]) => ({
          ...acc,
          [breakpoint]: lowerBound || 0
        }),
        {}
      ),
    [ranges]
  );

  const { observe, currentBreakpoint, width } = useDimensions({
    breakpoints,
    updateOnBreakpointChange: true
  });

  useEffect(() => {
    observe(document.body);
  }, [observe]);

  const contextValue = {
    currentBreakpoint,
    width,
    ranges
  };

  return (
    <MediaQueryContext.Provider value={contextValue}>
      {children}
    </MediaQueryContext.Provider>
  );
};

MediaQueryProvider.propTypes = {
  children: T.node
};
