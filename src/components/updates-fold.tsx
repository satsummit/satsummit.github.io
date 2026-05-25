import React from 'react';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Button, Separator, Flex, Heading, List } from '@chakra-ui/react';

import SmartLink from '$components/smart-link';
import { UpdatesCard } from '$components/updates/updates-card';

interface UpdatesFoldProps {
  updates: {
    title: string;
    ago: string;
    date: string;
    slug: string;
    id: string;
    description: string;
    tags: string[];
    cover: {
      src: IGatsbyImageData;
    };
    editions: {
      edition: {
        name: string;
      };
    }[];
    parent: {
      excerpt: string;
    };
  }[];
}

export function UpdatesFold(props: UpdatesFoldProps) {
  const { updates } = props;

  if (!updates?.length) return null;

  return (
    <>
      <Separator
        borderColor='basi.200a'
        size='sm'
        orientation='horizontal'
        gridColumn='content-start/content-end'
      />
      <Flex
        justifyContent='space-between'
        gridColumn='content-start/content-end'
      >
        <Heading size='lg'>Updates</Heading>
        <Button asChild variant='solid' colorPalette='primary'>
          <SmartLink to='/updates'>View all</SmartLink>
        </Button>
      </Flex>

      <List.Root
        unstyled
        gridColumn='content-start/content-end'
        display='grid'
        gap={{ base: 4, md: 8 }}
        gridTemplateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)'
        }}
      >
        {updates.map((update) => (
          <List.Item key={update.id}>
            <UpdatesCard
              slug={update.slug}
              title={update.title}
              date={update.date || undefined}
              ago={update.ago || undefined}
              description={update.description || undefined}
              parent={update.parent as { excerpt: string } | undefined}
              editions={update.editions || []}
              tags={update.tags || []}
              cover={getImage(update.cover?.src as unknown as IGatsbyImageData)}
            />
          </List.Item>
        ))}
      </List.Root>
    </>
  );
}
