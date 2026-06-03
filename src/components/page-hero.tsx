import React from 'react';
import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Separator,
  Flex,
  Heading,
  Text
} from '@chakra-ui/react';

import cloudSmallUrl from '$images/banner/banner--cloud-small@2x.png';
import SmartLink from './smart-link';
import { useEditionContext } from '$context/edition';

interface PageHeroProps
  extends PageHeroHeadlineProps, Omit<PageHeroFoundationProps, 'children'> {
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
          <Text fontSize='lg' maxW='2xl'>
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
  return (
    <Box
      background='primary.500'
      position='relative'
      {...props.wrapperProps}
      _after={{
        content: '""',
        position: 'absolute',
        inset: 0,
        background: heroBg,
        zIndex: 100,
        pointerEvents: 'none',
        display: { base: 'none', lg: 'block' }
      }}
    >
      <Container
        maxW='7xl'
        color='white'
        display='flex'
        alignItems='center'
        px={{ base: '4', md: '8' }}
        py={{ base: '8', lg: '16' }}
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
          <Heading color='surface.500' size='md' asChild>
            <SmartLink to={`/${editionCId}`} color='inherit'>
              {edition.name}
            </SmartLink>
          </Heading>
        )}
        {parent && edition && (
          <Separator
            borderColor='surface.300a'
            size='xs'
            h='4'
            orientation='vertical'
          />
        )}
        {parent && (
          <Heading color='surface.500' size='md' asChild>
            <SmartLink to={parent.url} color='inherit'>
              {parent.title}
            </SmartLink>
          </Heading>
        )}
      </Flex>
      <Heading size='4xl' as='h1'>
        {title}
      </Heading>
    </Box>
  );
}
