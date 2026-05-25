import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

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
          color='surface.500'
          mt={{ base: '0', md: '-3rem', lg: '0' }}
          css={{
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
            Saint Louis &apos;26
          </Text>
        </Heading>
      </Flex>
    </Box>
  );
}
