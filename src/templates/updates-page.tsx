import * as React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';
import { Container } from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';

import { MDXProse } from '$components/mdx-prose';
import UpdatesHero from '$components/updates/updates-hero';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface UpdatesPageProps {
  updates: {
    title: string;
    description?: string;
    ago: string;
    editions?: { edition: { name: string } }[];
    cover?: { src: IGatsbyImageData };
    tags?: string[];
  };
}

export default function UpdatesPage(props: PageProps<UpdatesPageProps>) {
  const {
    data: {
      updates: { title, ago, description, editions, tags, cover }
    },
    children
  } = props;

  const allTags = [
    ...(editions?.map(({ edition }) => edition.name) || []),
    ...(tags || [])
  ];

  return (
    <PageLayout>
      <UpdatesHero
        title={title}
        lead={description}
        published={ago}
        tags={allTags}
        image={cover && getImage(cover.src)}
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
  query UpdatesPage($slug: String) {
    updates(slug: { eq: $slug }) {
      title
      description
      ago: date(fromNow: true)
      tags
      editions {
        edition {
          name
        }
      }
      cover {
        src {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;

export const Head = (props: HeadProps<UpdatesPageProps>) => (
  <Seo
    title={props.data.updates.title}
    description={props.data.updates.description}
  />
);
