import React from 'react';
import { type BoxProps, Box } from '@chakra-ui/react';
import { Fade, type FadeProps } from 'react-awesome-reveal';

export const ChakraFade = React.forwardRef<
  HTMLDivElement,
  BoxProps & FadeProps
>((props, ref) => {
  const { children, triggerOnce, direction, delay, duration } = props;
  return (
    <Box ref={ref} {...props} asChild>
      <Fade
        triggerOnce={triggerOnce}
        direction={direction}
        delay={delay}
        duration={duration}
      >
        {children}
      </Fade>
    </Box>
  );
});

ChakraFade.displayName = 'ChakraFade';
