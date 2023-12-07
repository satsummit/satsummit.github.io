import React from 'react';
import { Divider, DividerProps, forwardRef } from '@chakra-ui/react';

interface SeparatorProps extends DividerProps {}

export const Separator = forwardRef<SeparatorProps, 'hr'>(
  function SeparatorCmp(props, ref) {
    const {
      orientation = 'horizontal',
      size,
      bg = 'primary.500',
      borderRadius = '2'
    } = props;

    return (
      <Divider
        ref={ref}
        {...props}
        border='none'
        _after={{
          content: '""',
          display: 'block',
          height: orientation === 'horizontal' ? size : '100%',
          width: orientation === 'horizontal' ? '100%' : size,
          bg,
          borderRadius
        }}
      />
    );
  }
);
