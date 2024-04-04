import React from 'react';
import { createCollecticon } from '@devseed-ui/collecticons-chakra';

export const CollecticonBrandX = createCollecticon((props) => (
  <>
    {props.title && <title>{props.title}</title>}
    <path d='M2.096 1.031H4.284L13.942 13.945H11.755L2.096 1.031ZM0.039 0L6.216 8.26L0 14.975H1.399L6.842 9.096L11.239 14.975H16L9.475 6.251L15.261 0H13.862L8.85 5.415L4.8 0H0.039Z' />
  </>
));
