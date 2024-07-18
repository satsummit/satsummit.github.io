import React from 'react';
import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Divider,
  Flex,
  Heading,
  Text,
  useToken
} from '@chakra-ui/react';

import cloudSmallUrl from '$images/banner/banner--cloud-small@2x.png';
import SmartLink from './smart-link';
import { useEditionContext } from '$context/edition';

interface PageHeroProps
  extends PageHeroHeadlineProps,
    Omit<PageHeroFoundationProps, 'children'> {
  lead?: string;
}

const heroBg = `url('${cloudSmallUrl}') calc(100% + 20rem) bottom / auto 16rem no-repeat`;

export function PageHero(props: PageHeroProps) {
  const { title, lead, parent, ...passthrough } = props;

  return (
    <PageHeroFoundation {...passthrough}>
      <Flex flexFlow='column' gap='4'>
        <PageHeroHeadline title={title} parent={parent} />
        {lead && (
          <Text textStyle='lead.lg' maxW='container.sm'>
            {lead}
          </Text>
        )}
      </Flex>
    </PageHeroFoundation>
  );
}

interface PageHeroFoundationProps {
  children: React.ReactNode;
  wrapperProps?: BoxProps;
  innerProps?: ContainerProps;
}

export function PageHeroFoundation(props: PageHeroFoundationProps) {
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
      {...props.wrapperProps}
    >
      <Container
        maxW='container.xl'
        color='white'
        display='flex'
        alignItems='center'
        p='0'
        {...props.innerProps}
      >
        {props.children}
      </Container>
    </Box>
  );
}

interface PageHeroHeadlineProps {
  title: string;
  parent?: {
    title: string;
    url: string;
  };
}

export function PageHeroHeadline(props: PageHeroHeadlineProps) {
  const { title, parent } = props;

  const { edition, editionCId } = useEditionContext();

  return (
    <Box>
      <Flex alignItems='center' gap={4}>
        {edition && (
          <Heading
            as={SmartLink}
            to={`/${editionCId}`}
            color='surface.500'
            size='md'
          >
            {edition.name}
          </Heading>
        )}
        {parent && edition && (
          <Divider
            borderColor='surface.300a'
            size='xs'
            h='4'
            orientation='vertical'
          />
        )}
        {parent && (
          <Heading as={SmartLink} to={parent.url} color='surface.500' size='md'>
            {parent.title}
          </Heading>
        )}
      </Flex>
      <Heading size='4xl' as='h1'>
        {title}
      </Heading>
    </Box>
  );
}
