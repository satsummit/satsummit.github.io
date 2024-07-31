import React from 'react';
import { graphql, type HeadFC, type PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Flex, Text, Heading, Button, Divider } from '@chakra-ui/react';
import {
  CollecticonArrowUpRight,
  CollecticonDownload2
} from '@devseed-ui/collecticons-chakra';
import { Hug } from '@devseed-ui/hug-chakra';

import PageLayout from '$components/page-layout';
import { Fold, FoldMedia, FoldProse } from '$components/fold';
import Seo from '$components/seo';
import { ChakraFade } from '$components/reveal';

import HomeHero from './_hero';
import { UpdatesFold } from '$components/updates-fold';

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
          <ChakraFade
            direction='up'
            triggerOnce
            gridColumn={{ base: '1/-1', lg: '1/ span 6' }}
            alignSelf='end'
            delay={200}
          >
            <FoldMedia>
              <StaticImage
                src='../../images/home/home-vibe-2.jpg'
                alt='Four people sitting in line with the second one talking to a microphone'
              />
            </FoldMedia>
          </ChakraFade>
          <ChakraFade
            direction='up'
            triggerOnce
            gridColumn={{ base: '1/-1', lg: '7/ span 6' }}
          >
            <FoldProse
              display='flex'
              flexFlow='column'
              gap={{ base: '4', lg: '8' }}
              mt={{ base: '0', lg: '-40' }}
            >
              <Heading size='2xl'>Save the Date</Heading>
              <Text>
                <strong>SatSummit</strong> convenes leaders in the satellite
                industry and experts in global development for 2 days of
                presentations and in-depth conversations on solving the
                world&apos;s most critical development challenges with satellite
                data.
              </Text>
              <Divider borderColor='base.200a' size='md' />
              <Heading size='2xl'>Stay Tuned</Heading>
              <Text>
                From climate change to population growth to natural resource
                availability, earth observation data offers insights into
                today&apos;s biggest global issues.
              </Text>
              <Text>
                Stay tuned for more information on{' '}
                <strong>SatSummit 2024</strong>!
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
          </ChakraFade>
        </Fold>
        <Fold>
          <ChakraFade
            direction='up'
            triggerOnce
            gridColumn={{ base: '1/-1', md: 'span 4', lg: '1/ span 4' }}
          >
            <FoldMedia>
              <StaticImage
                src='../../images/home/home-vibe-4.jpg'
                alt='Group of people happily talking to each other'
              />
            </FoldMedia>
          </ChakraFade>
          <ChakraFade
            direction='up'
            triggerOnce
            gridColumn={{ base: '1/-1', md: 'span 4', lg: '5/ span 8' }}
            delay={200}
          >
            <FoldMedia>
              <StaticImage
                src='../../images/home/home-vibe-3.jpg'
                alt='Person on a stage talking to an audience seen from the audience perspective'
              />
            </FoldMedia>
          </ChakraFade>
        </Fold>
        <Fold>
          <ChakraFade
            direction='up'
            triggerOnce
            gridColumn={{ base: '1/-1', lg: '1/ span 6' }}
          >
            <FoldProse
              display='flex'
              flexFlow='column'
              gap={{ base: '4', lg: '8' }}
            >
              <Heading size='2xl'>Become a Sponsor</Heading>
              <Text>
                We&apos;re excited to partner with thought and industry leaders
                in the satellite and development communities, and through their
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
          </ChakraFade>
          <ChakraFade
            direction='up'
            triggerOnce
            gridColumn={{ base: '1/-1', lg: '7/ span 6' }}
            delay={200}
          >
            <FoldMedia>
              <StaticImage
                src='../../images/home/home-vibe-1.jpg'
                alt='Group of people grabbing snacks during a break'
              />
            </FoldMedia>
          </ChakraFade>
        </Fold>
        <Hug>
          {/* @ts-expect-error allUpdates exists */}
          <UpdatesFold updates={props.data.allUpdates.nodes} />
        </Hug>
      </Flex>
    </PageLayout>
  );
}

export const pageQuery = graphql`
  query ($editionCId: String = "") {
    ...EditionContextualData
    allUpdates(
      filter: {
        published: { eq: true }
        editions: { elemMatch: { edition: { cId: { eq: $editionCId } } } }
      }
      sort: { date: DESC }
      limit: 3
    ) {
      nodes {
        title
        ago: date(fromNow: true)
        date
        slug
        id
        description
        tags
        cover {
          src {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
        editions {
          edition {
            name
          }
        }
        parent {
          ... on Mdx {
            excerpt
          }
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <Seo title='Welcome' />;
