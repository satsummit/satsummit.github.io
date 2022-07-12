import React from 'react';
import styled from 'styled-components';

import { media, themeVal } from '@devseed-ui/theme-provider';

import { variableGlsp } from '$styles/variable-utils';

const SponsorsFoldSelf = styled.section`
  filter: drop-shadow(0 -8px 0 ${themeVal('color.secondary-500')});
  /* margin-top: ${variableGlsp(-2)};

  ${media.mediumUp`
    margin-top: ${variableGlsp(-3)};
  `} */

  & + footer {
    border: 0;
  }
`;

const SponsorsFoldInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 16rem;
  padding: ${variableGlsp()};
  color: ${themeVal('color.surface')};
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${themeVal('color.base')};
  clip-path: polygon(0 28%, 100% 0, 100% 100%, 0% 100%);
`;

function SponsorsFold() {
  return (
    <SponsorsFoldSelf>
      <SponsorsFoldInner>
        <p>Hello sponsors!</p>
      </SponsorsFoldInner>
    </SponsorsFoldSelf>
  );
}

export default SponsorsFold;
