import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, Heading, Text } from '@chakra-ui/react';
import { createPortal } from 'react-dom';
import SmartLink from '$components/smart-link';
import { useEditionContext } from '$context/edition';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJjbDgwM2xra3kwMmJpM3dyMTNwODVoZjZwIn0.e-ZxA8VIcxhCmR1kprskpQ';

interface LocationMapProps {
  coordinates: [number, number];
  url: string;
  location: string;
}

export default function LocationMap(props: LocationMapProps) {
  const { coordinates, url, location, ...options} = props;

  const mapRef = useRef<HTMLDivElement>(null);

  const [markerContainer, setMarkerContainer] = useState<HTMLDivElement>();

  const { edition } = useEditionContext();

  useEffect(() => {
    if (!mapRef.current) return;

    const mbMap = new mapboxgl.Map({
      container: mapRef.current,
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

    // Include attribution.
    mbMap.addControl(new mapboxgl.AttributionControl(), 'bottom-right');

    mbMap.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-left'
    );

    // Marker
    const el = document.createElement('div');
    setMarkerContainer(el);

    new mapboxgl.Marker({
      element: el
    })
      .setLngLat(coordinates)
      .addTo(mbMap);

    return () => {
      mbMap.remove();
    };
  }, []);

  return (
    <>
      <Box
        ref={mapRef}
        aspectRatio={16 / 9}
        width='100vw'
        position='relative'
        left='50%'
        right='50%'
        marginLeft='-50vw'
        marginRight='-50vw'
        maxH='44rem'
      />
      {markerContainer &&
        createPortal(
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
          </SmartLink>,
          markerContainer
        )}
    </>
  );
}
