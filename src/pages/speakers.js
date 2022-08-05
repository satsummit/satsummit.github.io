import React from 'react';
import styled from 'styled-components';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { listReset, themeVal } from '@devseed-ui/theme-provider';

import Layout from '$components/layout';

import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';
import { VarHeading } from '$styles/variable-components';
import Hug from '$styles/hug';
import { variableGlsp } from '$styles/variable-utils';

const SpeakersBlock = styled(Hug)`
  padding: ${variableGlsp(2, 0)};
`;

const SpeakersList = styled.ol`
  ${listReset()};
  grid-column: content-start / content-end;
  display: flex;
  flex-flow: row wrap;
  gap: ${variableGlsp()};
`;

const Speaker = styled.article`
  background: ${themeVal('color.surface')};
  color: ${themeVal('color.base')};
  border-radius: 0 0 ${themeVal('shape.rounded')} ${themeVal('shape.rounded')};
  box-shadow: ${themeVal('boxShadow.elevationD')};
  filter: drop-shadow(0 -8px 0 ${themeVal('color.secondary-500')});
`;

const SpeakerLink = styled(Link)`
  display: flex;
  flex-flow: column nowrap;
  transition: opacity 0.24s ease-in-out;

  &,
  &:visited {
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    opacity: 0.64;
  }
`;

const SpeakerHeader = styled.header`
  padding: ${variableGlsp(1, 2)};
`;

const SpeakerFigure = styled.figure`
  order: -1;
`;

const SpeakerTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'xlarge'
})`
  /* styled-component */
`;

const SpeakersPage = () => {
  const { allPeople } = useStaticQuery(graphql`
    query {
      allPeople(sort: { fields: [slug] }) {
        nodes {
          id
          slug
          title
          avatar {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED)
            }
          }
          role
          company
        }
      }
    }
  `);

  return (
    <Layout title='Speakers'>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Speakers</PageMainTitle>
          </PageMainHeroHeadline>
        </PageMainHero>

        <SpeakersBlock>
          <SpeakersList>
            {allPeople.nodes.map((speaker) => (
              <li key={speaker.id}>
                <Speaker>
                  <SpeakerLink to={`/speakers/${speaker.slug}`}>
                    <SpeakerHeader>
                      <SpeakerTitle>{speaker.title}</SpeakerTitle>
                      <span>
                        {speaker.role}, {speaker.company}
                      </span>
                    </SpeakerHeader>
                    <SpeakerFigure>
                      <GatsbyImage
                        image={getImage(speaker.avatar)}
                        alt={`Picture of ${speaker.title}`}
                        objectFit='contain'
                      />
                    </SpeakerFigure>
                  </SpeakerLink>
                </Speaker>
              </li>
            ))}
          </SpeakersList>
        </SpeakersBlock>
      </PageMainContent>
    </Layout>
  );
};

export default SpeakersPage;
