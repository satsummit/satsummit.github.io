import * as React from 'react';
import { PageProps, graphql, type HeadFC } from 'gatsby';
import { Box, Flex, Heading, List, ListItem } from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import HomeHero from '$components/home/page-hero';
import Seo from '$components/seo';
import SmartLink from '$components/smart-link';

interface PageQuery {
  allEdition: {
    nodes: { name: string; cId: string }[];
  };
  site: { siteMetadata: { eventDates: string[] } };
}
export default function IndexPage(props: PageProps<PageQuery>) {
  const { data } = props;
  console.log('🚀 ~ IndexPage ~ data:', data);

  return (
    <PageLayout>
      <HomeHero />
      <Flex
        flexFlow='column'
        gap='8'
        py='12'
        px='4'
        position='relative'
        zIndex='30'
      >
        <Box>
          <Heading size='2xl'>Editions</Heading>
          <List>
            {data.allEdition.nodes.map((edition) => (
              <ListItem key={edition.cId}>
                <SmartLink to={`/${edition.cId}`}>{edition.name}</SmartLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Flex>
    </PageLayout>
  );
}

export const pageQuery = graphql`
  query {
    allEdition(sort: { dates: DESC }) {
      nodes {
        name
        cId
      }
    }
  }
`;

export const Head: HeadFC = () => <Seo title='Welcome' />;
