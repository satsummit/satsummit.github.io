import * as React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';
import { Container } from '@chakra-ui/react';

import PageLayout from '../components/page-layout';
import PageHero from '../components/page-hero';
import { Letter } from '../types';

export default function LetterPage(props: PageProps) {
  const { children } = props;

  return (
    <PageLayout>
      <PageHero />
      <Container>{children}</Container>
    </PageLayout>
  );
}

export const query = graphql`
  query ($id: String) {
    letter(id: { eq: $id }) {
      title
    }
  }
`;

export const Head = (props: HeadProps<{ letter: Letter }>) => (
  <title>{props.data.letter.title}</title>
);
