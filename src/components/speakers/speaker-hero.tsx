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

import SmartLink from '$components/smart-link';
import cloudSmallUrl from '$images/banner/banner--cloud-small@2x.png';
import { CollecticonBrandTwitter } from '@devseed-ui/collecticons-chakra';

interface SpeakerHeroProps {
  title: string;
  role: string;
  company: string;
  pronouns?: string | null;
  twitter?: string | null;
  image: IGatsbyImageData;
}

const heroBg = `url('${cloudSmallUrl}') calc(100% + 20rem) bottom / auto 16rem no-repeat`;

export default function SpeakerHero(props: SpeakerHeroProps) {
  const { title, role, company, pronouns, twitter, image } = props;

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
        <GatsbyImage
          image={image}
          alt={`Picture of ${title}`}
          objectFit='contain'
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
            <Heading size='4xl' as='h1'>
              {title}
            </Heading>
          </Box>
          <Text textStyle='lead.lg' maxW='container.sm'>
            {role} at {company}
            {pronouns && <span> • {pronouns}</span>}
          </Text>

          {twitter && (
            <Flex gap={{ base: 4, md: 8 }}>
              <Button
                as={SmartLink}
                noLinkStyles
                variant='soft-outline'
                colorScheme='surface'
                to={`https://twitter.com/${twitter}`}
              >
                <CollecticonBrandTwitter /> @{twitter}
              </Button>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
