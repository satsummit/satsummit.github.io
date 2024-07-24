import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import {
  Button,
  Container,
  Flex,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';
import { CollecticonLayoutGrid3x3 } from '@devseed-ui/collecticons-chakra';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import { PageHero } from '$components/page-hero';
import SmartLink from '$components/smart-link';
import { InsightCard } from '$components/insights/insight-card';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface InsightsHubCtxProps {
  currentPage: number;
  numPages: number;
}

export default function InsightsPage(
  props: PageProps<Queries.InsightsListQuery, InsightsHubCtxProps>
) {
  const insights = props.data.allInsights.nodes;
  const { currentPage, numPages } = props.pageContext;

  return (
    <PageLayout>
      <PageHero title='Insights' lead='Insights on Satsummit' />
      <Container
        py={{ base: '8', lg: '16' }}
        px={{ base: '4', md: '8' }}
        maxW='container.xl'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        {insights.length ? (
          <List
            display='grid'
            gap={{ base: 4, md: 8 }}
            gridTemplateColumns={{
              base: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
          >
            {insights.map((insight) => (
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
        ) : (
          <Text>No insights found.</Text>
        )}
        {numPages > 1 && (
          <Flex mt={8}>
            {currentPage > 1 && (
              <Button
                as={SmartLink}
                noLinkStyles
                to={`/insights/${currentPage - 1 === 1 ? '' : currentPage - 1}`}
                variant='solid'
                colorScheme='primary'
                size={{ base: 'md', md: 'lg' }}
                leftIcon={<CollecticonLayoutGrid3x3 />}
              >
                Newer posts
              </Button>
            )}
            {currentPage < numPages && (
              <Button
                as={SmartLink}
                noLinkStyles
                to={`/insights/${currentPage + 1}`}
                ml='auto'
                variant='solid'
                colorScheme='primary'
                size={{ base: 'md', md: 'lg' }}
                leftIcon={<CollecticonLayoutGrid3x3 />}
              >
                Older posts
              </Button>
            )}
          </Flex>
        )}
      </Container>
    </PageLayout>
  );
}

export const query = graphql`
  query InsightsList($skip: Int!, $limit: Int!) {
    allInsights(
      filter: { published: { eq: true } }
      sort: { date: DESC }
      limit: $limit
      skip: $skip
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

export const Head = () => (
  <Seo title='Insights' description='Insights on Satsummit' />
);
