import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';

import { Separator } from './separator';
import SmartLink from './smart-link';

export function MDXProse(props: React.ComponentProps<typeof MDXProvider>) {
  return (
    <MDXProvider
      components={{
        hr: (props) => <Separator bg='base.200a' size='1' {...props} />,
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
      <Prose>{props.children}</Prose>
    </MDXProvider>
  );
}
