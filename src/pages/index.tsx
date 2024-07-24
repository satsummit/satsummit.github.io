import React from 'react';
import { graphql, PageProps, type HeadFC } from 'gatsby';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import {
  Button,
  Divider,
  Flex,
  Heading,
  List,
  ListItem
} from '@chakra-ui/react';

import { useFuturePastEditions } from '$utils/use-future-past-edition';
import { utcString2userTzDate } from '$utils/date';
import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import { EditionCard } from '$components/editions/edition-card';
import { Hug } from '@devseed-ui/hug-chakra';
import { ItemMarker } from '$components/item-marker';
import SmartLink from '$components/smart-link';
import { InsightCard } from '$components/insights/insight-card';

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
  allInsights: {
    nodes: {
      title: string;
      ago: string;
      date: string;
      slug: string;
      id: string;
      description: string;
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
    data: { allEdition, allInsights }
  } = props;

  const [future, past] = useFuturePastEditions<PageQueryEdition>(
    allEdition.nodes
  );

  return (
    <PageLayout>
      <Hug py={{ base: 8, md: 12 }}>
        <Flex
          justifyContent='space-between'
          gridColumn='content-start/content-end'
        >
          <Heading size='lg'>Upcoming</Heading>
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
          <Heading size='lg'>Insights</Heading>
          <Button
            as={SmartLink}
            to='/insights'
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
          {allInsights.nodes.map((insight) => (
            <ListItem key={insight.id}>
              <InsightCard
                slug={insight.slug}
                title={insight.title}
                date={insight.date || undefined}
                ago={insight.ago || undefined}
                description={insight.description || undefined}
                parent={insight.parent as { excerpt: string } | undefined}
                editions={insight.editions || []}
                cover={getImage(
                  insight.cover?.src as unknown as IGatsbyImageData
                )}
              />
            </ListItem>
          ))}
        </List>
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
                width: 700
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
    allInsights(
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
        cover {
          src {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                width: 200
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
