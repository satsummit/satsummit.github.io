import React from 'react';
import { Link as ChLink, LinkProps, chakra } from '@chakra-ui/react';
import { Link } from 'gatsby';

export interface SmartLinkProps extends LinkProps {
  to: string;
  /**
   * If true, the link will not have any default styles applied. Otherwise
   * Chakra's Link default styles will be applied.
   * 
   * Useful when using as "as" prop in other components.
   */
  noLinkStyles?: boolean;
}

export default React.forwardRef<HTMLLinkElement, SmartLinkProps>(
  function SmartLink(props, ref) {
    const { to, noLinkStyles, ...rest } = props;

    const isExternal =
      to.match(/^(https?:)?\/\//) || to.match(/^(mailto|tel):/);

    const Cmp = noLinkStyles ? chakra.a : ChLink;

    return isExternal ? (
      <Cmp ref={ref} href={to} {...rest} />
    ) : (
      <Cmp ref={ref} as={Link} to={to} {...rest} />
    );
  }
);
