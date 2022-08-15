import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { media, themeVal, visuallyHidden } from '@devseed-ui/theme-provider';

import Layout from '$components/layout';
import { AgendaEventList, AgendaEventListItem } from '$components/agenda';

import { PageMainContent, PageMainSubtitle, PageMainTitle } from '$styles/page';
import { VarProse } from '$styles/variable-components';
import { PersonAvatar } from '$styles/people';
import Hug from '$styles/hug';
import { variableGlsp } from '$styles/variable-utils';
import MenuLinkAppearance from '$styles/menu-link';
import { CollecticonBrandTwitter } from '@devseed-ui/collecticons';

const SinglePerson = styled(Hug)`
  padding: ${variableGlsp(2, 0)};
`;

const SinglePersonMedia = styled.div`
  grid-row: 1;
  grid-column: content-start / content-end;
  align-self: end;

  ${media.smallUp`
    grid-column: content-start / content-3;
    margin-bottom: ${variableGlsp()};
  `}

  ${media.mediumUp`
    grid-column: content-start / content-4;
  `}

  ${media.largeUp`
    grid-column: content-start / content-5;
  `}
`;

const SinglePersonHero = styled.div`
  grid-column: content-start / content-end;
  align-self: end;
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp(0.5)};

  ${media.smallUp`
    grid-column: content-3 / content-end;
    padding: ${variableGlsp(2)};
    margin-bottom: ${variableGlsp()};
  `}

  ${media.mediumUp`
    grid-row: 1;
    grid-column: content-4 / content-end;
  `}

  ${media.largeUp`
    grid-column: content-5 / content-end;
  `}
`;

const SinglePersonHeadline = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const SinglePersonTitle = styled(PageMainTitle)`
  display: flex;
  flex-flow: column nowrap;

  a {
    font-size: 50%;

    &,
    &:visited {
      text-decoration: none;
    }
  }

  span {
    ${visuallyHidden}
  }

  strong {
    font-weight: inherit;
  }
`;

const SinglePersonSocial = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: ${variableGlsp()};
`;

const SinglePersonSocialLink = styled.a`
  ${MenuLinkAppearance}
`;

const SinglePersonBody = styled.div`
  grid-column: content-start / content-end;

  ${media.mediumUp`
    grid-column: content-2 / content-8;
  `}

  ${media.largeUp`
    grid-column: content-2 / content-12;
  `}

  ${media.xlargeUp`
    grid-column: content-3 / content-11;
  `}
`;

const SinglePersonEvents = styled.div`
  grid-column: content-start / content-end;
  margin-top: ${variableGlsp(1.5)};
  padding-top: ${variableGlsp(2)};
  border-top: 8px solid ${themeVal('color.secondary-500')};

  ${media.mediumUp`
    grid-column: content-2 / content-8;
  `}

  ${media.largeUp`
    grid-column: content-2 / content-12;
  `}

  ${media.xlargeUp`
    grid-column: content-3 / content-11;
  `}
`;

const People = ({ data }) => {
  const { parent, title, avatar, role, company, twitter, pronouns, events } =
    data.people;

  return (
    <Layout title={title}>
      <PageMainContent>
        <SinglePerson>
          <SinglePersonHero>
            <SinglePersonHeadline>
              <SinglePersonTitle>
                <Link to='/speakers'>Speaker</Link>
                <span>: </span>
                <strong>{title}</strong>
              </SinglePersonTitle>
              <PageMainSubtitle>
                {role} at {company} {pronouns && <span>• {pronouns}</span>}
              </PageMainSubtitle>
            </SinglePersonHeadline>
            {twitter && (
              <SinglePersonSocial>
                <SinglePersonSocialLink href={`https://twitter.com/${twitter}`}>
                  <CollecticonBrandTwitter /> @{twitter}
                </SinglePersonSocialLink>
              </SinglePersonSocial>
            )}
          </SinglePersonHero>

          <SinglePersonMedia>
            <PersonAvatar>
              <GatsbyImage
                image={getImage(avatar)}
                alt={`Picture of ${title}`}
                objectFit='contain'
              />
            </PersonAvatar>
          </SinglePersonMedia>

          <SinglePersonBody>
            <VarProse dangerouslySetInnerHTML={{ __html: parent.html }} />
          </SinglePersonBody>

          {!!events?.length && (
            <SinglePersonEvents>
              <h2>Participating</h2>

              <AgendaEventList>
                {events.map(({ event }) => (
                  <AgendaEventListItem
                    key={event.slug}
                    startingHLevel={3}
                    cId={event.cId}
                    title={event.title}
                    type={event.type}
                    date={event.date}
                    room={event.room}
                    lead={event.lead}
                    people={event.people}
                  />
                ))}
              </AgendaEventList>
            </SinglePersonEvents>
          )}
        </SinglePerson>
      </PageMainContent>
    </Layout>
  );
};

People.propTypes = {
  data: T.object
};

export default People;

export const query = graphql`
  query ($slug: String!) {
    people(slug: { eq: $slug }) {
      parent {
        ... on MarkdownRemark {
          html
        }
      }
      id
      title
      company
      role
      twitter
      pronouns
      avatar {
        childImageSharp {
          gatsbyImageData(width: 640, placeholder: BLURRED)
        }
      }
      events {
        role
        event {
          cId
          title
          lead
          slug
          type
          room
          date
          people {
            ...AllEventPeople
          }
        }
      }
    }
  }
`;
