import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import {
  glsp,
  media,
  multiply,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';
import { Button } from '@devseed-ui/button';
import {
  CollecticonArrowLeft,
  CollecticonBrandTwitter,
  CollecticonLayoutGrid3x3
} from '@devseed-ui/collecticons';

import Layout from '$components/layout';
import { AgendaEventList, AgendaEventListItem } from '$components/agenda';

import { PageMainContent, PageMainTitle } from '$styles/page';
import { VarHeading, VarProse } from '$styles/variable-components';
import { PersonAvatar } from '$styles/people';
import Hug from '$styles/hug';
import { variableGlsp } from '$styles/variable-utils';
import MenuLinkAppearance from '$styles/menu-link';

import { useMediaQuery } from '$utils/use-media-query';

const SinglePerson = styled(Hug)`
  padding: ${variableGlsp(2, 0)};
`;

const SinglePersonMedia = styled.div`
  grid-row: 1;
  grid-column: content-start / content-4;
  align-self: end;
  margin-bottom: ${variableGlsp()};

  ${media.smallUp`
    grid-column: full-start / content-3;
    padding-right: ${variableGlsp()};
    margin-bottom: ${variableGlsp(2)};
  `}

  ${media.mediumUp`
    grid-column: content-start / content-4;
    padding-right: ${variableGlsp()};
  `}

  ${media.largeUp`
    grid-column: content-start / content-5;
  `}

  ${media.xlargeUp`
    padding-right: ${variableGlsp(2)};
  `}
`;

const SinglePersonHero = styled.div`
  grid-column: content-start / content-end;
  align-self: end;
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp(0.5)};
  border-bottom: ${multiply(themeVal('layout.border'), 4)} solid
    ${themeVal('color.secondary-500')};
  padding: ${variableGlsp(0, 0, 2, 0)};
  margin-bottom: ${variableGlsp(2)};

  ${media.smallUp`
    grid-column: content-3 / content-end;
  `}

  ${media.mediumUp`
    grid-row: 1;
    grid-column: content-4 / content-8;
  `}

  ${media.largeUp`
    grid-column: content-5 / content-12;
  `}

  ${media.xlargeUp`
    grid-column: content-5 / content-11;
  `}
`;

const SinglePersonHeadline = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp(0.25)};
`;

const SinglePersonTitle = styled(PageMainTitle)`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  gap: ${variableGlsp(0.5)};

  span {
    ${visuallyHidden()}
  }

  strong {
    font-weight: inherit;
  }
`;

const SinglePersonSubtitle = styled.p`
  font-size: 1.25rem;

  ${media.mediumUp`
    font-size: 1.5rem;
  `}
`;

const SinglePersonTitleLink = styled(Link)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 50%;
  text-decoration: none;
  gap: ${glsp(0.5)};
  transition: opacity 0.24s ease-in-out;

  &:visited {
    color: inherit;
  }

  &:hover {
    opacity: 0.64;
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

const SinglePersonEvents = styled.section`
  grid-column: content-start / content-end;
  margin-top: ${variableGlsp(1.5)};
  padding-top: ${variableGlsp(2)};
  border-top: ${multiply(themeVal('layout.border'), 4)} solid
    ${themeVal('color.secondary-500')};
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp()};

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

const SinglePersonEventsTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'xlarge'
})`
  /* styled-component */
`;

const SinglePersonActionsSelf = styled.div`
  grid-column: content-start / content-end;
  margin-top: ${variableGlsp(1.5)};

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
                <SinglePersonTitleLink to='/speakers'>
                  <CollecticonArrowLeft /> Speakers<span>: </span>
                </SinglePersonTitleLink>
                <strong>{title}</strong>
              </SinglePersonTitle>
              <SinglePersonSubtitle>
                {role} at {company}
                {pronouns && <span> • {pronouns}</span>}
              </SinglePersonSubtitle>
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
              <SinglePersonEventsTitle>On the agenda</SinglePersonEventsTitle>

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
                    htmlContent={event.parent.html}
                    people={event.people}
                  />
                ))}
              </AgendaEventList>
            </SinglePersonEvents>
          )}
          <SinglePersonActions />
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
          parent {
            ... on MarkdownRemark {
              html
            }
          }
          cId
          title
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

function SinglePersonActions() {
  const { isLargeUp } = useMediaQuery();

  return (
    <SinglePersonActionsSelf>
      <Button
        forwardedAs={Link}
        variation='base-fill'
        to='/speakers'
        size={isLargeUp ? 'xlarge' : 'large'}
        fitting='relaxed'
      >
        <CollecticonLayoutGrid3x3 /> View all speakers
      </Button>
    </SinglePersonActionsSelf>
  );
}
