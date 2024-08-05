import * as React from 'react';
import { PageProps, graphql, type HeadFC } from 'gatsby';
import {
  Container,
  Heading,
  List,
  ListItem
} from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import SmartLink from '$components/smart-link';
import { PageHero } from '$components/page-hero';

interface PageQuery {
  allEdition: {
    nodes: { name: string; cId: string }[];
  };
  site: { siteMetadata: { eventDates: string[] } };
}
export default function IndexPage(props: PageProps<PageQuery>) {
  const { data } = props;

  return (
    <PageLayout>
      <PageHero title='Tickets' lead="Get'em while they're hot" />
      <Container
        py={{ base: '8', lg: '16' }}
        px={{ base: '4', md: '8' }}
        maxW='container.lg'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <Heading as='h2' size='2xl'>
          Tickets
        </Heading>
        <List>
          {data.allEdition.nodes.map((edition) => (
            <ListItem key={edition.cId}>
              <SmartLink to='/tickets/'>{edition.name}</SmartLink>
            </ListItem>
          ))}
        </List>
      </Container>
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

export const Head: HeadFC = () => <Seo title='Tickets' description='Get your SatSummit ticket.' />;
