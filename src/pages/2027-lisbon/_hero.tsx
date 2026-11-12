import React, { useEffect, useRef } from 'react';
import type { Application, SPEObject } from '@splinetool/runtime';
import { Box, VisuallyHidden } from '@chakra-ui/react';

import { multiDateDisplay, utcString2userTzDate } from '$utils/date';

const DEG = Math.PI / 180;

const scene = '/2027-lisbon/home-hero.splinecode';
// Transparent still of the scene, shown until the 3D scene draws its first
// frame. It stays if the scene can't run (no WebGPU or WebGL, load error) or
// is slow to load.
const fallback = '/2027-lisbon/home-hero-fallback.png';
const maxYaw = 7;
const maxPitch = 4;
// Camera zoom (1 = as authored in Spline). Higher is closer.
const zoom = 1.5;

/**
 * The scene is exported for WebGPU, and the runtime refuses to render it in
 * browsers that don't expose a WebGPU adapter. Pick the renderer ourselves so
 * those browsers fall back to WebGL. Add ?renderer=webgl to force the fallback.
 */
async function pickRenderer(): Promise<'webgpu' | 'webgl'> {
  try {
    if (new URLSearchParams(window.location.search).get('renderer') === 'webgl') {
      return 'webgl';
    }
    const gpu = (navigator as Navigator & {
      gpu?: { requestAdapter: () => Promise<unknown> };
    }).gpu;
    return gpu && (await gpu.requestAdapter()) ? 'webgpu' : 'webgl';
  } catch {
    return 'webgl';
  }
}

/**
 * Hero 3D scene with a transparent background and mouse tilt.
 * The tilt rotates the "Composition" group and nudges the "Horizon Globe"
 * for a little parallax, matching the behaviour built into the Spline file.
 */
interface HomeHeroProps {
  name: string;
  dates: readonly string[];
}

export default function HomeHero(props: HomeHeroProps) {
  const { name, dates } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Each mount gets its own canvas: React strict mode mounts twice in dev and
    // two renderers must never share one canvas.
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      background: 'transparent'
    });
    container.appendChild(canvas);

    // Swap the still for the canvas once the runtime has drawn a frame.
    const onRendered = () => {
      if (fallbackRef.current) fallbackRef.current.style.display = 'none';
      canvas.removeEventListener('rendered', onRendered);
    };
    canvas.addEventListener('rendered', onRendered);

    let disposed = false;
    let raf = 0;
    let stopTilt: (() => void) | undefined;
    let loading: Promise<Application | undefined> | undefined;

    const setup = (app: Application) => {
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
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      stopTilt = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
      };
    };

    loading = (async () => {
      // Lazy-load the Spline runtime so it stays out of the main bundle.
      const [{ Application }, renderer] = await Promise.all([
        import('@splinetool/runtime'),
        pickRenderer()
      ]);
      if (disposed) return undefined;
      const app = new Application(canvas, {
        renderer,
        // Render only when the scene changes and keep the scene's HTML layer
        // inline (the default sandboxed iframe interferes with pointer events).
        renderOnDemand: true,
        htmlContentMode: 'inline'
      });
      await app.load(scene);
      if (!disposed) {
        try {
          setup(app);
        } catch {
          // The scene is up; a failure in the tilt must not hide it.
        }
      }
      return app;
    })().catch(() => undefined); // The still stays in place.

    return () => {
      disposed = true;
      stopTilt?.();
      canvas.removeEventListener('rendered', onRendered);
      // Wait for an in-flight load before disposing, then drop the canvas.
      loading?.then((app) => app?.dispose()).finally(() => canvas.remove());
    };
  }, []);

  return (
    <Box
      position='relative'
      bg='primary.500'
      minHeight={{ base: '20rem', md: '36rem' }}
      mt={-20}
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
      <VisuallyHidden as='h1'>
        SatSummit {name}, {multiDateDisplay(dates.map(utcString2userTzDate))}
      </VisuallyHidden>
      <img
        ref={fallbackRef}
        src={fallback}
        alt=''
        aria-hidden='true'
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          // The live scene stops growing on wide screens; so does the still.
          maxWidth: '1700px',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center bottom'
        }}
      />
      <div
        ref={containerRef}
        style={{ position: 'absolute', inset: 0 }}
      />
    </Box>
  );
}
