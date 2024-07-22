import React from 'react';
import { type HeadFC } from 'gatsby';

import PageLayout from '$components/page-layout';
import HomeHero from '$components/home/page-hero';
import Seo from '$components/seo';

export default function IndexPage() {
  return (
    <PageLayout>
      <HomeHero />
    </PageLayout>
  );
}

export const Head: HeadFC = () => <Seo title='Welcome' />;
