import React from 'react';
import { PageProps, graphql, type HeadFC } from 'gatsby';
import { Flex, Text, Heading, List, ListItem } from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import { Fold, FoldProse } from '$components/fold';
import Seo from '$components/seo';
import SmartLink from '$components/smart-link';

interface UpdatesPageQuery {
  updates: {
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

export default function IndexPage(props: PageProps<UpdatesPageQuery>) {
  return (
    <PageLayout pageProps={props}>
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
              {props.data.updates.nodes.map((update) => (
                <ListItem key={update.id}>
                  <Heading size='xl'>
                    <SmartLink to={`/updates/${update.slug}`}>
                      {update.title}
                    </SmartLink>
                  </Heading>
                  <Text
                    as='time'
                    dateTime={update.date}
                    fontSize='sm'
                    fontStyle='initial'
                  >
                    {update.ago}
                  </Text>
                  <Text>{update.parent.excerpt}</Text>
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
    updates: allUpdates(
      filter: {
        editions: { elemMatch: { edition: { cId: { eq: $editionCId } } } }
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
