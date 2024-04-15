import React from 'react';
import { BoxProps, chakra, forwardRef } from '@chakra-ui/react';
import { Fade, FadeProps } from 'react-awesome-reveal';

export const ChakraFade = forwardRef<BoxProps & FadeProps, 'div'>((props, ref) => (
  <chakra.div as={Fade} ref={ref} {...props} />
));
