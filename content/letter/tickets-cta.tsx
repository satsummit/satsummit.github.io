import React from 'react';
import { Button } from '@chakra-ui/react';
import SmartLink from '$components/smart-link';

export function TicketsCta() {
  return (
    <Button
      as={SmartLink}
      to='https://app.tickettailor.com/events/satsummit2024/1151624'
      colorScheme='primary'
    >
      Buy tickets
    </Button>
  );
}
