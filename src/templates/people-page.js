import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from '$components/layout';
import { PageMainContent, PageMainTitle } from '$styles/page';
import { VarProse } from '$styles/variable-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { AgendaEventList, AgendaEventListItem } from '$components/agenda';

import { PersonAvatar } from '$styles/people';
import Hug from '$styles/hug';
import { variableGlsp } from '$styles/variable-utils';
import { themeVal } from '@devseed-ui/theme-provider';

const PeopleEvents = styled.div`
  grid-column: content-start / content-end;
`;

const SinglePerson = styled(Hug)`
  /* styled-component */
`;

const SinglePersonContent = styled.div`
  grid-column: content-5 / content-end;
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp()};
  padding: ${variableGlsp(2, 0)};
`;

const SinglePersonHeadline = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${variableGlsp()};
  padding: ${variableGlsp(0, 0, 2, 0)};
  border-bottom: 8px solid ${themeVal('color.secondary-500')};
`;

const SinglePersonMedia = styled.div`
  grid-row: 1 / span 1;
  grid-column: content-start / content-4;
  padding: ${variableGlsp(2, 0)};
`;

const People = ({ data }) => {
  const { parent, title, avatar, role, company, twitter, pronouns, events } =
    data.people;

  return (
    <Layout title={title}>
      <PageMainContent>
        <SinglePerson>
          <SinglePersonMedia>
            <PersonAvatar>
              <GatsbyImage
                image={getImage(avatar)}
                alt={`Picture of ${title}`}
                objectFit='contain'
              />
            </PersonAvatar>
          </SinglePersonMedia>

          <SinglePersonContent>
            <SinglePersonHeadline>
              <PageMainTitle>{title}</PageMainTitle>
              <p>
                {role} at {company}
              </p>
              <p>Twitter: {twitter}</p>
              <p>Pronouns: {pronouns}</p>
            </SinglePersonHeadline>

            <VarProse dangerouslySetInnerHTML={{ __html: parent.html }} />

            {!!events?.length && (
              <PeopleEvents>
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
              </PeopleEvents>
            )}
          </SinglePersonContent>
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
