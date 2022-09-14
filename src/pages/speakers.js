import React, { useMemo } from 'react';
import styled from 'styled-components';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import {
  glsp,
  listReset,
  media,
  multiply,
  themeVal
} from '@devseed-ui/theme-provider';

import Layout from '$components/layout';

import { PageMainContent, PageMainHero, PageMainTitle } from '$styles/page';
import { VarHeading } from '$styles/variable-components';
import Hug from '$styles/hug';
import { variableGlsp } from '$styles/variable-utils';
import { PersonAvatar } from '$styles/people';

const SpeakersHubHeroHeadline = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp()};
  grid-column: content-start / content-end;
  padding: ${variableGlsp(2, 0)};

  ${media.mediumUp`
    grid-column: content-start / content-8;
  `}

  ${media.largeUp`
    grid-column: content-start / content-12;
  `}

  ${media.xlargeUp`
    grid-column: content-start / content-11;
  `}
`;

const SpeakersBlock = styled(Hug)`
  padding: ${variableGlsp(0, 0, 2, 0)};
`;

const SpeakersList = styled.ol`
  ${listReset()};
  grid-column: content-start / content-end;
  display: grid;
  gap: ${variableGlsp()};
  grid-template-columns: repeat(2, 1fr);
  background: ${themeVal('color.surface')};

  ${media.mediumUp`
    grid-template-columns: repeat(3, 1fr);
  `}

  ${media.xlargeUp`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

const Speaker = styled.article`
  position: relative;
  z-index: 1;
  background: ${themeVal('color.surface')};
  color: ${themeVal('color.base')};
  border-radius: 0 0 ${themeVal('shape.rounded')} ${themeVal('shape.rounded')};
  box-shadow: ${themeVal('boxShadow.elevationD')};
  border-top: ${multiply(themeVal('layout.border'), 4)} solid
    ${themeVal('color.secondary-500')};
  height: 100%;
`;

const SpeakerLink = styled(Link)`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  transition: opacity 0.24s ease-in-out;
  text-decoration: none;

  &:visited {
    color: inherit;
  }

  &:hover {
    opacity: 0.64;
  }
`;

const SpeakerHeader = styled.header`
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp(0.25)};
  padding: ${variableGlsp(0.875, 1, 1, 1)};
`;

const SpeakerAvatar = styled(PersonAvatar)`
  order: -1;
  border-top: none;
`;

const SpeakerTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'large'
})`
  /* styled-component */
  line-height: calc(0.5rem + 0.75em);
`;

const SpeakerSubtitle = styled.p`
  font-size: 0.75rem;

  ${media.mediumUp`
    font-size: 1rem;
    line-height: 1.25rem;
  `}
`;

const SpeakerSecondaryTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'xlarge'
})`
  grid-column: content-start / content-end;
`;

const SpeakersListCondensed = styled(SpeakersList)`
  grid-template-columns: repeat(3, 1fr);

  ${media.mediumUp`
    grid-template-columns: repeat(4, 1fr);
  `}

  ${media.xlargeUp`
    grid-template-columns: repeat(6, 1fr);
  `}

  ${SpeakerTitle} {
    font-size: 1.25rem;
  }
`;

const SpeakerInner = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
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
              gatsbyImageData(width: 640, height: 640, placeholder: BLURRED)
            }
          }
          role
          company
          group
        }
      }
    }
  `);

  const { main, other } = useMemo(
    () =>
      allPeople.nodes.reduce(
        (acc, node) => {
          if (node.group === 'main') {
            acc.main.push(node);
          } else {
            acc.other.push(node);
          }
          return acc;
        },
        { main: [], other: [] }
      ),
    [allPeople.nodes]
  );

  return (
    <Layout title='Speakers'>
      <PageMainContent>
        <PageMainHero>
          <SpeakersHubHeroHeadline>
            <PageMainTitle>Speakers</PageMainTitle>
          </SpeakersHubHeroHeadline>
        </PageMainHero>

        <SpeakersBlock>
          <SpeakersList>
            {main.map((speaker) => (
              <li key={speaker.id}>
                <Speaker>
                  <SpeakerLink to={`/speakers/${speaker.slug}`}>
                    <SpeakerHeader>
                      <SpeakerTitle>{speaker.title}</SpeakerTitle>
                      <SpeakerSubtitle>
                        {speaker.role} at {speaker.company}
                      </SpeakerSubtitle>
                    </SpeakerHeader>
                    <SpeakerAvatar>
                      <GatsbyImage
                        image={getImage(speaker.avatar)}
                        alt={`Picture of ${speaker.title}`}
                        objectFit='contain'
                      />
                    </SpeakerAvatar>
                  </SpeakerLink>
                </Speaker>
              </li>
            ))}
          </SpeakersList>
        </SpeakersBlock>

        <SpeakersBlock>
          <SpeakerSecondaryTitle>Other</SpeakerSecondaryTitle>
          <SpeakersListCondensed>
            {other.map((speaker) => (
              <li key={speaker.id}>
                <Speaker>
                  <SpeakerInner>
                    <SpeakerHeader>
                      <SpeakerTitle>{speaker.title}</SpeakerTitle>
                      <SpeakerSubtitle>
                        {speaker.role} at {speaker.company}
                      </SpeakerSubtitle>
                    </SpeakerHeader>
                    <SpeakerAvatar>
                      <GatsbyImage
                        image={getImage(speaker.avatar)}
                        alt={`Picture of ${speaker.title}`}
                        objectFit='contain'
                      />
                    </SpeakerAvatar>
                  </SpeakerInner>
                </Speaker>
              </li>
            ))}
          </SpeakersListCondensed>
        </SpeakersBlock>
      </PageMainContent>
    </Layout>
  );
};

export default SpeakersPage;
