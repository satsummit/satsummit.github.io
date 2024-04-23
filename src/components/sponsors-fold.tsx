import React from 'react';
import {
  Box,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  VisuallyHidden
} from '@chakra-ui/react';
import { Fold } from './fold';
import SmartLink from './smart-link';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, ImageDataLike, getImage } from 'gatsby-plugin-image';

const sponsorsGroups = [
  'Platinum',
  'Gold',
  'Silver',
  'Bronze',
  'Community',
  'Hosts',
  'Media Partner'
];

const opticalLogoAdjustments = {
  /* Adjust image optical size */

  '.sponsor-development-seed': {
    transform: 'scale(0.84)'
  },

  '.sponsor-devglobal': {},
  '.sponsor-lifelines': {}
};

export default function SponsorsFold() {
  const { sponsors } = useStaticQuery<{
    sponsors: { nodes: Queries.Sponsor[] };
  }>(graphql`
    query {
      sponsors: allSponsor(
        sort: { slug: ASC }
        filter: { published: { eq: true } }
      ) {
        nodes {
          id
          title
          slug
          url
          group
          image {
            childImageSharp {
              gatsbyImageData(
                height: 56
                placeholder: BLURRED
                transformOptions: { fit: CONTAIN }
                formats: PNG
                backgroundColor: "#FFFFFF"
              )
            }
          }
        }
      }
    }
  `);

  return (
    <Box
      as='section'
      bg='base.50'
      px={{ base: '4', md: '8' }}
      pt={{ base: '8', lg: '16' }}
      display='flex'
      flexFlow='column'
      gap={{ base: '8', lg: '16' }}
    >
      <Fold spacingY={{ base: '4', lg: '8' }}>
        <Heading as='h2' size='2xl' gridColumn='1/-1'>
          Sponsors
        </Heading>
        {sponsorsGroups.map((group) => {
          const items = sponsors.nodes.filter((node) => node.group === group);

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
              <List
                as='ol'
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
                        _hover={{
                          '> *': {
                            opacity: 0.64
                          }
                        }}
                        sx={{
                          '> *': {
                            transition: 'opacity 0.16s ease-in-out'
                          },
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
              </List>
            </Flex>
          );
        })}
      </Fold>
      <Divider borderColor='base.200a' size='md' maxW='container.xl' m='auto' />
    </Box>
  );
}
