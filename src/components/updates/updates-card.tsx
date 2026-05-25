import * as React from 'react';
import { Box, chakra, Flex, Heading, Text, Badge } from '@chakra-ui/react';
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
  tags: readonly string[];
}

export function UpdatesCard(props: UpdatesCardProps) {
  const { slug, cover, title, date, ago, description, parent, editions, tags } =
    props;

  return (
    <SmartLink
      to={`/updates/${slug}`}
      borderRadius='xs'
      display='flex'
      flexDir='column'
      alignItems='normal'
      h='100%'
      color='basi.500'
      bg='basi.50'
      transition='transform 150ms ease-in-out'
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
      <Box mt={!cover ? '2.5rem' : undefined}>
        <Heading size='xl'>{title}</Heading>
        <chakra.time
          dateTime={date || undefined}
          fontSize='sm'
          fontStyle='initial'
        >
          {ago}
        </chakra.time>
      </Box>
      <Text>
        {description || (parent as { excerpt: string } | undefined)?.excerpt}
      </Text>

      {(editions || tags) && (
        <Flex gap={2} mt='auto' wrap='wrap-reverse'>
          {editions?.map((edition) => (
            <Badge
              key={edition.edition.name}
              variant='satsummit-dark'
              size='sm'
            >
              {edition.edition.name}
            </Badge>
          ))}
          {tags.map((tag) => (
            <Badge key={tag} variant='satsummit-dark' size='sm'>
              {tag}
            </Badge>
          ))}
        </Flex>
      )}
    </SmartLink>
  );
}
