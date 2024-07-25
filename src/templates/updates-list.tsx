import * as React from 'react';
import { graphql, navigate, type PageProps } from 'gatsby';
import {
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Select,
  Text
} from '@chakra-ui/react';
import { CollecticonLayoutGrid3x3 } from '@devseed-ui/collecticons-chakra';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import { PageHeroFoundation, PageHeroHeadline } from '$components/page-hero';
import SmartLink from '$components/smart-link';
import { UpdatesCard } from '$components/updates/updates-card';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface UpdatesHubCtxProps {
  currentPage: number;
  numPages: number;
  currentTag?: string;
  tagList: { id: string; name: string }[];
}

interface UpdatesPageQuery {
  updatesByTag: {
    title: string;
    ago: string;
    date?: string;
    slug: string;
    id: string;
    description?: string;
    tags: string[];
    cover?: { src: IGatsbyImageData };
    editions?: { edition: { name: string } }[];
    parent?: { excerpt: string };
  }[];
}

export default function UpdatesPage(
  props: PageProps<UpdatesPageQuery, UpdatesHubCtxProps>
) {
  const updates = props.data.updatesByTag;
  const { currentPage, numPages, currentTag, tagList } = props.pageContext;

  return (
    <PageLayout>
      <PageHeroFoundation
        innerProps={{
          gap: 4,
          flexFlow: 'column',
          alignItems: 'start'
        }}
      >
        <PageHeroHeadline title='Updates' />

        <Text textStyle='lead.lg' maxW='container.sm'>
          News, insights and general updates.
        </Text>

        <Select
          value={currentTag || ''}
          onChange={(e) => {
            const t = e.target.value;
            if (!t) return navigate(`/updates/`);
            const tag = tagList.find((tag) => tag.name === t)!;
            return navigate(`/updates/tag/${tag.id}`);
          }}
          width='auto'
        >
          <option value=''>All posts</option>
          {tagList.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </Select>
      </PageHeroFoundation>

      <Container
        py={{ base: '8', lg: '16' }}
        px={{ base: '4', md: '8' }}
        maxW='container.xl'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <Heading size='lg'>{currentTag || 'All posts'}</Heading>
        {updates?.length ? (
          <List
            display='grid'
            gap={{ base: 4, md: 8 }}
            gridTemplateColumns={{
              base: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
          >
            {updates.map((update) => (
              <ListItem key={update.id}>
                <UpdatesCard
                  slug={update.slug}
                  title={update.title}
                  date={update.date || undefined}
                  ago={update.ago || undefined}
                  description={update.description || undefined}
                  parent={update.parent as { excerpt: string } | undefined}
                  editions={update.editions || []}
                  tags={update.tags || []}
                  cover={getImage(
                    update.cover?.src as unknown as IGatsbyImageData
                  )}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Text>No updates found.</Text>
        )}
        {numPages > 1 && (
          <Flex mt={8}>
            {currentPage > 1 && (
              <Button
                as={SmartLink}
                noLinkStyles
                to={`/updates/${currentPage - 1 === 1 ? '' : currentPage - 1}`}
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
                to={`/updates/${currentPage + 1}`}
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

export const query = graphql`
  query UpdatesList($skip: Int!, $limit: Int!, $currentTag: String) {
    updatesByTag(tag: $currentTag, limit: $limit, skip: $skip) {
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

export const Head = () => (
  <Seo title='Updates' description='News, insights and general updates.' />
);
