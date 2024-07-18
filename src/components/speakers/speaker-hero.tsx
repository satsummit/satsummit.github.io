import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage
} from 'gatsby-plugin-image';
import { CollecticonBrandLinkedin } from '@devseed-ui/collecticons-chakra';

import SmartLink from '$components/smart-link';
import { CollecticonBrandX } from '$components/icons/brand-x';
import { PageHeroFoundation, PageHeroHeadline } from '$components/page-hero';
import { useEditionCId } from '$context/edition';

interface SpeakerHeroProps {
  title: string;
  role: string;
  company: string;
  pronouns?: string | null;
  social?: Record<string, string | null> | null;
  image?: IGatsbyImageData;
}

export default function SpeakerHero(props: SpeakerHeroProps) {
  const { title, role, company, pronouns, social, image } = props;

  const editionCId = useEditionCId();

  return (
    <PageHeroFoundation
      innerProps={{
        flexFlow: { base: 'column', md: 'row' },
        gap: 8
      }}
    >
      {image ? (
        <Box
          as={GatsbyImage}
          image={image}
          alt={`Picture of ${title}`}
          objectFit='contain'
          borderRadius='sm'
          overflow='hidden'
        />
      ) : (
        <StaticImage
          src='./user-pic-placeholder.png'
          alt={`Placeholder satellite icon for ${title}`}
          layout='fullWidth'
          placeholder='blurred'
          style={{
            width: '256px'
          }}
        />
      )}
      <Flex flexFlow='column' gap='4'>
        <Box>
          <PageHeroHeadline
            title={title}
            parent={{
              url: `/${editionCId}/speakers`,
              title: 'Speakers'
            }}
          />
          {pronouns && <> {pronouns}.</>}
        </Box>
        <Text
          textStyle={{ base: 'lead.md', md: 'lead.lg' }}
          maxW='container.sm'
        >
          {role} at {company}.
        </Text>

        {social && (
          <Flex gap={{ base: 2, md: 3, lg: 4 }}>
            {social.x && (
              <Button
                as={SmartLink}
                noLinkStyles
                variant='soft-outline'
                colorScheme='surface'
                to={`https://twitter.com/${social.x}`}
                leftIcon={<CollecticonBrandX />}
                size={{ base: 'sm', lg: 'md' }}
              >
                <Text as='span' maxW={24} isTruncated>
                  @{social.x}
                </Text>
              </Button>
            )}
            {social.linkedin && (
              <Button
                as={SmartLink}
                noLinkStyles
                variant='soft-outline'
                colorScheme='surface'
                to={`https://www.linkedin.com/in/${social.linkedin}`}
                leftIcon={<CollecticonBrandLinkedin />}
                size={{ base: 'sm', lg: 'md' }}
              >
                <Text as='span' maxW={24} isTruncated>
                  {social.linkedin}
                </Text>
              </Button>
            )}
          </Flex>
        )}
      </Flex>
    </PageHeroFoundation>
  );
}
