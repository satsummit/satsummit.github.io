import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Tag,
  Text
} from '@chakra-ui/react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { CollecticonLayoutGrid3x3 } from '@devseed-ui/collecticons-chakra';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import { PageHero } from '$components/page-hero';

import SmartLink from '$components/smart-link';

interface InsightsHubCtxProps {
  currentPage: number;
  numPages: number;
}

export default function InsightsPage(
  props: PageProps<Queries.InsightsListQuery, InsightsHubCtxProps>
) {
  const insights = props.data.allInsights.nodes;
  const { currentPage, numPages } = props.pageContext;

  return (
    <PageLayout>
      <PageHero title='Insights' lead='Insights on Satsummit' />
      <Container
        py={{ base: '8', lg: '16' }}
        px={{ base: '4', md: '8' }}
        maxW='container.xl'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <List
          display='grid'
          gap={10}
          gridTemplateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
        >
          {insights.map((insight) => (
            <ListItem key={insight.id}>
              <InsightCard {...insight} />
            </ListItem>
          ))}
        </List>
        {numPages > 1 && (
          <Flex mt={8}>
            {currentPage > 1 && (
              <Button
                as={SmartLink}
                noLinkStyles
                to={`/insights/${currentPage - 1 === 1 ? '' : currentPage - 1}`}
                variant='solid'
                colorScheme='primary'
                size={{ base: 'md', md: 'lg' }}
                leftIcon={<CollecticonLayoutGrid3x3 />}
              >
                Newer posts
              </Button>
            )}
            {currentPage < numPages && (
              <Button
                as={SmartLink}
                noLinkStyles
                to={`/insights/${currentPage + 1}`}
                ml='auto'
                variant='solid'
                colorScheme='primary'
                size={{ base: 'md', md: 'lg' }}
                leftIcon={<CollecticonLayoutGrid3x3 />}
              >
                Older posts
              </Button>
            )}
          </Flex>
        )}
      </Container>
    </PageLayout>
  );
}

function InsightCard(
  props: Queries.InsightsListQuery['allInsights']['nodes'][number]
) {
  const { slug, cover, title, date, ago, description, parent, editions } =
    props;

  const gatsbyImage = getImage(cover?.src as unknown as IGatsbyImageData);

  return (
    <SmartLink
      to={`/insights/${slug}`}
      borderRadius='sm'
      display='flex'
      flexDir='column'
      h='100%'
      color='base.500'
      bg='base.50'
      _hover={{
        textDecoration: 'none',
        transform: 'translateY(-2px)'
      }}
      p={{ base: 4, md: 8 }}
      gap={4}
    >
      {gatsbyImage && (
        <Box
          mx={{ base: -4, md: -8 }}
          mt={{ base: -4, md: -8 }}
          overflow='hidden'
          borderRadius='sm'
        >
          <GatsbyImage image={gatsbyImage} alt='Post decorative cover' />
        </Box>
      )}
      <Box>
        <Heading size='xl'>{title}</Heading>
        <Text
          as='time'
          dateTime={date || undefined}
          fontSize='sm'
          fontStyle='initial'
        >
          {ago}
        </Text>
      </Box>
      <Text>
        {description || (parent as { excerpt: string } | undefined)?.excerpt}
      </Text>

      {editions && (
        <Flex gap={2} mt='auto'>
          {editions.map((edition) => (
            <Tag key={edition.edition.name} variant='satsummit-dark'>
              {edition.edition.name}
            </Tag>
          ))}
        </Flex>
      )}
    </SmartLink>
  );
}

export const query = graphql`
  query InsightsList($skip: Int!, $limit: Int!) {
    allInsights(
      filter: { published: { eq: true } }
      sort: { date: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        title
        ago: date(fromNow: true)
        date
        slug
        id
        description
        cover {
          src {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                width: 200
                placeholder: BLURRED
              )
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

export const Head = () => (
  <Seo title='Insights' description='Insights on Satsummit' />
);
