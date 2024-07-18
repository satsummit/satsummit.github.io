import * as React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';
import { Container } from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';

import { MDXProse } from '$components/mdx-prose';
import InsightsHero from '$components/insights/insights-hero';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface InsightsPageProps {
  insights: {
    title: string;
    description?: string;
    ago: string;
    editions?: { edition: { name: string } }[];
    cover?: { url: IGatsbyImageData };
  };
}

export default function InsightsPage(props: PageProps<InsightsPageProps>) {
  const {
    data: {
      insights: { title, ago, description, editions, cover }
    },
    children
  } = props;

  return (
    <PageLayout>
      <InsightsHero
        title={title}
        lead={description}
        published={ago}
        tags={editions?.map(({ edition }) => edition.name) || []}
        image={cover && getImage(cover.url)}
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
  query InsightPage($slug: String) {
    insights(slug: { eq: $slug }) {
      title
      description
      ago: date(fromNow: true)
      editions {
        edition {
          name
        }
      }
      cover {
        url {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              width: 200
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`;

export const Head = (props: HeadProps<InsightsPageProps>) => (
  <Seo
    title={props.data.insights.title}
    description={props.data.insights.description}
  />
);
