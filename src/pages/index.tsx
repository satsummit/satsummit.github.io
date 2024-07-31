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
import { UpdatesCard } from '$components/updates/updates-card';
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
        lead='An event by Development Seed & DevGlobal. Since 2015.'
      />
      <Hug py={{ base: 8, md: 12 }}>
        <Flex
          justifyContent='space-between'
          gridColumn='content-start/content-end'
        >
          <Heading size='lg'>Editions</Heading>
          <Button
            as={SmartLink}
            to='/editions'
            variant='solid'
            colorScheme='primary'
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
        {!!allUpdates.nodes.length && (
          <>
            <Divider
              borderColor='base.200a'
              size='sm'
              orientation='horizontal'
              gridColumn='content-start/content-end'
            />
            <Flex
              justifyContent='space-between'
              gridColumn='content-start/content-end'
            >
              <Heading size='lg'>Updates</Heading>
              <Button
                as={SmartLink}
                to='/updates'
                variant='solid'
                colorScheme='primary'
              >
                View all
              </Button>
            </Flex>

            <List
              gridColumn='content-start/content-end'
              display='grid'
              gap={{ base: 4, md: 8 }}
              gridTemplateColumns={{
                base: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
              }}
            >
              {allUpdates.nodes.map((update) => (
                <ListItem key={update.id}>
                  <UpdatesCard
                    slug={update.slug}
                    title={update.title}
                    date={update.date || undefined}
                    ago={update.ago || undefined}
                    description={update.description || undefined}
                    parent={update.parent as { excerpt: string } | undefined}
                    editions={update.editions || []}
                    tags={update.tags || []}
                    cover={getImage(
                      update.cover?.src as unknown as IGatsbyImageData
                    )}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
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
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: BLURRED
              )
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
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: BLURRED
              )
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
