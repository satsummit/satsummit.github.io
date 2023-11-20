import React from 'react';
import {
  Box,
  Container,
  Heading,
  ListItem,
  OrderedList,
  Link as ChLink,
  VisuallyHidden
} from '@chakra-ui/react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Sponsor } from '../../types';

const sponsorsGroups = ['Gold', 'Silver', 'Bronze', 'Supporters', 'Hosts'];

export default function Sponsors() {
  const { sponsors } = useStaticQuery<{ sponsors: { nodes: Sponsor[] } }>(
    graphql`
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
    `
  );

  return (
    <Box>
      <Container maxW='container.xl'>
        <Heading>Sponsors</Heading>

        {sponsorsGroups.map((groupName) => {
          const items = sponsors.nodes.filter(
            (node) => node.group === groupName
          );

          if (!items.length) {
            return null;
          }

          return (
            <Box key={groupName}>
              <Heading as='h3'>{groupName}</Heading>
              <OrderedList
                styleType='none'
                display='grid'
                gap='4'
                gridTemplateColumns={{
                  base: 'repeat(4, 1fr)',
                  md: 'repeat(6, 1fr)',
                  lg: 'repeat(12, 1fr)'
                }}
              >
                {items.map((node) => {
                  const image = getImage(node.image);

                  return (
                    <ListItem
                      key={node.id}
                      gridColumnEnd='span 3'
                      display='flex'
                      alignItems='center'
                      minH='20'
                    >
                      <ChLink as={ChLink} href={node.url}>
                        <VisuallyHidden as='h4'>{node.title}</VisuallyHidden>
                        {image && (
                          <GatsbyImage
                            image={image}
                            className={`sponsor-${node.slug}`}
                            alt={`Logo for ${node.title}`}
                          />
                        )}
                      </ChLink>
                    </ListItem>
                  );
                })}
              </OrderedList>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}
