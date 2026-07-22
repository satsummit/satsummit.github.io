import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import {
  Separator,
  Heading,
  List,
  Stack,
  StackProps,
  Text
} from '@chakra-ui/react';

import SmartLink from './smart-link';
import { LinkedSpeaker } from './agenda/linked-speaker';
import { MDXComponents } from 'mdx/types';

function Prose({ children, ...props }: StackProps) {
  return (
    <Stack
      as='article'
      gap={4}
      alignItems='start'
      css={{
        '& span:has(.gatsby-resp-image-wrapper)': {
          w: '100%',
          display: 'block'
        }
      }}
      {...props}
    >
      {children}
    </Stack>
  );
}

const mdComponents: Readonly<MDXComponents> = {
  p: Text,
  h1: (props) => (
    <Heading as='h1' mt='0.5em' size={{ base: '3xl', lg: '4xl' }} {...props} />
  ),
  h2: (props) => (
    <Heading as='h2' mt='0.5em' size={{ base: '2xl', lg: '3xl' }} {...props} />
  ),
  h3: (props) => (
    <Heading as='h3' mt='0.5em' size={{ base: 'xl', lg: '2xl' }} {...props} />
  ),
  h4: (props) => (
    <Heading as='h4' mt='0.5em' size={{ base: 'lg', lg: 'xl' }} {...props} />
  ),
  h5: (props) => (
    <Heading as='h5' mt='0.5em' size={{ base: 'md', lg: 'lg' }} {...props} />
  ),
  h6: (props) => (
    <Heading as='h6' mt='0.5em' size={{ base: 'sm', lg: 'md' }} {...props} />
  ),
  ul: (props) => <List.Root pl={6} {...props} />,
  ol: (props) => <List.Root as='ol' pl={6} {...props} />,
  li: (props) => <List.Item _marker={{ color: 'basi.500' }} {...props} />,
  Speaker: LinkedSpeaker,
  hr: (hrProps) => <Separator borderColor='basi.200a' size='sm' {...hrProps} />,
  a: (aProps: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <SmartLink
      to={aProps.href ?? '#'}
      color='primary.500'
      {...aProps}
      css={{ '&.anchor-heading': { color: 'inherit' } }}
    />
  )
};

export function MDXProse(props: StackProps) {
  const { children, ...rest } = props;

  return (
    <MDXProvider components={mdComponents}>
      <Prose {...rest}>{children}</Prose>
    </MDXProvider>
  );
}
