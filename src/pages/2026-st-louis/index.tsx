import React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';

import HomeHero from './_hero';
import { Stack, Text } from '@chakra-ui/react';
import SmartLink from '$components/smart-link';

const A = (props: React.ComponentProps<typeof SmartLink>) => (
  <SmartLink {...props} fontWeight='bold' color='primary.500' />
);

export default function IndexPage(
  props: PageProps<Queries.Home2026StLouisQuery>
) {
  return (
    <PageLayout pageProps={props}>
      <HomeHero />
      <Stack maxW='4xl' mx='auto' px={4} py={12} fontSize='lg' gap={6}>
        <Text>
          Join us in St. Louis this November 18-19 for the next edition of
          SatSummit — hosted by{' '}
          <A to='https://www.commonspace.world/'>Common Space</A>,{' '}
          <A to='https://taylorgeospatial.org/'>Taylor Geospatial</A>, and{' '}
          <A to='https://www.developmentseed.org/'>Development Seed</A>. Known
          for bringing together leaders across Earth observation, geospatial
          technology, science, design, and decision-making, SatSummit has built
          a reputation for thoughtful conversations, ambitious ideas, and a
          community that cares deeply about the future of our planet
        </Text>
        <Text>
          We&apos;re excited to bring the event to St. Louis for the first time
          and can&apos;t wait to share more soon. Sign up for the newsletter and{' '}
          <A to='https://www.linkedin.com/showcase/satsummit/'>
            follow us on LinkedIn
          </A>{' '}
          to stay up to date on speakers, programming, and announcements.
        </Text>
        <Text>
          Interested in supporting the event? Sponsorship opportunities are now
          available — Check out the <A to='/2026-st-louis-sponsor-prospectus.pdf'>
            prospectus
          </A> and{' '}
          <A to='mailto:info@satsummit.io'>get in touch</A> to learn more about
          partnering with SatSummit St. Louis.
        </Text>
      </Stack>
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
