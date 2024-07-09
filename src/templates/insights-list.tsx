import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import {
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import PageHero from '$components/page-hero';
import Seo from '$components/seo';

import SmartLink from '$components/smart-link';

interface InsightsHubDataProps {
  allInsights: {
    nodes: {
      title: string;
      ago: string;
      date: string;
      slug: string;
      id: string;
      parent: {
        excerpt: string;
      };
    }[];
  };
}

interface InsightsHubCtxProps {
  currentPage: number;
  numPages: number;
}

export default function InsightsPage(
  props: PageProps<InsightsHubDataProps, InsightsHubCtxProps>
) {
  const insights = props.data.allInsights.nodes;
  const { currentPage, numPages } = props.pageContext;

  return (
    <PageLayout>
      <PageHero title='Insights' lead='Insights on Satsummit' />
      <Container
        py={{ base: '8', lg: '16' }}
        px={{ base: '4', md: '8' }}
        maxW='container.md'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <List display='flex' gap={10} flexDir='column'>
          {insights.map((insight) => (
            <ListItem key={insight.id}>
              <Heading size='xl'>
                <SmartLink to={`/insights/${insight.slug}`}>
                  {insight.title}
                </SmartLink>
              </Heading>
              <Text
                as='time'
                dateTime={insight.date}
                fontSize='sm'
                fontStyle='initial'
              >
                {insight.ago}
              </Text>
              <Text>{insight.parent.excerpt}</Text>
            </ListItem>
          ))}
        </List>
        {numPages > 1 && (
          <Flex mt={8}>
            {currentPage > 1 && (
              <SmartLink
                to={`/insights/${currentPage - 1 === 1 ? '' : currentPage - 1}`}
              >
                Newer posts
              </SmartLink>
            )}
            {currentPage < numPages && (
              <SmartLink to={`/insights/${currentPage + 1}`} ml='auto'>
                Older posts
              </SmartLink>
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
