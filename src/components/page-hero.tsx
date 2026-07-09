import React from 'react';
import {
  Box,
  BoxProps,
  Container,
  ContainerProps,
  Separator,
  Flex,
  Heading,
  Text,
  useSlotRecipe
} from '@chakra-ui/react';

import SmartLink from './smart-link';
import { useEditionContext } from '$context/edition';

interface PageHeroProps
  extends PageHeroHeadlineProps, Omit<PageHeroFoundationProps, 'children'> {
  lead?: string;
}

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
  const recipe = useSlotRecipe({ key: 'pageHero' });
  const styles = recipe();

  return (
    <Box css={styles.root} {...props.wrapperProps}>
      <Container css={styles.content} {...props.innerProps}>
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
          <Heading size='md' asChild>
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
          <Heading size='md' asChild>
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
