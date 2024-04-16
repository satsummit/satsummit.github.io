import React from 'react';
import { Box, Button, Heading, Image } from '@chakra-ui/react';
import SmartLink from '$components/smart-link';

import astroUrl from '$images/cta/cta--astro@2x.png';
import cloudSmallUrl from '$images/cta/cta--cloud-small@2x.png';
import satelliteUrl from '$images/cta/cta--satellite@2x.png';

import { CollecticonArrowUpRight } from '@devseed-ui/collecticons-chakra';

export function TicketsCta() {
  return (
    <Box
      as='section'
      className='not-mdx'
      position='relative'
      padding={{ base: '4', md: '8', lg: '16' }}
      pt={{ base: '8', md: '16', lg: '32' }}
      overflow='hidden'
      _before={{
        content: '""',
        bg: 'base.50',
        borderRadius: 'sm',
        position: 'absolute',
        inset: '0',
        top: { base: '4', md: '8', lg: '16' },
        zIndex: '1',
        pointerEvents: 'none'
      }}
    >
      <Box
        position='relative'
        zIndex='3'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
        maxW='container.sm'
      >
        <Heading as='h2' size='2xl'>
          Get your ticket
        </Heading>
        <p>
          All tickets include attendance for both May 16 & 17. There are no one
          day tickets offered at this time. The prices include breakfast and
          lunch during the conference and light fare at social events.Tickets
          are nonrefundable.
        </p>
        <Box>
          <Button
            as={SmartLink}
            noLinkStyles
            to='https://app.tickettailor.com/events/satsummit2024/1151624'
            colorScheme='primary'
            rightIcon={<CollecticonArrowUpRight />}
            size={{ base: 'md', lg: 'lg' }}
          >
            Book ticket
          </Button>
        </Box>
      </Box>

      <Box
        as='figure'
        position='absolute'
        zIndex='2'
        inset='0'
        pointerEvents='none'
      >
        <Image
          src={astroUrl}
          alt='A plain yellow shape illustrating the sun over a deep blue sky.'
          position='absolute'
          zIndex='1'
          top={{ base: '3rem', md: '3rem' }}
          right={{ base: '8%', sm: '16%', md: '30%', lg: '28%' }}
          width={{ base: '4rem', md: '6rem', lg: '8rem' }}
        />

        <Image
          src={cloudSmallUrl}
          alt='A piece of collage illustrating small clouds.'
          position='relative'
          zIndex='2'
          height='100%'
          fit='cover'
          align={{ base: '2rem 0', md: '4rem 0', lg: '6rem 0' }}
        />

        <Image
          src={satelliteUrl}
          alt='A piece of collage illustrating a satellite.'
          position='absolute'
          zIndex='3'
          bottom={{ base: '-1rem', md: '-1rem', lg: '0' }}
          right={{ base: '0', md: '-2rem', lg: '-2rem' }}
          width={{ base: '10rem', sm: '9rem', md: '16rem', lg: '20rem' }}
        />
      </Box>
    </Box>
  );
}
