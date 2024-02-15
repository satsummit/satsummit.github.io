import React from 'react';
import { Box, Button, Heading, Image } from '@chakra-ui/react';
import SmartLink from '$components/smart-link';

import astroUrl from '../../images/cta/cta--astro@2x.png';
import cloudSmallUrl from '../../images/cta/cta--cloud-small@2x.png';
import satelliteUrl from '../../images/cta/cta--satellite@2x.png';

import { CollecticonArrowUpRight } from '@devseed-ui/collecticons-chakra';

export function TicketsCta() {
  return (
    <Box
      as='section'
      position='relative'
      bg='base.50'
      pointerEvents='none'
      padding={{ base: '8', lg: '16' }}
    >
      <Box
        pointerEvents='auto'
        maxW='container.sm'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <Heading as='h2' size='3xl'>
          Get your ticket
        </Heading>
        <p>
          All tickets include attendance for both May 16 & 17. There are no one
          day tickets offered at this time. The prices include breakfast and
          lunch during the conference and light fare at social events. Tickets
          are nonrefundable.
        </p>
        <Box>
          <Button
            as={SmartLink}
            to='https://app.tickettailor.com/events/satsummit2024/1151624'
            colorScheme='primary'
            rightIcon={<CollecticonArrowUpRight />}
            size={{ base: 'md', lg: 'lg' }}
          >
            Book ticket
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
