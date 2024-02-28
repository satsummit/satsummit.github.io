import React from 'react';
import { LinkProps } from '@chakra-ui/react';
import SmartLink from './smart-link';

export interface SmartLinkProps extends LinkProps {
  to: string;
}

export default React.forwardRef<HTMLLinkElement, SmartLinkProps>(
  function MenuLink(props, ref) {
    return (
      <SmartLink
        ref={ref}
        display='inline-flex'
        alignItems='center'
        fontFamily='Barlow Condensed, serif'
        fontWeight='600'
        fontSize='sm'
        textTransform='uppercase'
        transition='opacity 0.24s ease 0s'
        color='currentColor'
        _hover={{
          opacity: '0.64',
          textDecoration: 'none'
        }}
        {...props}
      />
    );
  }
);
