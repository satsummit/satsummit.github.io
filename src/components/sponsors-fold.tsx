import React from 'react';
import {
  Separator,
  Flex,
  Heading,
  ListRoot,
  ListItem,
  VisuallyHidden,
  Container
} from '@chakra-ui/react';
import { Fold } from './fold';
import SmartLink from './smart-link';
import { GatsbyImage, ImageDataLike, getImage } from 'gatsby-plugin-image';
import { useEditionContext } from '../context/edition';

const sponsorsGroups = [
  'Platinum',
  'Gold',
  'Silver',
  'Bronze',
  'Community',
  'Hosts',
  'Media Partner',
  'Institutional Partner'
];

const opticalLogoAdjustments = {
  '& .sponsor-development-seed': {
    transform: 'scale(0.84)'
  },
  '& .sponsor-degas': {
    transform: 'scale(1.28)'
  }
};

export default function SponsorsFold() {
  const { sponsors } = useEditionContext();

  if (!sponsors?.length) return null;

  return (
    <Flex
      as='section'
      bg='basi.50'
      pt={{ base: '8', lg: '16' }}
      flexFlow='column'
      gap={{ base: '8', lg: '16' }}
    >
      <Fold rowGap={{ base: '4', lg: '8' }} px={{ base: '4', md: '8' }}>
        <Heading as='h2' size='2xl' gridColumn='1/-1'>
          Sponsors
        </Heading>
        {sponsorsGroups.map((group) => {
          const items = sponsors.filter(
            (node) => node.groupInEdition === group
          );

          if (!items.length) {
            return null;
          }

          return (
            <Flex
              key={group}
              gridColumn={{
                base: '1/-1',
                lg: group === 'Hosts' ? '1 / span 6' : 'span 6'
              }}
              flexFlow='column'
              gap='4'
            >
              <Heading as='h3' size='md'>
                {group}
              </Heading>
              <ListRoot
                as='ol'
                listStyleType='none'
                display='grid'
                gap={{ base: '4', lg: '8' }}
                gridTemplateColumns='repeat(2, 1fr)'
              >
                {items.map((node) => {
                  const image = getImage(
                    node.image as unknown as ImageDataLike
                  )!;

                  return (
                    <ListItem key={node.id} gridColumn='span 1'>
                      <SmartLink
                        to={node.url!}
                        flexGrow={1}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        height='100%'
                        padding='4'
                        borderRadius='sm'
                        background='surface.500'
                        transition='opacity 0.16s ease-in-out'
                        _hover={{
                          opacity: 0.64
                        }}
                        css={{
                          ...opticalLogoAdjustments
                        }}
                      >
                        <VisuallyHidden as='h4'>{node.title}</VisuallyHidden>
                        <GatsbyImage
                          image={image}
                          className={`sponsor-${node.slug}`}
                          alt={`Logo for ${node.title}`}
                        />
                      </SmartLink>
                    </ListItem>
                  );
                })}
              </ListRoot>
            </Flex>
          );
        })}
      </Fold>

      <Container maxW='7xl' px={{ base: '4', md: '8' }}>
        <Separator borderColor='basi.200a' size='md' m='auto' width='100%' />
      </Container>
    </Flex>
  );
}
