import React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import SmartLink from '$components/smart-link';

import HomeHero from './_hero';
import { Stack, Text } from '@chakra-ui/react';

const A = (props: React.ComponentProps<typeof SmartLink>) => (
  <SmartLink {...props} fontWeight='bold' color='primary.500' />
);

export default function IndexPage(props: PageProps<Queries.Home2027LxQuery>) {
  return (
    <PageLayout pageProps={props}>
      <HomeHero />
      <Stack maxW='4xl' mx='auto' px={4} py={12} fontSize='lg' gap={6}>
        <Text>
          We&apos;re excited to return to Lisbon for the next edition of
          SatSummit in March 2027. Following the incredible energy and community
          that came together for our first Lisbon event in 2024, SatSummit will
          once again bring together leaders across Earth observation, geospatial
          technology, science, design, and decision-making for conversations
          that look beyond the hype and focus on real-world applications and
          collaboration.
        </Text>
        <Text>
          Dates, venue, and programming details will be announced soon. Sign up
          for the newsletter and{' '}
          <A to='https://www.linkedin.com/showcase/satsummit/'>
            follow us on LinkedIn
          </A>{' '}
          to stay up to date on speakers, programming, and announcements.
        </Text>
        <Text>
          Interested in supporting the event? Sponsorship opportunities are now
          available — <A to='mailto:info@satsummit.io'>get in touch</A> to learn
          more about partnering with SatSummit Lisbon.
        </Text>
      </Stack>
    </PageLayout>
  );
}

export const pageQuery = graphql`
  query Home2027Lx($editionCId: String = "") {
    ...EditionContextualData
  }
`;

export const Head = (
  props: HeadProps<Queries.EditionContextualDataFragment>
) => <Seo title='Welcome' edition={props.data.edition} />;
