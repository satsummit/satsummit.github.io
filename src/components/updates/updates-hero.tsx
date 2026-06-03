import React from 'react';
import { Box, chakra, Flex, Badge, Text } from '@chakra-ui/react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

const ChakraGatsbyImage = chakra(GatsbyImage);

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
        maxW={{ base: '100%', sm: '2xl', md: '50%' }}
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
          <Text textStyle={{ base: 'md', md: 'lg' }}>{lead}</Text>
        )}

        {!!tags?.length && (
          <Flex gap={2} mt={4}>
            {tags.map((tag) => (
              <Badge key={tag} variant='satsummit-dark' size='sm'>
                {tag}
              </Badge>
            ))}
          </Flex>
        )}
      </Flex>
      {image && (
        <ChakraGatsbyImage
          image={image}
          alt='Decorative picture for this post'
          borderRadius='xs'
          flexGrow={1}
        />
      )}
    </PageHeroFoundation>
  );
}
