import React from 'react';
import { Box, Flex, Heading, Image, Text, useToken } from '@chakra-ui/react';

import cloudsUrl from '../../images/home-hero-clouds.png';
import mountainUrl from '../../images/home-hero-mountains.svg';
import sunUrl from '../../images/home-hero-sun.svg';
import satelitteUrl from '../../images/home-hero-satellite.png';

import astroUrl from '../../images/banner/banner--astro@2x.png';
import cloudBigUrl from '../../images/banner/banner--cloud-big@2x.png';
import cloudSmallUrl from '../../images/banner/banner--cloud-small@2x.png';
import mountainBigUrl from '../../images/banner/banner--mountain-big@2x.png';
import mountainMediumUrl from '../../images/banner/banner--mountain-medium@2x.png';
import mountainSmallUrl from '../../images/banner/banner--mountain-small@2x.png';
import satelliteUrl from '../../images/banner/banner--satellite@2x.png';

export default function HomeHero() {
  return (
    <Box position='relative' bg='primary.500' minHeight='36rem'>
      <Flex
        maxW='container.xl'
        height='100%'
        alignItems={{ md: 'center' }}
        justifyContent='center'
        flexFlow={{ base: 'column', md: 'row' }}
        gap='4'
        mx='auto'
      >
        <Heading
          as='h1'
          textTransform='uppercase'
          display='inline-flex'
          flexFlow='column'
          color={{
            base: 'white',
            md: 'base.500'
          }}
          sx={{
            '> *': {
              lineHeight: '1'
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
          <Text
            as='span'
            fontSize={{ base: '4rem', md: '8rem' }}
            mt={{ md: '-4' }}
          >
            Satsummit
          </Text>
          <Text
            as='span'
            fontSize={{ base: '4rem', md: '8rem' }}
            alignSelf='start'
            mt={{ md: '-4' }}
            position='relative'
            zIndex='1'
            _before={{
              content: '""',
              backgroundColor: {
                base: 'base.500',
                md: 'secondary.500'
              },
              position: 'absolute',
              width: '100%',
              height: { base: '2rem', md: '3.5rem' },
              bottom: {
                base: '7px',
                md: '13px'
              },
              zIndex: '-1'
            }}
          >
            2024
          </Text>
        </Heading>
        <Box
          bg='base.500'
          color='white'
          position='relative'
          alignSelf={{ base: 'start', md: 'center' }}
          p='4'
          ml={{ base: '7.5rem', md: '-17rem', lg: '-18rem' }}
          mt={{ base: '-1.75rem', md: '19rem', lg: '4rem' }}
          order={{ base: '2', lg: '-1' }}
          _after={{
            position: 'absolute',
            content: '""',
            width: '0',
            height: '0',
            right: { base: 'auto', lg: '0' },
            left: { base: '0', lg: 'auto' },
            bottom: { base: 'auto', lg: '-1rem' },
            top: { base: '-1rem', lg: 'auto' },
            borderTop: { lg: '1rem solid' },
            borderTopColor: { lg: 'base.500' },
            borderLeft: { lg: '1.5rem solid transparent' },
            borderBottom: { base: '1rem solid', lg: 'none' },
            borderBottomColor: { base: 'base.500', lg: 'none' },
            borderRight: { base: '1.5rem solid transparent', lg: 'none' }
          }}
        >
          <Heading
            as='p'
            textTransform='uppercase'
            fontSize={{ base: '1.5rem', md: '2rem' }}
          >
            May 16 & 17th
            <br />
            Washington, D.C.
          </Heading>
        </Box>
      </Flex>
      <Image
        src={astroUrl}
        alt='A plain yellow shape illustrating the sun over a deep blue sky.'
        position='absolute'
        bottom='19rem'
        left='calc(50% + 5.5rem)'
        width={{ base: '8rem', md: '10rem', lg: '12rem' }}
      />
      <Box inset='0' overflow='hidden' border='1px solid red'>
        <Box
          id='banner--clouds'
          position='absolute'
          bottom='0'
          left='calc(50%)'
          transform='translateX(-50%)'
          height='100%'
          width={{ base: '132rem', md: '134rem', lg: '136rem' }}
          overflow='hidden'
        >
          <Image
            src={cloudBigUrl}
            alt='A piece of collage illustrating big clouds.'
            position='absolute'
            right='calc(50% + 14rem)'
            bottom='0'
            width={{ base: '50rem', md: '52rem', lg: '54rem' }}
          />
          <Image
            src={cloudSmallUrl}
            alt='A piece of collage illustrating small clouds.'
            position='absolute'
            left='calc(50% + 24rem)'
            bottom='0'
            width={{ base: '40rem', md: '42rem', lg: '44rem' }}
          />
        </Box>
        <Box
          id='banner--mountains'
          position='absolute'
          bottom='0'
          left='calc(50%)'
          transform='translateX(-50%)'
          height='100%'
          width={{ base: '94rem', md: '96rem', lg: '98rem' }}
          overflow='hidden'
        >
          <Image
            src={mountainSmallUrl}
            alt='A plain white triangle shape illustrating a smaller mountain next to a summit.'
            position='absolute'
            right='calc(50% + 25rem)'
            bottom='0'
            width={{ base: '20rem', md: '22rem', lg: '24rem' }}
          />
          <Image
            src={mountainMediumUrl}
            alt='A plain white triangle shape illustrating an average mountain next to a summit.'
            position='absolute'
            left='calc(50% - 3rem)'
            bottom='0'
            width={{ base: '48rem', md: '50rem', lg: '52rem' }}
          />
          <Image
            src={mountainBigUrl}
            alt='A plain white triangle shape illustrating a summit.'
            position='absolute'
            left='50%'
            transform='translateX(-50%)'
            bottom='0'
            width={{ base: '76rem', md: '78rem', lg: '80rem' }}
          />
        </Box>
      </Box>
      <Image
        src={satelliteUrl}
        alt='A piece of collage illustrating a satellite.'
        position='absolute'
        top={{ base: '-1rem', md: '-2rem', lg: '-4rem' }}
        right='calc(50% + 8rem)'
        width={{ base: '16rem', md: '18rem', lg: '20rem' }}
        pointerEvents='none'
      />
    </Box>
  );
}

const heroBg = [
  `url('${mountainUrl}') center bottom / auto 35rem no-repeat`,
  `url('${cloudsUrl}') center bottom / auto 45rem no-repeat`,
  `url('${sunUrl}') calc(50% + 11rem) calc(50% - 5rem) / 12rem no-repeat`
].join(', ');

function HomeHero2() {
  const primary = useToken('colors', 'primary.500');

  return (
    <Box
      position='relative'
      background={{
        base: primary,
        // Can't use tokens with this bg notation.
        md: `${heroBg}, ${primary}`
      }}
      height={{ base: 'auto', md: '37rem' }}
      px={{ base: '8', md: '0' }}
      pb={{ base: '8', md: '0' }}
      sx={{
        svg: {
          position: 'absolute',
          bottom: '0'
        }
      }}
    >
      <Image
        display={{
          base: 'none',
          lg: 'block'
        }}
        src={satelitteUrl}
        position='absolute'
        top='-2rem'
        left='calc(50% - 28rem)'
        width='20rem'
      />
      <Flex
        maxW='container.xl'
        height='100%'
        alignItems={{ md: 'center' }}
        justifyContent='center'
        flexFlow={{ base: 'column', md: 'row' }}
        gap='4'
        mx='auto'
      >
        <Heading
          as='h1'
          textTransform='uppercase'
          display='inline-flex'
          flexFlow='column'
          color={{
            base: 'white',
            md: 'base.500'
          }}
          sx={{
            '> *': {
              lineHeight: '1'
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
          <Text
            as='span'
            fontSize={{ base: '4rem', md: '8rem' }}
            mt={{ md: '-4' }}
          >
            Satsummit
          </Text>
          <Text
            as='span'
            fontSize={{ base: '4rem', md: '8rem' }}
            alignSelf='start'
            mt={{ md: '-4' }}
            position='relative'
            zIndex='1'
            _before={{
              content: '""',
              backgroundColor: {
                base: 'base.500',
                md: 'secondary.500'
              },
              position: 'absolute',
              width: '100%',
              height: { base: '2rem', md: '3.5rem' },
              bottom: {
                base: '7px',
                md: '13px'
              },
              zIndex: '-1'
            }}
          >
            2024
          </Text>
        </Heading>
        <Box
          bg='base.500'
          color='white'
          position='relative'
          alignSelf={{ base: 'start', md: 'center' }}
          p='4'
          ml={{ base: '7.5rem', md: '-17rem', lg: '-18rem' }}
          mt={{ base: '-1.75rem', md: '19rem', lg: '4rem' }}
          order={{ base: '2', lg: '-1' }}
          _after={{
            position: 'absolute',
            content: '""',
            width: '0',
            height: '0',
            right: { base: 'auto', lg: '0' },
            left: { base: '0', lg: 'auto' },
            bottom: { base: 'auto', lg: '-1rem' },
            top: { base: '-1rem', lg: 'auto' },
            borderTop: { lg: '1rem solid' },
            borderTopColor: { lg: 'base.500' },
            borderLeft: { lg: '1.5rem solid transparent' },
            borderBottom: { base: '1rem solid', lg: 'none' },
            borderBottomColor: { base: 'base.500', lg: 'none' },
            borderRight: { base: '1.5rem solid transparent', lg: 'none' }
          }}
        >
          <Heading
            as='p'
            textTransform='uppercase'
            fontSize={{ base: '1.5rem', md: '2rem' }}
          >
            May 16 & 17th
            <br />
            Washington, D.C.
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
}
