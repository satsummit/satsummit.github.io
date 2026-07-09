import { defineSlotRecipe } from '@chakra-ui/react';

import cloudSmallUrl from '$images/banner/banner--cloud-small@2x.png';
const heroBg = `url('${cloudSmallUrl}') calc(100% + 20rem) bottom / auto 16rem no-repeat`;

export const pageHeroRecipe = defineSlotRecipe({
  slots: ['root', 'content'],
  base: {
    root: {
      background: 'primary.500',
      position: 'relative',
      _after: {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: heroBg,
        zIndex: 100,
        pointerEvents: 'none',
        display: { base: 'none', lg: 'block' }
      }
    },
    content: {
      maxW: '7xl',
      color: 'surface.500',
      display: 'flex',
      alignItems: 'center',
      zIndex: 200,
      px: { base: '4', md: '8' },
      py: { base: '8', lg: '16' }
    }
  }
});
