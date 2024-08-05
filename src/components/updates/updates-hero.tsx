import React from 'react';
import { Box, Flex, Tag, Text } from '@chakra-ui/react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import { PageHeroFoundation, PageHeroHeadline } from '$components/page-hero';

interface UpdatesHeroProps {
  title: string;
  lead?: string;
  published: string;
  image?: IGatsbyImageData;
  tags?: string[];
}

export default function UpdatesHero(props: UpdatesHeroProps) {
  const { title, lead, published, tags, image } = props;

  return (
    <PageHeroFoundation
      innerProps={{
        flexFlow: { base: 'column', md: 'row' },
        gap: 8,
        alignItems: 'normal'
      }}
    >
      <Flex
        flexFlow='column'
        gap='4'
        maxW={{ base: '100%', sm: 'container.sm', md: '50%' }}
      >
        <Box>
          <PageHeroHeadline
            title={title}
            parent={{
              url: `/updates`,
              title: 'Updates'
            }}
          />
          {published}
        </Box>
        {lead && (
          <Text textStyle={{ base: 'lead.md', md: 'lead.lg' }}>{lead}</Text>
        )}

        {!!tags?.length && (
          <Flex gap={2} mt={4}>
            {tags.map((tag) => (
              <Tag key={tag} variant='satsummit-dark'>
                {tag}
              </Tag>
            ))}
          </Flex>
        )}
      </Flex>
      {image && (
        <Box
          as={GatsbyImage}
          image={image}
          alt='Decorative picture for this post'
          borderRadius='sm'
          flexGrow={1}
        />
      )}
    </PageHeroFoundation>
  );
}
