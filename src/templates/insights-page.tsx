import * as React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';
import { Container } from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import PageHero from '$components/page-hero';
import Seo from '$components/seo';

import { MDXProse } from '$components/mdx-prose';

interface InsightsPageProps {
  insights: {
    title: string;
    description: string;
    ago: string;
  };
}

export default function InsightsPage(props: PageProps<InsightsPageProps>) {
  const {
    data: {
      insights: { title, ago }
    },
    children
  } = props;

  return (
    <PageLayout>
      <PageHero
        title={title}
        lead={`Published ${ago}`}
        parent={{
          title: 'Insights',
          url: '/insights'
        }}
      />
      <Container
        py={{ base: '8', lg: '16' }}
        px={{ base: '4', md: '8' }}
        maxW='container.lg'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <MDXProse>{children}</MDXProse>
      </Container>
    </PageLayout>
  );
}

export const query = graphql`
  query ($slug: String) {
    insights(slug: { eq: $slug }) {
      title
      description
      ago: date(fromNow: true)
    }
  }
`;

export const Head = (props: HeadProps<InsightsPageProps>) => (
  <Seo
    title={props.data.insights.title}
    description={props.data.insights.description}
  />
);
