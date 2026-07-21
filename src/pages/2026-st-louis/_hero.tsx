import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  HeadingProps,
  Stack,
  Text,
  useBreakpoint
} from '@chakra-ui/react';
import { StaticImage } from 'gatsby-plugin-image';

export default function HomeHero() {
  const bkpt = useBreakpoint({ breakpoints: ['base', 'md'] });

  if (bkpt === 'base') {
    return (
      <Box position='relative'>
        <Container
          p={2}
          gap={2}
          display='flex'
          fontFamily='heading'
          flexFlow='column'
        >
          <Flex gap={2} alignItems='start' maxW='35rem'>
            <Stack
              bg='primary.500'
              borderRadius='xl'
              overflow='hidden'
              aspectRatio={1}
              justifyContent='end'
            >
              <Box w='40%' mt='1rem'>
                <StaticImage src='./hero-sun.png' alt='Yellow sun' />
              </Box>
              <Box blendMode='screen' mt='-10rem'>
                <StaticImage
                  src='./hero-sci-center.png'
                  alt='Science center building'
                />
              </Box>
            </Stack>

            <Stack
              bg='primary.500'
              borderRadius='xl'
              overflow='hidden'
              position='relative'
              aspectRatio={1}
              _before={{
                content: "''",
                bg: '#D3472C',
                w: '90%',
                h: '3rem',
                borderLeftRadius: 'xl',
                position: 'absolute',
                right: 0,
                bottom: '0.5rem'
              }}
            >
              <Box blendMode='screen' w='80%' alignSelf='end'>
                <StaticImage src='./hero-landsat.png' alt='Landsat Satellite' />
              </Box>
            </Stack>
          </Flex>

          <Stack alignItems='end' mt={{ base: '-8rem', sm: '-11rem' }}>
            <Box height='100%'>
              <StaticImage
                src='./hero-arch-gray.png'
                alt='Arch'
                objectFit='none'
              />
            </Box>
            <EventName mt='-10.5rem' zIndex={2} />
          </Stack>

          <LocationDate />
        </Container>
      </Box>
    );
  } else if (bkpt === 'md') {
    return (
      <Box position='relative'>
        <Container
          maxW='2000px'
          p={4}
          gap={4}
          display='flex'
          fontFamily='heading'
        >
          <Stack
            gap={4}
            flexBasis='42rem'
            hideBelow='lg'
            _before={{
              content: "''",
              bg: 'primary.500',
              w: '100%',
              h: '4rem',
              borderTopRadius: 'xl'
            }}
          >
            <Stack
              bg='primary.500'
              borderBottomRadius='xl'
              overflow='hidden'
              justifyContent='end'
              h='100%'
            >
              <Box w='50%' mt='4rem'>
                <StaticImage src='./hero-sun.png' alt='Yellow sun' />
              </Box>
              <Box blendMode='screen' mt='-10rem'>
                <StaticImage
                  src='./hero-sci-center.png'
                  alt='Science center building'
                />
              </Box>
            </Stack>
          </Stack>

          <Stack gap={4} alignItems='end' width='100%' maxW='68rem'>
            <Box
              borderRadius='xl'
              overflow='hidden'
              width='100%'
              bg='primary.500'
            >
              <Box blendMode='screen'>
                <StaticImage
                  src='./hero-sat-globe.png'
                  alt='Satellite orbiting earth'
                  style={{ width: '100%' }}
                />
              </Box>
            </Box>

            <EventName />
          </Stack>

          <Stack gap={4} flexBasis='42rem'>
            <Stack
              bg='primary.500'
              borderTopRadius='xl'
              overflow='hidden'
              justifyContent='end'
              position='relative'
              _before={{
                content: "''",
                bg: '#D3472C',
                w: '75%',
                h: '6rem',
                borderLeftRadius: 'xl',
                position: 'absolute',
                right: 0,
                top: '9rem'
              }}
            >
              <Box blendMode='screen' w='50%' alignSelf='end' mt='1rem'>
                <StaticImage src='./hero-landsat.png' alt='Landsat Satellite' />
              </Box>
              <Box mt='-2rem'>
                <StaticImage src='./hero-arch.svg' alt='Arch' />
              </Box>
            </Stack>
            <LocationDate />
          </Stack>
        </Container>
      </Box>
    );
  }

  return null;
}

function EventName(props: HeadingProps) {
  return (
    <Heading
      as='h1'
      textTransform='uppercase'
      display='flex'
      flexFlow='column'
      color='basi.500'
      alignItems='end'
      fontSize={{ base: '4rem', md: '4.5rem', lg: '5rem', xl: '6rem' }}
      maxW='31rem'
      {...props}
    >
      <Text
        fontSize={{ base: '1.5rem', md: '2rem', xl: '2.5rem' }}
        fontVariationSettings="'wght' 300, 'wdth' 60"
        lineHeight='1'
      >
        This is
      </Text>
      <Text textAlign='right' lineHeight='1' fontVariationSettings="'wdth' 80">
        Satsummit 2026
      </Text>
    </Heading>
  );
}

function LocationDate() {
  return (
    <Box
      bg='basi.500'
      color='surface.500'
      textTransform='uppercase'
      px={4}
      py={2}
      borderBottomRadius='xl'
    >
      <Text
        fontSize={{ base: '2rem', md: '1.5rem' }}
        lineHeight='1'
        fontVariationSettings="'wght' 300, 'wdth' 60"
      >
        November 18 & 19
      </Text>
      <Text fontSize='2.5rem' lineHeight='1' fontVariationSettings="'wdth' 80">
        ST. Louis, MO
      </Text>
    </Box>
  );
}
