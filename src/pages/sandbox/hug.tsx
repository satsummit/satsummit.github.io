import * as React from 'react';
import { HeadFC } from 'gatsby';
import { Text } from '@chakra-ui/react';
import { Hug } from '@devseed-ui/hug-chakra';

import Seo from '$components/seo';
import PageLayout from '$components/page-layout';
import PageHero from '$components/page-hero';

import NotFoundPage from '../404';

export default function HugPage() {
  if (process.env.NODE_ENV !== 'development') return <NotFoundPage />;

  return (
    <PageLayout>
      <PageHero title='Testing HUG' lead='Human Universal Gridder' />
      <Hug height='15rem'>
        <Text
          py='5rem'
          overflow='hidden'
          align='center'
          bg='blanchedalmond'
          gridColumn='full-start/content-start'
        >
          Leading Column
        </Text>
        <Text
          py='5rem'
          overflow='hidden'
          align='center'
          bg='aliceblue'
          gridColumn='content-start/content-end'
        >
          Universal Gridder
        </Text>
        <Text
          py='5rem'
          overflow='hidden'
          align='center'
          bg='blanchedalmond'
          gridColumn='content-end/full-end'
        >
          Trailing Column
        </Text>
      </Hug>

      <Hug>
        <Hug
          bg='primary.200'
          hugGrid={{
            base: ['full-start', 'full-end'],
            md: ['content-2', 'content-4'],
            lg: ['content-2', 'content-5']
          }}
        >
          Subgrid 1
        </Hug>
        <Hug
          bg='secondary.200'
          hugGrid={{
            base: ['full-start', 'full-end'],
            // md is not defined, so base will be used until lg.
            lg: ['content-6', 'full-end']
          }}
        >
          Subgrid 2
        </Hug>
      </Hug>
    </PageLayout>
  );
}

export const Head: HeadFC = () => <Seo title='HUG' />;
