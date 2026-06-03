import React, { cloneElement } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

import { MENU_BRKPOINT } from '../theme';
import SmartLink, { SmartLinkProps } from './smart-link';
import { visuallyDisableProps } from '$utils/utils';
import { Tooltip } from './tooltip';

export interface MenuLinkProps extends SmartLinkProps {
  showComingSoon?: boolean;
  tooltipPos?: Record<string, string>;
}

export default React.forwardRef<HTMLAnchorElement, MenuLinkProps>(
  function MenuLink(props, ref) {
    const {
      showComingSoon,
      tooltipPos = {
        base: 'right',
        [MENU_BRKPOINT]: 'bottom'
      },
      ...rest
    } = props;

    const popoverPosition = useBreakpointValue(tooltipPos, {
      fallback: 'base'
    });

    const content = (
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
        {...rest}
      />
    );

    return showComingSoon ? (
      <Tooltip
        showArrow
        content='Coming soon'
        openDelay={200}
        positioning={{
          placement: popoverPosition as 'right' | 'bottom'
        }}
      >
        {cloneElement(content, { ...visuallyDisableProps() })}
      </Tooltip>
    ) : (
      content
    );
  }
);
