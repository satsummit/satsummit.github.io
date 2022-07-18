import React, { useEffect } from 'react';
import styled from 'styled-components';
import T from 'prop-types';

import { GlobalStyles } from '$styles/theme';

import SEO from '$components/seo';
import PageHeader from '$components/page-header';
import PageFooter from '$components/page-footer';
import SponsorsFold from '$components/sponsors-fold';

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
    <>
      {/* eslint-disable-next-line */}
      <SEO title={title || 'Welcome'} />
      <GlobalStyles />
      <Page>
        <PageHeader />
        <PageBody>{children}</PageBody>
        <SponsorsFold />
        <PageFooter />
      </Page>
    </>
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
