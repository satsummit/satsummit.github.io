import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { point } from '@turf/helpers';
import { booleanPointInPolygon } from '@turf/boolean-point-in-polygon';
import { bboxPolygon } from '@turf/bbox-polygon';
import { bearing } from '@turf/bearing';
import { Box, Flex, FlexProps, Heading, Text } from '@chakra-ui/react';
import { BBox } from 'geojson';
import {
  CollecticonBrandSatsummit,
  CollecticonChakra
} from '@devseed-ui/collecticons-chakra';

import SmartLink from '$components/smart-link';
import { useEditionContext } from '$context/edition';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJjbDgwM2xra3kwMmJpM3dyMTNwODVoZjZwIn0.e-ZxA8VIcxhCmR1kprskpQ';

interface LocationMapProps {
  coordinates: [number, number];
  url: string;
  location: string;
  poiMarkers?: {
    name: string;
    coordinates: [number, number];
    icon: CollecticonChakra;
  }[];
}

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

export default function LocationMap(props: LocationMapProps) {
  const { coordinates, url, location, poiMarkers = [], ...options } = props;

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map>();

  const [isLoaded, setIsLoaded] = useState(false);

  const { edition } = useEditionContext();

  useEffect(() => {
    if (!mapRef.current) return;

    const container = mapRef.current;

    const mbMap = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/devseed/cltwvo1u300bv01qsbkli6jcz',
      logoPosition: 'bottom-left',
      attributionControl: false,
      trackResize: true,
      pitchWithRotate: false,
      dragRotate: false,
      scrollZoom: false,
      center: coordinates,
      ...(options || {})
    });

    mapInstance.current = mbMap;

    mbMap.on('load', () => {
      setIsLoaded(true);
    });

    // Include attribution.
    mbMap.addControl(new mapboxgl.AttributionControl(), 'bottom-right');

    mbMap.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-left'
    );

    const sizeObserver = new ResizeObserver(() => {
      mbMap.resize();
    });

    sizeObserver.observe(container);

    return () => {
      mbMap.remove();
      sizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Box
        ref={mapRef}
        aspectRatio={16 / 9}
        width='calc(100vw - var(--scrollbar-width))'
        position='relative'
        left='50%'
        right='50%'
        marginLeft='calc(-50vw + var(--scrollbar-width) / 2)'
        marginRight='calc(-50vw + var(--scrollbar-width) / 2)'
        maxH='44rem'
      />
      {isLoaded &&
        poiMarkers.map((poi) => (
          <React.Fragment key={poi.name}>
            <OffscreenMarkerIndicaror
              mbMap={mapInstance.current!}
              padding={24}
              coordinates={poi.coordinates}
            >
              {(position) => (
                <IconMarker
                  angle={position.angle}
                  wrapperProps={{
                    cursor: 'pointer',
                    onClick: () => {
                      mapInstance.current?.panTo(poi.coordinates);
                    }
                  }}
                >
                  <poi.icon color='white' title={poi.name} />
                </IconMarker>
              )}
            </OffscreenMarkerIndicaror>
            <MbMarker
              coordinates={poi.coordinates}
              mbMap={mapInstance.current!}
            >
              <IconMarker angle={180} wrapperProps={{ mt: '-1.25rem' }}>
                <poi.icon color='white' title={poi.name} />
              </IconMarker>
            </MbMarker>
          </React.Fragment>
        ))}
      {isLoaded && (
        <>
          <OffscreenMarkerIndicaror
            mbMap={mapInstance.current!}
            padding={24}
            coordinates={coordinates}
          >
            {(position) => (
              <IconMarker
                angle={position.angle}
                wrapperProps={{
                  cursor: 'pointer',
                  onClick: () => {
                    mapInstance.current?.panTo(coordinates);
                  }
                }}
              >
                <CollecticonBrandSatsummit color='white' title='Venue' />
              </IconMarker>
            )}
          </OffscreenMarkerIndicaror>

          <MbMarker coordinates={coordinates} mbMap={mapInstance.current!}>
            <SmartLink
              to={url}
              position='absolute'
              display='flex'
              backgroundColor='surface.500'
              py='2'
              px='4'
              boxShadow='md'
              fontSize='sm'
              borderRadius='md'
              whiteSpace='nowrap'
              textAlign='center'
              transform='translate(-50%, -100%)'
              _visited={{
                color: 'inherit',
                textDecoration: 'none'
              }}
              _hover={{
                textDecoration: 'none'
              }}
              _after={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                width: '4',
                height: '2',
                transform: 'translateX(-50%)',
                background: 'surface.500',
                content: '""',
                clipPath: 'polygon(100% 0, 0 0, 50% 100%)',
                pointerEvents: 'none'
              }}
              sx={{
                '&, > *': {
                  transition: 'opacity 0.24s ease'
                },
                '&:hover > *': {
                  opacity: 0.64
                }
              }}
            >
              <Heading as='strong' size='sm'>
                SatSummit {edition?.name}{' '}
                <Text as='small' display='block' lineHeight='1'>
                  at {location}
                </Text>
              </Heading>
            </SmartLink>
          </MbMarker>
        </>
      )}
    </>
  );
}

