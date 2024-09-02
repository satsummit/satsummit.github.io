import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Box, Heading, Text } from '@chakra-ui/react';
import { CollecticonExpandTopRight } from '@devseed-ui/collecticons-chakra';

import SmartLink from '$components/smart-link';

import { multiDateDisplay } from '$utils/date';

import cloudSmallUrl from '$images/banner/banner--cloud-small@2x.png';

interface EditionCardProps {
  title: string;
  url: string;
  isExternal?: boolean;
  dates: Date[];
  image?: React.ReactElement | IGatsbyImageData;
}

export function EditionCard(props: EditionCardProps) {
  const { title, url, isExternal, dates, image } = props;

  return (
    <SmartLink
      to={url}
      position='relative'
      minH={{ base: '18rem', md: '24rem' }}
      display='flex'
      flexDir='column'
      justifyContent='end'
      gap={4}
      p={{ base: 4, md: 8 }}
      overflow='hidden'
      borderRadius='sm'
      color='surface.500'
      bgColor='primary.800'
      bgImage={`url('${cloudSmallUrl}')`}
      bgRepeat='no-repeat'
      bgSize='auto 70%'
      bgPosition='calc(100% + 8rem) bottom'
      // Override background if image is provided.
      bg={image ? 'none' : undefined}
      _hover={{
        textDecoration: 'none',
        transform: 'translateY(-2px)'
      }}
      sx={{
        '.gatsby-image-wrapper': {
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',

          '&:after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(13, 22, 88, 0) 0%, #0D1658 100%)',
            mixBlendMode: 'multiply'
          }
        }
      }}
    >
      {image ? (
        React.isValidElement(image) ? (
          image
        ) : (
          <GatsbyImage image={image as IGatsbyImageData} alt={title} />
        )
      ) : null}
      {isExternal && (
        <Box
          position='absolute'
          right={0}
          top={0}
          p={4}
          display='flex'
          justifyContent='end'
          w={20}
          h={20}
          bg='primary.500'
          clipPath='polygon(0 0, 100% 100%, 100% 0);'
        >
          <CollecticonExpandTopRight display='block' />
        </Box>
      )}
      <Box>
        <Heading size='xl'>{title}</Heading>
        <Text fontSize='sm' fontStyle='initial'>
          {multiDateDisplay(dates)}
        </Text>
      </Box>
      <Text>Satellite data for global development.</Text>
    </SmartLink>
  );
}
