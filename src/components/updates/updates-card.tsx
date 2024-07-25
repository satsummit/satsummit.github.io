import * as React from 'react';
import { Box, Flex, Heading, Tag, Text } from '@chakra-ui/react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import SmartLink from '$components/smart-link';

interface UpdatesCardProps {
  slug: string;
  cover?: IGatsbyImageData;
  title: string;
  date?: string;
  ago?: string;
  description?: string;
  parent?: { excerpt: string };
  editions?: readonly { edition: { name: string } }[];
  tags: string[];
}

export function UpdatesCard(props: UpdatesCardProps) {
  const { slug, cover, title, date, ago, description, parent, editions, tags } =
    props;

  return (
    <SmartLink
      to={`/updates/${slug}`}
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
      {cover && (
        <Box
          mx={{ base: -4, md: -8 }}
          mt={{ base: -4, md: -8 }}
          overflow='hidden'
          borderRadius='sm'
        >
          <GatsbyImage image={cover} alt='Post decorative cover' />
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

      {(editions || tags) && (
        <Flex gap={2} mt='auto' wrap='wrap-reverse'>
          {editions?.map((edition) => (
            <Tag key={edition.edition.name} variant='satsummit-dark'>
              {edition.edition.name}
            </Tag>
          ))}
          {tags.map((tag) => (
            <Tag key={tag} variant='satsummit-dark'>
              {tag}
            </Tag>
          ))}
        </Flex>
      )}
    </SmartLink>
  );
}
