import * as React from 'react';
import { PageProps, graphql, type HeadFC } from 'gatsby';
import { Flex, Text, Heading, List, ListItem } from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import HomeHero from '$components/home/page-hero';
import { Fold, FoldProse } from '$components/fold';
import Seo from '$components/seo';
import SmartLink from '$components/smart-link';

interface InsightsPageQuery {
  insights: {
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

export default function IndexPage(props: PageProps<InsightsPageQuery>) {
  return (
    <PageLayout pageProps={props}>
      <HomeHero />
      <Flex
        flexFlow='column'
        gap='8'
        py='12'
        px='4'
        position='relative'
        zIndex='30'
      >
        <Fold>
          <FoldProse
            display='flex'
            flexFlow='column'
            gridColumn='1/-1'
            gap={{ base: '4', lg: '8' }}
          >
            <Heading size='2xl'>Lisbon edition</Heading>
            <Text>This is the lisbon edition of the SatSummit.</Text>
            <List display='flex' gap={10} flexDir='column'>
              {props.data.insights.nodes.map((insight) => (
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
          </FoldProse>
        </Fold>
      </Flex>
    </PageLayout>
  );
}

export const pageQuery = graphql`
  query ($editionCId: String = "") {
    ...EditionContextualData
    insights: allInsights(
      filter: {
        editions: { elemMatch: { edition: { cId: { eq: "2024-lisbon" } } } }
        title: { ne: "" }
        published: { eq: true }
      }
      sort: { date: DESC }
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

export const Head: HeadFC = () => <Seo title='Welcome' />;
