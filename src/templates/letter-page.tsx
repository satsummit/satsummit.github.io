import * as React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';
import { Container } from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import PageHero from '$components/page-hero';
import Seo from '$components/seo';

import { MDXProse } from '$components/mdx-prose';

interface LetterPageProps {
  letter: Queries.Letter;
}

export default function LetterPage(props: PageProps<LetterPageProps>) {
  const {
    data: {
      letter: { title, lead }
    },
    children
  } = props;

  return (
    <PageLayout>
      <PageHero title={title!} lead={lead!} />
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
    letter(slug: { eq: $slug }) {
      title
      lead
    }
  }
`;

export const Head = (props: HeadProps<LetterPageProps>) => (
  <Seo title={props.data.letter.title!} description={props.data.letter.lead!} />
);
