import React from 'react';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

import astroUrl from '$images/banner/banner--astro@2x.png';
import cloudBigUrl from '$images/banner/banner--cloud-big@2x.png';
import cloudSmallUrl from '$images/banner/banner--cloud-small@2x.png';
import mountainBigUrl from '$images/banner/banner--mountain-big@2x.png';
import mountainMediumUrl from '$images/banner/banner--mountain-medium@2x.png';
import mountainSmallUrl from '$images/banner/banner--mountain-small@2x.png';
import satelliteUrl from '$images/banner/banner--satellite@2x.png';

export default function HomeHero() {
  return (
    <Box
      position='relative'
      bg='primary.500'
      minHeight={{ base: '20rem', md: '36rem' }}
      paddingX={{ base: '12', md: '16' }}
      paddingY={{ base: '12', md: '16' }}
      display='flex'
      flexFlow='column'
      justifyContent='center'
      alignItems={{ base: 'start', md: 'center' }}
      pointerEvents='none'
    >
      <Flex
        id='banner--headline'
        position='relative'
        zIndex='5'
        height='100%'
        flexFlow={{ base: 'column', md: 'row' }}
        gap='4'
        pointerEvents='auto'
      >
        <Heading
          as='h1'
          textTransform='uppercase'
          display='inline-flex'
          flexFlow='column'
          color='base.500'
          mt={{ base: '0', md: '-3rem', lg: '0' }}
          sx={{
            '> *': {
              mt: { base: '-1rem', md: '-1rem' }
            }
          }}
        >
          <Text
            as='span'
            alignSelf={{
              md: 'end'
            }}
            fontSize={{ base: '2rem', sm: '2rem', md: '4rem' }}
          >
            This is
          </Text>
          <Text as='span' fontSize={{ base: '4rem', md: '8rem' }}>
            SatSummit
          </Text>
          <Text
            as='span'
            fontSize={{ base: '3rem', md: '4rem', lg: '6rem' }}
            alignSelf='start'
            position='relative'
            zIndex='1'
            _before={{
              content: '""',
              backgroundColor: 'secondary.500',
              position: 'absolute',
              width: '100%',
              height: '0.5em',
              bottom: '0.05em',
              zIndex: '-1'
            }}
          >
            Lisbon &apos;24
          </Text>
        </Heading>
        <Box
          position='absolute'
          top={{
            base: 'calc(100% - 0.5rem)',
            lg: 'auto'
          }}
          right={{
            base: 'auto',
            lg: 'calc(100% + 1rem)'
          }}
          bottom={{
            base: 'auto',
            lg: '2rem'
          }}
          left={{ base: '-2rem', sm: '4.5rem', md: '6.5rem', lg: 'auto' }}
          display='flex'
          flexDirection='column'
          minWidth={{ lg: '13rem' }}
          _after={{
            content: '""',
            width: '1.5rem',
            height: '1rem',
            background: 'base.500',
            clipPath: {
              base: 'polygon(100% 0, 0% 100%, 100% 100%)',
              sm: 'polygon(0 0, 0% 100%, 100% 100%)',
              lg: 'polygon(0 0, 100% 0, 100% 100%)'
            },
            order: { base: '-1', md: '-1', lg: '1' },
            alignSelf: { base: 'start', sm: 'end' }
          }}
        >
          <Box
            as='span'
            display='block'
            bg='base.500'
            color='surface.500'
            p='4'
          >
            <Heading
              as='p'
              textTransform='uppercase'
              fontSize={{ base: '1.5rem', md: '2rem' }}
              lineHeight='1'
              whiteSpace='nowrap'
            >
              November
              <br />
              18 & 19, 2024
            </Heading>
          </Box>
        </Box>
      </Flex>

      <Image
        src={astroUrl}
        alt='A plain yellow shape illustrating the sun over a deep blue sky.'
        position='absolute'
        zIndex='1'
        top={{ base: '3rem', md: 'auto' }}
        bottom={{ base: 'auto', md: '19rem' }}
        left={{ base: '1rem', md: 'calc(50% + 6rem)' }}
        width={{ base: '6rem', md: '12rem' }}
      />

      <Image
        src={satelliteUrl}
        alt='A piece of collage illustrating a satellite.'
        position='absolute'
        zIndex='6'
        top={{ base: '-1.5rem', md: '-2rem', lg: '-5rem' }}
        right={{ base: '4%', sm: '8%', md: 'calc(50% + 6rem)' }}
        width={{ base: '10rem', sm: '12rem', md: '16rem', lg: '20rem' }}
      />

      <Box
        id='banner--background'
        position='absolute'
        inset='0'
        overflowX='hidden'
      >
        <Box
          id='banner--clouds'
          position='absolute'
          zIndex='2'
          inset={{ base: '0', md: '0 0 0 calc(50%)' }}
          transform={{ base: 'none', md: 'translateX(-50%)' }}
          width={{ base: '132rem', md: '134rem', lg: '136rem' }}
          overflow='hidden'
        >
          <Image
            src={cloudBigUrl}
            alt='A piece of collage illustrating big clouds.'
            position='absolute'
            bottom='0'
            right={{ base: '20rem', md: 'calc(50% + 14rem)' }}
            width={{ base: '32rem', md: '52rem', lg: '54rem' }}
          />
          <Image
            src={cloudSmallUrl}
            alt='A piece of collage illustrating small clouds.'
            position='absolute'
            bottom='0'
            left={{ base: '22rem', md: 'calc(50% + 24rem)' }}
            width={{ base: '26rem', md: '42rem', lg: '44rem' }}
          />
        </Box>
        <Box
          id='banner--mountains'
          position='absolute'
          zIndex='3'
          inset={{ base: '0', md: '0 0 0 calc(50%)' }}
          transform={{ base: 'none', md: 'translateX(-50%)' }}
          width='98rem'
          overflow='hidden'
        >
          <Image
            src={mountainSmallUrl}
            alt='A plain white triangle shape illustrating a smaller mountain next to a summit.'
            position='absolute'
            right='calc(50% + 25rem)'
            bottom='0'
            width={{ base: '16rem', md: '22rem', lg: '24rem' }}
          />
          <Image
            src={mountainMediumUrl}
            alt='A plain white triangle shape illustrating an average mountain next to a summit.'
            position='absolute'
            left={{ base: '10rem', md: 'calc(50% - 3rem)' }}
            bottom='0'
            width={{ base: '28rem', md: '50rem', lg: '52rem' }}
          />
          <Image
            src={mountainBigUrl}
            alt='A plain white triangle shape illustrating a summit.'
            position='absolute'
            left={{ base: '-12rem', md: '50%' }}
            transform={{ base: 'none', md: 'translateX(-50%)' }}
            bottom='0'
            width={{ base: '46rem', md: '78rem', lg: '80rem' }}
          />
        </Box>
      </Box>
    </Box>
  );
}
