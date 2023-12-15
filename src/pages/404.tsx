import * as React from 'react';
import { HeadFC } from 'gatsby';
import { Container, Text } from '@chakra-ui/react';

import Seo from '$components/seo';
import PageLayout from '$components/page-layout';
import PageHero from '$components/page-hero';
import SmartLink from '$components/smart-link';

export default function NotFoundPage() {
  return (
    <PageLayout>
      <PageHero title='Page not found' lead="That's a 404 error." />
      <Container
        py={{ base: '8', lg: '16' }}
        px={{ base: '4', md: '8' }}
        maxW='container.lg'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <Text fontSize={{ base: 'sm', lg: 'md' }}>
          We were not able to find the page you are looking for. <br />It may have
          been archived or removed.
        </Text>
        <Text fontSize={{ base: 'sm', lg: 'md' }}>
          If you think this page should be here let us know via{' '}
          <SmartLink to='mailto:info@satsummit.io' title='Send us an email'>
            <strong>info@satsummit.io</strong>
          </SmartLink>
          .
        </Text>
      </Container>
    </PageLayout>
  );
}

export const Head: HeadFC = () => <Seo title='Not Found' />;
