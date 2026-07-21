import React from 'react';
import { type StackProps, Stack } from '@chakra-ui/react';
import { Fade, type FadeProps } from 'react-awesome-reveal';

export const ChakraFade = React.forwardRef<
  HTMLDivElement,
  StackProps & FadeProps
>((props, ref) => {
  const { children, triggerOnce, direction, delay, duration } = props;
  return (
    <Stack ref={ref} alignItems='start' {...props} asChild>
      <Fade
        triggerOnce={triggerOnce}
        direction={direction}
        delay={delay}
        duration={duration}
      >
        {children}
      </Fade>
    </Stack>
  );
});

ChakraFade.displayName = 'ChakraFade';
