import React from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '$components/layout';
import {
  PageLead,
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';
import { BlockAlpha } from '$styles/blocks';
import { VarProse } from '$styles/variable-components';

const LayoutLetter = ({ data }) => {
  const {
    html,
    frontmatter: { title, lead }
  } = data.markdownRemark;

  return (
    <Layout title={title}>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>{title}</PageMainTitle>
            {lead && <PageLead>{lead}</PageLead>}
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <VarProse dangerouslySetInnerHTML={{ __html: html }} />
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

LayoutLetter.propTypes = {
  data: T.object
};

export default LayoutLetter;

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        lead
      }
    }
  }
`;
