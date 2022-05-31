import React, { useEffect } from 'react';
import styled from 'styled-components';
import T from 'prop-types';
import { DevseedUiThemeProvider } from '@devseed-ui/theme-provider';

import themeOverrides, { GlobalStyles } from '$styles/theme';
import SEO from './seo';

import PageFooter from './page-footer';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const PageBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children, title }) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      window.innerWidth - document.documentElement.clientWidth + 'px'
    );
  }, []);

  return (
    <DevseedUiThemeProvider theme={themeOverrides}>
      {/* eslint-disable-next-line */}
      <SEO title={title || 'Welcome'} />
      <GlobalStyles />
      <Page>
        <PageBody>{children}</PageBody>
        <PageFooter />
      </Page>
    </DevseedUiThemeProvider>
  );
};

export default Layout;

Layout.propTypes = {
  title: T.string,
  children: T.oneOfType([
    T.node,
    T.arrayOf(T.oneOfType([T.node, T.arrayOf(T.node)]))
  ])
};
