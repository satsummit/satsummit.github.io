import React from 'react';
import { Box, Button, chakra, Flex, Text } from '@chakra-ui/react';
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

const ChakraGatsbyImage = chakra(GatsbyImage);

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
        <ChakraGatsbyImage
          image={image}
          alt={`Picture of ${title}`}
          objectFit='contain'
          borderRadius='xs'
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
        <Text textStyle={{ base: 'md', md: 'lg' }} maxW='2xl'>
          {role} at {company}.
        </Text>

        {social && (
          <Flex gap={{ base: 2, md: 3, lg: 4 }}>
            {social.x && (
              <Button
                asChild
                variant='soft-outline'
                colorPalette='surface'
                size={{ base: 'sm', lg: 'md' }}
              >
                <SmartLink to={`https://twitter.com/${social.x}`} unstyled>
                  <CollecticonBrandX />
                  <Text as='span' maxW={24} truncate>
                    @{social.x}
                  </Text>
                </SmartLink>
              </Button>
            )}
            {social.linkedin && (
              <Button
                asChild
                variant='soft-outline'
                colorPalette='surface'
                size={{ base: 'sm', lg: 'md' }}
              >
                <SmartLink
                  to={`https://www.linkedin.com/in/${social.linkedin}`}
                  unstyled
                >
                  <CollecticonBrandLinkedin />
                  <Text as='span' maxW={24} truncate>
                    {social.linkedin}
                  </Text>
                </SmartLink>
              </Button>
            )}
          </Flex>
        )}
      </Flex>
    </PageHeroFoundation>
  );
}
