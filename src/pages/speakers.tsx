import React, { useMemo } from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  VisuallyHidden
} from '@chakra-ui/react';
import { Hug } from '@devseed-ui/hug-chakra';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import SmartLink from '$components/smart-link';
import { ChakraFade } from '$components/reveal';

interface SpeakersPageQuery {
  allPeople: {
    nodes: Queries.People[];
  };
}

export default function SpeakersPage(props: PageProps<SpeakersPageQuery>) {
  const { allPeople } = props.data;

  const { main, other } = useMemo(
    () =>
      allPeople.nodes.reduce<{
        main: Queries.People[];
        other: Queries.People[];
      }>(
        (acc, node) => {
          if (node.group === 'main') {
            acc.main.push(node);
          } else {
            acc.other.push(node);
          }
          return acc;
        },
        { main: [], other: [] }
      ),
    [allPeople.nodes]
  );

  return (
    <PageLayout>
      <Box
        background='primary.500'
        px={{ base: '4', md: '8' }}
        py={{ base: '8', lg: '16' }}
      >
        <Container
          maxW='container.xl'
          color='white'
          display='flex'
          flexFlow={{ base: 'column', md: 'row' }}
          gap={8}
          p='0'
        >
          <Flex flexFlow='column' gap='4'>
            <Heading size='3xl' as='h1'>
              Speakers
            </Heading>
            <Text
              textStyle={{ base: 'lead.md', md: 'lead.lg' }}
              maxW='container.sm'
            >
              All the wonderful people presenting at SatSummit.
            </Text>
          </Flex>
        </Container>
      </Box>

      <Hug py={16}>
        <Box gridColumn='content-start / content-end'>
          <VisuallyHidden>
            <Heading size='xl'>Main speakers</Heading>
          </VisuallyHidden>
          <List
            display='grid'
            gap={{ base: 4, md: 8 }}
            gridTemplateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)'
            }}
          >
            <ChakraFade
              direction='up'
              triggerOnce
              duration={500}
              delay={100}
            >
              {main.map((speaker) => (
                <ListItem key={speaker.id} h='100%'>
                  <Box
                    as='article'
                    bg='base.50'
                    h='100%'
                    borderRadius='sm'
                    overflow='hidden'
                  >
                    <SmartLink
                      to={`/speakers/${speaker.slug}`}
                      display='flex'
                      flexFlow='column nowrap'
                      height='100%'
                      transition='opacity 0.24s ease-in-out'
                      color='inherit'
                      _hover={{
                        textDecoration: 'none',
                        opacity: 0.64
                      }}
                    >
                      <Flex
                        as='header'
                        flexFlow='column nowrap'
                        p={{ base: 4, md: 8 }}
                      >
                        <Heading as='h3' size='xl'>
                          {speaker.title}
                        </Heading>
                        <Text fontSize={{ base: 'sm', md: 'md' }}>
                          {speaker.role} at {speaker.company}
                        </Text>
                      </Flex>
                      <Box
                        as={GatsbyImage}
                        image={
                          getImage(speaker.avatar as unknown as ImageDataLike)!
                        }
                        alt={`Picture of ${speaker.title}`}
                        objectFit='contain'
                        borderRadius='sm'
                        overflow='hidden'
                        order={-1}
                      />
                    </SmartLink>
                  </Box>
                </ListItem>
              ))}
            </ChakraFade>
          </List>
        </Box>

        {!!other.length && (
          <>
            <Divider
              gridColumn='content-start / content-end'
              size='md'
              borderColor='base.200a'
            />
            <Flex
              gridColumn='content-start / content-end'
              gap={{ base: 4, md: 8 }}
              direction='column'
            >
              <Heading size='3xl'>Other speakers include</Heading>
              <List
                display='grid'
                gap={{ base: 4, md: 8 }}
                gridTemplateColumns={{
                  base: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  xl: 'repeat(4, 1fr)'
                }}
              >
                <ChakraFade
                  cascade
                  direction='up'
                  triggerOnce
                  duration={500}
                  damping={0.2}
                >
                  {other.map((speaker) => (
                    <ListItem key={speaker.id}>
                      <Box as='article'>
                        <Flex
                          as='header'
                          flexFlow='column nowrap'
                          gap={{ base: 1, md: 2 }}
                        >
                          <Heading as='h3' size='xl'>
                            {speaker.title}
                          </Heading>
                          <Text fontSize={{ base: 'sm', md: 'md' }}>
                            {speaker.role} at {speaker.company}
                          </Text>
                        </Flex>
                      </Box>
                    </ListItem>
                  ))}
                </ChakraFade>
              </List>
            </Flex>
          </>
        )}
      </Hug>
    </PageLayout>
  );
}

export const query = graphql`
  query {
    allPeople(
      filter: { published: { eq: true } }
      sort: [{ weight: DESC }, { slug: ASC }]
    ) {
      nodes {
        id
        slug
        title
        avatar {
          childImageSharp {
            gatsbyImageData(width: 640, height: 640, placeholder: BLURRED)
          }
        }
        role
        company
        group
      }
    }
  }
`;

export const Head: HeadFC = () => (
  <Seo
    title='Speakers'
    description='All the wonderful people presenting at SatSummit.'
  />
);
