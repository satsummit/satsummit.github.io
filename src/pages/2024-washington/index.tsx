import React from 'react';
import { graphql, type HeadFC, type PageProps } from 'gatsby';
import { Flex, Text, Heading } from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import HomeHero from '$components/home/page-hero';
import { Fold, FoldProse } from '$components/fold';
import Seo from '$components/seo';

export default function IndexPage(props: PageProps) {
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
            <Heading size='2xl'>Washington edition</Heading>
            <Text>This is the washington edition of the SatSummit.</Text>
          </FoldProse>
        </Fold>
      </Flex>
    </PageLayout>
  );
}

export const pageQuery = graphql`
  query ($editionCId: String = "") {
    ...EditionContextualData
  }
`;

export const Head: HeadFC = () => <Seo title='Welcome' />;
