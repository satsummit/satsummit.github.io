import React, { lazy, Suspense, useCallback, useEffect, useRef } from 'react';
import type { Application, SPEObject } from '@splinetool/runtime';
import { Box } from '@chakra-ui/react';

// Lazy-load the Spline runtime so it stays out of the main bundle.
const Spline = lazy(() => import('@splinetool/react-spline'));

const DEG = Math.PI / 180;

const scene = '/2027-lisbon/home-hero.splinecode';
const maxYaw = 7;
const maxPitch = 4;
// Camera zoom (1 = as authored in Spline). Higher is closer.
const zoom = 1.5;

/**
 * Hero 3D scene with a transparent background and mouse tilt.
 * The tilt rotates the "Composition" group and nudges the "Horizon Globe"
 * for a little parallax, matching the behaviour built into the Spline file.
 */
export default function HomeHero() {
  const raf = useRef<number>(0);
  const cleanup = useRef<() => void>(() => {});

  const onLoad = useCallback((app: Application) => {
    // Transparent canvas so the page background shows through.
    app.setBackgroundColor('transparent');
    app.setZoom(zoom);

    const composition = app.findObjectByName('Composition') as
      | SPEObject
      | undefined;
    const globe = app.findObjectByName('Horizon Globe') as
      | SPEObject
      | undefined;
    if (!composition) return;

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduce) return;

    const v3 = (o: { x: number; y: number; z: number }) => ({
      x: o.x,
      y: o.y,
      z: o.z
    });
    const baseRot = v3(composition.rotation);
    const gPos = globe ? v3(globe.position) : null;
    const gRot = globe ? v3(globe.rotation) : null;

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / (window.innerWidth || 1)) * 2 - 1;
      ty = (e.clientY / (window.innerHeight || 1)) * 2 - 1;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const k = 1 - Math.exp(-dt * 5); // ease toward the pointer
      cx += (tx - cx) * k;
      cy += (ty - cy) * k;

      composition.rotation.x = baseRot.x + cy * maxPitch * DEG;
      composition.rotation.y = baseRot.y + cx * maxYaw * DEG;
      if (globe && gPos && gRot) {
        globe.position.x = gPos.x - cx * 10;
        globe.position.y = gPos.y + cy * 5;
        globe.rotation.y = gRot.y - cx * 2 * DEG;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    cleanup.current = () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useEffect(() => () => cleanup.current?.(), []);

  return (
    <Box
      position='relative'
      bg='primary.500'
      minHeight={{ base: '20rem', md: '36rem' }}
      css={{
        // Decorative only: block Spline's orbit pan/zoom and its HTML-content
        // overlay (inline pointer-events:auto, hence !important). The tilt
        // listens on window, so it still works.
        pointerEvents: 'none',
        '& *': { pointerEvents: 'none !important' },
        _after: {
          content: '""',
          position: 'absolute',
          zIndex: 100,
          bottom: 0,
          height: '5rem',
          width: '100%',
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))'
        }
      }}
    >
      <Suspense fallback={null}>
        <Spline
          scene={scene}
          onLoad={onLoad}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'transparent'
          }}
        />
      </Suspense>
    </Box>
  );
}
