import React, { cloneElement } from 'react';
import {
  LinkProps,
  PlacementWithLogical,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react';

import { MENU_BRKPOINT } from '../@chakra-ui/gatsby-plugin/theme';
import SmartLink, { SmartLinkProps } from './smart-link';
import { visuallyDisableProps } from '$utils/utils';

export interface MenuLinkProps extends SmartLinkProps, LinkProps {
  showComingSoon?: boolean;
  tooltipPos?: Record<string, PlacementWithLogical>;
}

export default React.forwardRef<HTMLLinkElement, MenuLinkProps>(
  function MenuLink(props, ref) {
    const {
      showComingSoon,
      tooltipPos = {
        base: 'right',
        [MENU_BRKPOINT]: 'bottom'
      },
      ...rest
    } = props;

    const popoverPosition: PlacementWithLogical | undefined =
      useBreakpointValue(tooltipPos, { fallback: 'bottom' });

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
      <Tooltip label='Coming soon' placement={popoverPosition} hasArrow>
        {cloneElement(content, { ...visuallyDisableProps() })}
      </Tooltip>
    ) : (
      content
    );
  }
);
