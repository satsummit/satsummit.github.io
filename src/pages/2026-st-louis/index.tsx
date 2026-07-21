import React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Button, Flex, Heading, Separator, Text } from '@chakra-ui/react';
import { CollecticonDownload2 } from '@devseed-ui/collecticons-chakra';
import { Hug } from '@devseed-ui/hug-chakra';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import { Fold, FoldMedia, FoldProse } from '$components/fold';
import { ChakraFade } from '$components/reveal';
import { UpdatesFold } from '$components/updates-fold';

import HomeHero from './_hero';

export default function IndexPage(
  props: PageProps<Queries.Home2026StLouisQuery>
) {
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
            <FoldMedia borderRadius='xl' overflow='hidden'>
              <StaticImage
                src='./home-vibe-1.png'
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
              mt={0}
            >
              <Heading size='2xl'>Save the date</Heading>
              <Text>
                <strong>SatSummit</strong> convenes leaders in the satellite
                industry and experts in global development for 2 days of
                presentations and in-depth conversations on solving the
                world&apos;s most critical development challenges with satellite
                data.
              </Text>
              <Separator borderColor='basi.200a' size='md' />
              <Heading size='2xl'>Stay Tuned</Heading>
              <Text>
                From climate change to population growth to natural resource
                availability, earth observation data offers insights into
                today&apos;s biggest global issues.
              </Text>
              <Text>
                Subscribe to the newsletter for more information on the{' '}
                <strong>SatSummit 2026</strong>!
              </Text>
              <Button
                as='a'
                // @ts-expect-error types from "a" not propagating properly
                href='#newsletter-fold'
                variant='solid'
                colorPalette='primary'
                alignSelf='start'
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
            <FoldMedia borderRadius='xl' overflow='hidden'>
              <StaticImage
                src='./home-vibe-2.png'
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
            <FoldMedia borderRadius='xl' overflow='hidden'>
              <StaticImage
                src='./home-vibe-3.png'
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
              mt={0}
            >
              <Heading size='2xl'>Become a sponsor</Heading>
              <Text>
                We&apos;re excited to partner with thought and industry leaders
                in the satellite and development communities, and through their
                sponsorship and support of <strong>SatSummit</strong>, we are
                solving real-world and global development challenges.
              </Text>
              <Button
                as='a'
                // @ts-expect-error types from "a" not propagating properly
                href='https://satsummit.io/2026-st-louis-sponsor-prospectus.pdf'
                variant='solid'
                colorPalette='primary'
                alignSelf='start'
                size={{ base: 'md', lg: 'lg' }}
              >
                Download the kit <CollecticonDownload2 />
              </Button>
            </FoldProse>
          </ChakraFade>
          <ChakraFade
            direction='up'
            triggerOnce
            gridColumn={{ base: '1/-1', lg: '7/ span 6' }}
            alignSelf='end'
            delay={200}
          >
            <FoldMedia borderRadius='xl' overflow='hidden'>
              <StaticImage
                src='./home-vibe-4.png'
                alt='Several people getting food at a conference buffet line'
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
  query Home2026StLouis($editionCId: String = "") {
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

export const Head = (
  props: HeadProps<Queries.EditionContextualDataFragment>
) => <Seo title='Welcome' edition={props.data.edition} />;
