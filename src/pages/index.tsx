import React from 'react';
import { graphql, PageProps, type HeadFC } from 'gatsby';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Button, Flex, Heading, List, ListItem } from '@chakra-ui/react';

import { useFuturePastEditions } from '$utils/use-future-past-edition';
import { utcString2userTzDate } from '$utils/date';
import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import { EditionCard } from '$components/editions/edition-card';
import { Hug } from '@devseed-ui/hug-chakra';
import { ItemMarker } from '$components/item-marker';
import SmartLink from '$components/smart-link';
import { UpdatesFold } from '$components/updates-fold';
import { PageHero } from '$components/page-hero';

interface PageQueryEdition {
  name: string;
  cId: string;
  dates?: string[];
  card: {
    src: IGatsbyImageData;
  };
}

interface PageQuery {
  allEdition: {
    nodes: PageQueryEdition[];
  };
  allUpdates: {
    nodes: {
      title: string;
      ago: string;
      date: string;
      slug: string;
      id: string;
      description: string;
      tags: string[];
      cover: {
        src: IGatsbyImageData;
      };
      editions: {
        edition: {
          name: string;
        };
      }[];
      parent: {
        excerpt: string;
      };
    }[];
  };
}

export default function IndexPage(props: PageProps<PageQuery>) {
  const {
    data: { allEdition, allUpdates }
  } = props;

  const [future, past] = useFuturePastEditions<PageQueryEdition>(
    allEdition.nodes
  );

  return (
    <PageLayout>
      <PageHero
        title='Welcome to SatSummit'
        lead='Since 2015. An event by Development Seed & DevGlobal. '
      />
      <Hug py={{ base: 8, md: 12 }}>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          gridColumn='content-start/content-end'
        >
          <Heading size='2xl'>Editions</Heading>
          <Button
            as={SmartLink}
            to='/editions'
            variant='solid'
            colorScheme='primary'
            size={{ base: 'sm', lg: 'md' }}
          >
            View all
          </Button>
        </Flex>
        <List
          display='grid'
          gap={{ base: 4, md: 8 }}
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gridColumn='content-start/content-end'
        >
          {future.map((edition) => (
            <ListItem key={edition.cId} pos='relative'>
              <EditionCard
                title={edition.name}
                url={`/${edition.cId}`}
                dates={edition.dates?.map(utcString2userTzDate) || []}
                image={getImage(edition.card?.src)}
              />
              <ItemMarker pos='absolute' top='2rem' left='-1rem'>
                Coming up next
              </ItemMarker>
            </ListItem>
          ))}
          {past.map((edition) => (
            <ListItem key={edition.cId}>
              <EditionCard
                title={edition.name}
                url={`/${edition.cId}`}
                dates={edition.dates?.map(utcString2userTzDate) || []}
                image={getImage(edition.card?.src)}
              />
            </ListItem>
          ))}
        </List>
        <UpdatesFold updates={allUpdates.nodes} />
      </Hug>
    </PageLayout>
  );
}

export const pageQuery = graphql`
  query IndexPage {
    allEdition(sort: { dates: DESC }, limit: 2) {
      nodes {
        name
        cId
        dates
        card {
          src {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
      }
    }
    allUpdates(
      filter: { published: { eq: true } }
      sort: { date: DESC }
      limit: 3
    ) {
      nodes {
        title
        ago: date(fromNow: true)
        date
        slug
        id
        description
        tags
        cover {
          src {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
        editions {
          edition {
            name
          }
        }
        parent {
          ... on Mdx {
            excerpt
          }
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <Seo title='Welcome' />;
