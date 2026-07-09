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
  const bkpt = useBreakpoint({ breakpoints: ['base', 'lg'] });

  if (bkpt === 'base') {
    return (
      <Box position='relative'>
        <Container
          maxW={{ base: '35rem', md: '50rem' }}
          p={2}
          gap={2}
          display='flex'
          fontFamily='heading'
          flexFlow='column'
        >
          <Flex gap={2}>
            <Box borderRadius='xl' overflow='hidden'>
              <StaticImage
                src='./hero-1b.png'
                alt='Yellow sun behind building'
              />
            </Box>
            <Box borderRadius='xl' overflow='hidden'>
              <StaticImage src='./hero-2b.png' alt='Single satellite' />
            </Box>
          </Flex>

          <Stack alignItems='end' mt={{ base: '-8rem', md: '-17rem' }}>
            <Box height='100%'>
              <StaticImage src='./hero-arch.png' alt='Arch' objectFit='none' />
            </Box>
            <EventName mt='-10.5rem' zIndex={2} />
          </Stack>

          <LocationDate />
        </Container>
      </Box>
    );
  } else if (bkpt === 'lg') {
    return (
      <Box position='relative'>
        <Container maxW='7xl' p={4} gap={4} display='flex' fontFamily='heading'>
          <Stack gap={4}>
            <Box bg='primary.500' h='4rem' borderTopRadius='xl' />
            <Box borderBottomRadius='xl' overflow='hidden'>
              <StaticImage
                src='./hero-1.png'
                alt='Yellow sun behind building'
              />
            </Box>
          </Stack>

          <Stack gap={4} alignItems='end'>
            <Box hideBelow='lg'>
              <StaticImage src='./hero-2.png' alt='Satellite orbiting earth' />
            </Box>

            <EventName />
          </Stack>

          <Stack gap={4}>
            <Box borderTopRadius='xl' overflow='hidden'>
              <StaticImage src='./hero-3.png' alt='Satellite near arch' />
            </Box>
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
      fontSize={{ base: '4rem', md: '4.5rem', lg: '5rem' }}
      maxW='31rem'
      {...props}
    >
      <Text
        fontSize={{ base: '1.5rem', md: '2rem' }}
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
        November 16 & 19
      </Text>
      <Text fontSize='2.5rem' lineHeight='1' fontVariationSettings="'wdth' 80">
        ST. Louis, MO
      </Text>
    </Box>
  );
}
