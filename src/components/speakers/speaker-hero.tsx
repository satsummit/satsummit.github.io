import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useToken
} from '@chakra-ui/react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { CollecticonBrandLinkedin } from '@devseed-ui/collecticons-chakra';

import SmartLink from '$components/smart-link';
import { CollecticonBrandX } from '$components/icons/brand-x';

import cloudSmallUrl from '$images/banner/banner--cloud-small@2x.png';

interface SpeakerHeroProps {
  title: string;
  role: string;
  company: string;
  pronouns?: string | null;
  social?: Record<string, string | null> | null;
  image: IGatsbyImageData;
}

const heroBg = `url('${cloudSmallUrl}') calc(100% + 20rem) bottom / auto 16rem no-repeat`;

export default function SpeakerHero(props: SpeakerHeroProps) {
  const { title, role, company, pronouns, social, image } = props;

  const primary = useToken('colors', 'primary.500');

  return (
    <Box
      background={{
        base: primary,
        // Can't use tokens with this bg notation.
        lg: `${heroBg}, ${primary}`
      }}
      px={{ base: '4', md: '8' }}
      py={{ base: '8', lg: '16' }}
    >
      <Container
        maxW='container.xl'
        color='white'
        display='flex'
        alignItems='center'
        flexFlow={{ base: 'column', md: 'row' }}
        gap={8}
        p='0'
      >
        <Box
          as={GatsbyImage}
          image={image}
          alt={`Picture of ${title}`}
          objectFit='contain'
          borderRadius='sm'
          overflow='hidden'
        />
        <Flex flexFlow='column' gap='4'>
          <Box>
            <Heading
              as={SmartLink}
              to='/speakers'
              color='surface.500'
              size='md'
            >
              Speakers
            </Heading>
            <Heading size='3xl' as='h1'>
              {title}
            </Heading>
          </Box>
          <Text
            textStyle={{ base: 'lead.md', md: 'lead.lg' }}
            maxW='container.sm'
          >
            {role} at {company}.{pronouns && <> {pronouns}.</>}
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
      </Container>
    </Box>
  );
}
