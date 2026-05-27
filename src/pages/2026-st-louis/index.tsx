import React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';

import HomeHero from './_hero';

export default function IndexPage(props: PageProps<Queries.Home2026StLouisQuery>) {

  return (
    <PageLayout pageProps={props}>
      <HomeHero />
    </PageLayout>
  );
}

export const pageQuery = graphql`
  query Home2026StLouis($editionCId: String = "") {
    ...EditionContextualData
  }
`;

export const Head = (
  props: HeadProps<Queries.EditionContextualDataFragment>
) => <Seo title='Welcome' edition={props.data.edition} />;
