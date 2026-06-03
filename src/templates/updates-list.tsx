import * as React from 'react';
import { graphql, navigate, type PageProps } from 'gatsby';
import {
  Button,
  Container,
  Flex,
  Heading,
  ListRoot,
  ListItem,
  Text,
  NativeSelect
} from '@chakra-ui/react';
import { CollecticonLayoutGrid3X3 } from '@devseed-ui/collecticons-chakra';

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

        <Text textStyle='lg' maxW='2xl'>
          News, insights and general updates.
        </Text>

        <NativeSelect.Root size='sm' width='auto'>
          <NativeSelect.Field
            value={currentTag || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const t = e.target.value;
              if (!t) return navigate(`/updates/`);
              const tag = tagList.find((tag) => tag.name === t)!;
              return navigate(`/updates/tag/${tag.id}`);
            }}
            fontSize='md'
          >
            <option value=''>All posts</option>
            {tagList.map((tag) => (
              <option key={tag.id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator color='surface.500' />
        </NativeSelect.Root>
      </PageHeroFoundation>

      <Container
        py={{ base: '8', lg: '16' }}
        px={{ base: '4', md: '8' }}
        maxW='7xl'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <Heading size='lg'>{currentTag || 'All posts'}</Heading>
        {updates?.length ? (
          <ListRoot
            listStyleType='none'
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
          </ListRoot>
        ) : (
          <Text>No updates found.</Text>
        )}
        {numPages > 1 && (
          <Flex mt={8}>
            {currentPage > 1 && (
              <Button
                asChild
                variant='solid'
                colorPalette='primary'
                size={{ base: 'md', md: 'lg' }}
              >
                <SmartLink
                  unstyled
                  to={`/updates/${currentPage - 1 === 1 ? '' : currentPage - 1}`}
                >
                  <CollecticonLayoutGrid3X3 />
                  Newer posts
                </SmartLink>
              </Button>
            )}
            {currentPage < numPages && (
              <Button
                asChild
                variant='solid'
                colorPalette='primary'
                size={{ base: 'md', md: 'lg' }}
                ml='auto'
              >
                <SmartLink unstyled to={`/updates/${currentPage + 1}`}>
                  <CollecticonLayoutGrid3X3 />
                  Older posts
                </SmartLink>
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
