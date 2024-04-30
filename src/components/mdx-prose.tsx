import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Box, Divider } from '@chakra-ui/react';
import { Prose, ProseProps } from '@nikolovlazar/chakra-ui-prose';

import SmartLink from './smart-link';
import { LinkedSpeaker } from './agenda/linked-speaker';

export function MDXProse(
  props: React.ComponentProps<typeof MDXProvider> & ProseProps
) {
  const { children, ...rest } = props;

  return (
    <MDXProvider
      components={{
        Speaker: LinkedSpeaker,
        hr: (props) => <Divider borderColor='base.200a' size='sm' {...props} />,
        /* eslint-disable-next-line  */
        a: (props: any) => (
          <SmartLink
            to={props.href}
            color='primary.500'
            {...props}
            sx={{
              '&.anchor-heading': {
                color: 'inherit'
              }
            }}
          />
        )
      }}
    >
      <Box as={Prose} {...rest}>{children}</Box>
    </MDXProvider>
  );
}
