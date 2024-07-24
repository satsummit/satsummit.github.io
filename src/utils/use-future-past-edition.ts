import { useMemo } from 'react';
import { isFuture, isToday } from 'date-fns';

import { utcString2userTzDate } from './date';

export function useFuturePastEditions<T extends { dates?: string[] }>(
  editions: T[]
) {
  return useMemo(
    () =>
      editions.reduce(
        (acc, edition) => {
          const current = edition.dates?.some((date) => {
            const d = utcString2userTzDate(date);
            return isToday(d) || isFuture(d);
          });
          if (current) {
            return [[...acc[0], edition], acc[1]];
          } else {
            return [acc[0], [...acc[1], edition]];
          }
        },
        [[], []] as T[][]
      ),
    [editions]
  );
}