interface OffscreenMarkerIndicarorProps {
  padding: number;
  mbMap: mapboxgl.Map;
  coordinates: [number, number];
  children: ({
    x,
    y,
    angle
  }: {
    x: number;
    y: number;
    angle: number;
  }) => JSX.Element;
}

function OffscreenMarkerIndicaror(props: OffscreenMarkerIndicarorProps) {
  const {
    padding,
    mbMap,
    coordinates: [lng, lat],
    children
  } = props;

  const [markerContainer, setMarkerContainer] = useState<HTMLDivElement>();
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    angle: 0
  });

  useEffect(() => {
    const pointerMarker = document.createElement('div');
    pointerMarker.style.position = 'absolute';
    pointerMarker.style.display = 'none';

    mbMap.getContainer().appendChild(pointerMarker);
    setMarkerContainer(pointerMarker);

    const coordinates = [lng, lat];

    let width = 0;
    let height = 0;
    const onMapResize = () => {
      const { width: w, height: h } = mbMap.getCanvas().getBoundingClientRect();
      width = w;
      height = h;
    };

    const onMapMove = () => {
      const h2 = height / 2;
      const w2 = width / 2;

      const bbox = mbMap.getBounds()!.toArray().flat() as BBox;
      const polygon = bboxPolygon(bbox);
      const inViewport = booleanPointInPolygon(point(coordinates), polygon);

      if (!inViewport) {
        pointerMarker.style.display = 'block';
        const { lng, lat } = mbMap.getCenter();
        const br = bearing([lng, lat], point(coordinates));

        // Bring the bearing to the north east quadrant.
        const absoluteBearing = Math.abs(br);
        const isNorth = absoluteBearing <= 90;
        const isEast = br >= 0;

        const angle = isNorth ? absoluteBearing : 90 - (absoluteBearing - 90);

        let x0 = Math.tan(degToRad(angle)) * h2;
        let y0 = w2 / Math.tan(degToRad(angle));

        // Invert values according to the quadrant.
        x0 = isEast ? x0 : -x0;
        y0 = isNorth ? -y0 : y0;

        const { width: markerW, height: markerH } =
          pointerMarker.getBoundingClientRect();

        const x =
          clamp(w2 + x0, padding + markerW / 2, width - padding - markerW / 2) -
          markerW / 2;
        const y =
          clamp(
            h2 + y0,
            padding + markerH / 2,
            height - padding - markerH / 2
          ) -
          markerH / 2;

        setPosition({ x, y, angle: br });

        pointerMarker.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        pointerMarker.style.display = 'none';
      }
    };

    mbMap.on('resize', onMapResize);
    mbMap.on('move', onMapMove);

    setTimeout(() => {
      onMapResize();
      onMapMove();
    }, 0);

    return () => {
      mbMap.off('move', onMapMove);
      mbMap.off('resize', onMapResize);
      pointerMarker.remove();
      setMarkerContainer(undefined);
    };
  }, [lat, lng, mbMap, padding]);

  return markerContainer && createPortal(children(position), markerContainer);
}

interface IconMarkerProps {
  angle: number;
  children: React.ReactNode;
  wrapperProps?: FlexProps;
}

function IconMarker(props: IconMarkerProps) {
  const { angle, children, wrapperProps = {} } = props;

  return (
    <Flex
      bg='primary.500'
      w={8}
      h={8}
      borderRadius={999}
      borderTopLeftRadius={0}
      transform={`rotate(${angle + 45}deg)`}
      transformOrigin='center'
      alignItems='center'
      justifyContent='center'
      {...wrapperProps}
    >
      <Box transform={`rotate(${-angle - 45}deg)`}>{children}</Box>
    </Flex>
  );
}

interface MbMarkerProps {
  coordinates: [number, number];
  mbMap: mapboxgl.Map;
  children: React.ReactNode;
}

function MbMarker(props: MbMarkerProps) {
  const {
    children,
    coordinates: [lng, lat],
    mbMap
  } = props;

  const [markerContainer, setMarkerContainer] = useState<HTMLDivElement>();

  useEffect(() => {
    const coordinates = [lng, lat];

    // Marker
    const el = document.createElement('div');
    setMarkerContainer(el);

    new mapboxgl.Marker({
      element: el
    })
      .setLngLat(coordinates as unknown as LngLatLike)
      .addTo(mbMap);
  }, [lng, lat, mbMap]);

  return markerContainer && createPortal(children, markerContainer);
}
