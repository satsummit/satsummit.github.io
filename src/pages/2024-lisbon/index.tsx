import React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';
import { getImage, IGatsbyImageData, StaticImage } from 'gatsby-plugin-image';
import { Flex, Text, Heading, Button, Box } from '@chakra-ui/react';
import { Hug } from '@devseed-ui/hug-chakra';

import PageLayout from '$components/page-layout';
import { FoldMedia } from '$components/fold';
import Seo from '$components/seo';
import { ChakraFade } from '$components/reveal';

import HomeHero from './_hero';
import { UpdatesCard } from '$components/updates/updates-card';
import { ItemMarker } from '$components/item-marker';
import SmartLink from '$components/smart-link';

const hugFull = 'content-start / content-end';

export default function IndexPage(props: PageProps<Queries.Home2024LxQuery>) {
  const [update1, update2, update3] = props.data.featuredEditionUpdates || [];

  return (
    <PageLayout pageProps={props}>
      <HomeHero />

      <Hug mb={12}>
        <ChakraFade
          direction='up'
          triggerOnce
          gridColumn={{
            base: hugFull,
            lg: update1 ? 'content-2 / content-6' : 'content-start / content-6'
          }}
          alignSelf='end'
          delay={200}
        >
          {update1 ? (
            <Box>
              <UpdatesCard
                slug={update1.slug}
                title={update1.title}
                date={update1.date || undefined}
                ago={update1.ago || undefined}
                description={update1.description || undefined}
                parent={update1.parent as { excerpt: string } | undefined}
                editions={update1.editions || []}
                tags={update1.tags || []}
                cover={getImage(
                  update1.cover?.src as unknown as IGatsbyImageData
                )}
              />
              <ItemMarker pos='absolute' top='2rem' left='-1rem'>
                Update
              </ItemMarker>
            </Box>
          ) : (
            <FoldMedia>
              <StaticImage
                src='../../images/home/2024-lisbon--home-vibe-1.jpg'
                alt='Speaker on stage at the Washington DC 2024 edition.'
              />
            </FoldMedia>
          )}
        </ChakraFade>
        <ChakraFade
          direction='up'
          triggerOnce
          gridColumn={{
            base: hugFull,
            lg: 'content-6 / content-11'
          }}
          position='relative'
          zIndex={100}
        >
          <Flex
            flexFlow='column'
            gap={{ base: '4', lg: '8' }}
            mt={{ base: '0', lg: '-5rem' }}
          >
            <Heading size='2xl'>About</Heading>
            <Text>
              <strong>SatSummit</strong> is heading to{' '}
              <strong>Lisbon, Portugal</strong> to convene leaders in the
              satellite industry and experts in global development for 2 days of
              presentations and in-depth conversations on solving the
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
          </Flex>
        </ChakraFade>

        <ChakraFade
          direction='up'
          triggerOnce
          gridColumn={{
            base: hugFull,
            md: 'content-start / content-5'
          }}
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
          gridColumn={{
            base: hugFull,
            md: 'content-5 / content-end',
            lg: 'content-5 / content-end'
          }}
          delay={200}
        >
          <FoldMedia>
            <StaticImage
              src='../../images/home/home-vibe-3.jpg'
              alt='Person on a stage talking to an audience seen from the audience perspective'
            />
          </FoldMedia>
        </ChakraFade>

        {update2 && (
          <>
            <ChakraFade
              direction='up'
              triggerOnce
              gridColumn={{
                base: hugFull,
                md: 'content-start / content-5',
                lg: 'content-start / content-7'
              }}
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
              gridColumn={{
                base: hugFull,
                md: 'content-5 / content-end',
                lg: 'content-7 / content-11'
              }}
              alignSelf='end'
              delay={200}
            >
              <Box>
                <UpdatesCard
                  slug={update2.slug}
                  title={update2.title}
                  date={update2.date || undefined}
                  ago={update2.ago || undefined}
                  description={update2.description || undefined}
                  parent={update2.parent as { excerpt: string } | undefined}
                  editions={update2.editions || []}
                  tags={update2.tags || []}
                  cover={getImage(
                    update2.cover?.src as unknown as IGatsbyImageData
                  )}
                />
                <ItemMarker pos='absolute' top='2rem' left='-1rem'>
                  Update
                </ItemMarker>
              </Box>
            </ChakraFade>
          </>
        )}

        {update3 && (
          <ChakraFade
            direction='up'
            triggerOnce
            gridColumn={{
              base: hugFull,
              lg: 'content-2 / content-6'
            }}
            alignSelf='end'
            delay={200}
          >
            <Box>
              <UpdatesCard
                slug={update3.slug}
                title={update3.title}
                date={update3.date || undefined}
                ago={update3.ago || undefined}
                description={update3.description || undefined}
                parent={update3.parent as { excerpt: string } | undefined}
                editions={update3.editions || []}
                tags={update3.tags || []}
                cover={getImage(
                  update3.cover?.src as unknown as IGatsbyImageData
                )}
              />
              <ItemMarker pos='absolute' top='2rem' left='-1rem'>
                Update
              </ItemMarker>
            </Box>
          </ChakraFade>
        )}
        <ChakraFade
          direction='up'
          triggerOnce
          gridColumn={{
            base: hugFull,
            lg: update3 ? 'content-6 / content-11' : 'content-4 / content-10'
          }}
          position='relative'
          zIndex={100}
        >
          <Flex flexFlow='column' gap={{ base: '4', lg: '8' }}>
            <Heading size='2xl'>In the loop</Heading>
            <Text>
              Keep up with everything that happens around{' '}
              <strong>SatSummit</strong>.
            </Text>
            <Button
              as={SmartLink}
              to='/updates'
              colorScheme='primary'
              alignSelf='start'
              size={{ base: 'md', lg: 'lg' }}
            >
              View updates
            </Button>
          </Flex>
        </ChakraFade>
      </Hug>
    </PageLayout>
  );
}

export const pageQuery = graphql`
  query Home2024Lx($editionCId: String = "") {
    ...EditionContextualData
    featuredEditionUpdates(edition: $editionCId, limit: 3) {
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
`;

export const Head = (
  props: HeadProps<Queries.EditionContextualDataFragment>
) => <Seo title='Welcome' edition={props.data.edition} />;
