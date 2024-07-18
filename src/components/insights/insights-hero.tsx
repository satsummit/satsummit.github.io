import React from 'react';
import { Box, Flex, Tag, Text } from '@chakra-ui/react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import { PageHeroFoundation, PageHeroHeadline } from '$components/page-hero';

interface InsightsHeroProps {
  title: string;
  lead?: string;
  published: string;
  image?: IGatsbyImageData;
  tags?: string[];
}

export default function InsightsHero(props: InsightsHeroProps) {
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
              url: `/insights`,
              title: 'Insights'
            }}
          />
          {published}
        </Box>
        {lead && (
          <Text textStyle={{ base: 'lead.md', md: 'lead.lg' }}>{lead}</Text>
        )}

        {!!tags?.length && (
          <Flex gap={2} mt='auto'>
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
