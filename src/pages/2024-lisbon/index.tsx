import React from 'react';
import { graphql, type HeadFC, type PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Flex, Text, Heading, Button } from '@chakra-ui/react';
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
                src='../../images/home/2024-lisbon--home-vibe-1.jpg'
                alt='Speaker on stage at the Washington DC 2024 edition.'
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
              <Heading size='2xl'>About</Heading>
              <Text>
                <strong>SatSummit</strong> is heading to{' '}
                <strong>Lisbon, Portugal</strong> to convene leaders in the
                satellite industry and experts in global development for 2 days
                of presentations and in-depth conversations on solving the
                world&apos;s most critical development challenges with satellite
                data.
              </Text>
              <Text>
                From climate change to population growth to natural resource
                availability, earth observation data offers insights into
                today&apos;s biggest global issues.
              </Text>
              <Text>
                Stay tuned for more information on the{' '}
                <strong>Lisbon &apos;24 edition</strong>!
              </Text>
              <Button
                as='a'
                href='#newsletter-fold'
                colorScheme='primary'
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
            <FoldMedia>
              <StaticImage
                src='../../images/home/2024-lisbon--home-vibe-2.jpg'
                alt='NOVA SBE building in Carcavelos, Lisbon.'
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
