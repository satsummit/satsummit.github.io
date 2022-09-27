import { useEffect, useState } from 'react';

const liveRanges = [
  {
    start: new Date('2022-09-28T08:00:00.000-04:00'),
    end: new Date('2022-09-28T18:15:00.000-04:00')
  },
  {
    start: new Date('2022-09-29T08:00:00.000-04:00'),
    end: new Date('2022-09-29T17:00:00.000-04:00')
  }
];

export function useLive() {
  const [state, setState] = useState({
    isLive: false,
    nextIn: null
  });

  useEffect(() => {
    let reqId = null;
    let lastTs = 0;

    function tick(ts) {
      const now = Date.now();
      if (!lastTs || ts - lastTs >= 100) {
        lastTs = ts;
        const isLive = liveRanges.some(
          ({ start, end }) => now >= start.getTime() && now < end.getTime()
        );
        const nextRange = liveRanges.find(({ start }) => now < start.getTime());
        const nextIn = nextRange ? nextRange.start.getTime() - now : null;
        // Avoid unnecessary rerenders.
        setState((v) =>
          v.isLive !== isLive || v.nextIn !== nextIn ? { isLive, nextIn } : v
        );
      }
      reqId = window.requestAnimationFrame(tick);
    }

    reqId = window.requestAnimationFrame(tick);

    return () => {
      reqId && window.cancelAnimationFrame(reqId);
    };
  }, []);

  return state;
}

export function time2Counter(millis) {
  const time = millis / 1000;
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor((time % 3600) % 60);

  const p = (v) => `${v < 10 ? '0' : ''}${v}`;

  return [p(hours), p(minutes), p(seconds)];
}
