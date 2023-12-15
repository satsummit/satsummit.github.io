import * as React from 'react';
import type { HeadFC } from 'gatsby';
import { Button, Flex, Text, Heading } from '@chakra-ui/react';
import { StaticImage } from 'gatsby-plugin-image';
import {
  CollecticonArrowUpRight,
  CollecticonDownload2
} from '@devseed-ui/collecticons-chakra';

import PageLayout from '$components/page-layout';
import HomeHero from '$components/home/page-hero';
import { Fold, FoldMedia, FoldProse } from '$components/fold';
import Seo from '$components/seo';
import { Separator } from '$components/separator';

export default function IndexPage() {
  return (
    <PageLayout>
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
          <FoldMedia
            gridColumn={{ base: '1/-1', lg: '1/ span 6' }}
            alignSelf='end'
          >
            <StaticImage
              src='../images/home/home-vibe-2.jpg'
              alt='Four people sitting in line with the second one talking to a microphone'
            />
          </FoldMedia>
          <FoldProse
            display='flex'
            flexFlow='column'
            gap={{ base: '4', lg: '8' }}
            gridColumn={{ base: '1/-1', lg: '7/ span 6' }}
            mt={{ base: '0', lg: '-40' }}
          >
            <Heading size='3xl'>Save the Date</Heading>
            <Text>
              <strong>SatSummit</strong> convenes leaders in the satellite
              industry and experts in global development for 2 days of
              presentations and in-depth conversations on solving the
              world&apos;s most critical development challenges with satellite
              data.
            </Text>
            <Separator bg='base.200a' size='2' />
            <Heading size='3xl'>Stay Tuned</Heading>
            <Text>
              From climate change to population growth to natural resource
              availability, earth observation data offers insights into
              today&apos;s biggest global issues.
            </Text>
            <Text>
              Stay tuned for more information on <strong>SatSummit 2024</strong>!
            </Text>
            <Button
              as='a'
              href='https://23425005.hs-sites.com/satsummit-2024'
              colorScheme='primary'
              alignSelf='start'
              rightIcon={<CollecticonArrowUpRight />}
              size={{ base: 'md', lg: 'lg' }}
            >
              Get the newsletter
            </Button>
          </FoldProse>
        </Fold>
        <Fold>
          <FoldMedia
            gridColumn={{ base: '1/-1', md: 'span 4', lg: '1/ span 4' }}
          >
            <StaticImage
              src='../images/home/home-vibe-4.jpg'
              alt='Group of people happily talking to each other'
            />
          </FoldMedia>
          <FoldMedia
            gridColumn={{ base: '1/-1', md: 'span 4', lg: '5/ span 8' }}
          >
            <StaticImage
              src='../images/home/home-vibe-3.jpg'
              alt='Person on a stage talking to an audience seen from the audience perspective'
            />
          </FoldMedia>
        </Fold>
        <Fold>
          <FoldProse
            gridColumn={{ base: '1/-1', lg: '1/ span 6' }}
            display='flex'
            flexFlow='column'
            gap={{ base: '4', lg: '8' }}
          >
            <Heading size='3xl'>Become a Sponsor</Heading>
            <Text>
              We&apos;re excited to partner with thought and industry leaders in
              the satellite and development communities, and through their
              sponsorship and support of <strong>SatSummit</strong>, we are
              solving real-world and global development challenges.
            </Text>
            <Button
              as='a'
              colorScheme='primary'
              alignSelf='start'
              href='/2024-sponsor-kit.pdf'
              rightIcon={<CollecticonDownload2 />}
              size={{ base: 'md', lg: 'lg' }}
            >
              Download the kit
            </Button>
          </FoldProse>
          <FoldMedia gridColumn={{ base: '1/-1', lg: '7/ span 6' }}>
            <StaticImage
              src='../images/home/home-vibe-1.jpg'
              alt='Group of people grabbing snacks during a break'
            />
          </FoldMedia>
        </Fold>
      </Flex>
    </PageLayout>
  );
}

export const Head: HeadFC = () => <Seo title='Welcome' />;
