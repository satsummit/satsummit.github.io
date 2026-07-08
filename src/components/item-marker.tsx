import React from 'react';
import { Box, BoxProps, Heading, useRecipe } from '@chakra-ui/react';

export function ItemMarker(props: BoxProps) {
  const { children, ...rest } = props;

  const recipe = useRecipe({ key: 'itemMarker' });
  const [recipeProps, boxProps] = recipe.splitVariantProps(rest);
  const styles = recipe(recipeProps);

  return (
    <Box css={styles} {...boxProps}>
      <Heading
        as='p'
        textTransform='uppercase'
        fontSize='inherit'
        lineHeight='1'
        whiteSpace='nowrap'
      >
        {children}
      </Heading>
    </Box>
  );
}
