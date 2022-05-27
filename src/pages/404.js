import React from 'react';
import styled from 'styled-components';
import { DevseedUiThemeProvider } from '@devseed-ui/theme-provider';

import SEO from '../components/seo';

const Page = styled.div`
  background: ${themeVal('color.primary')};
  color: ${themeVal('color.base')};
  min-height: 100vh;
  display: flex;
`;

const UhOh = () => {
  return (
    <DevseedUiThemeProvider>
      {/* eslint-disable-next-line */}
      <SEO title='Not Found' />
      <Page>
        We lost this page
      </Page>
    </DevseedUiThemeProvider>
  );
};

export default UhOh;
