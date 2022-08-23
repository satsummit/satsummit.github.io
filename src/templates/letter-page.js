import React from 'react';
import T from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '$components/layout';
import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';
import { BlockAlpha } from '$styles/blocks';
import { VarProse } from '$styles/variable-components';

const LayoutLetter = ({ data }) => {
  const { parent, title } = data.letter;

  return (
    <Layout title={title}>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>{title}</PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <VarProse dangerouslySetInnerHTML={{ __html: parent.html }} />
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
    letter(slug: { eq: $slug }) {
      parent {
        ... on MarkdownRemark {
          html
        }
      }
      title
    }
  }
`;
