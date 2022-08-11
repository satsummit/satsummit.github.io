import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
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
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { AgendaEventList, AgendaEventListItem } from '$components/agenda';

const PeopleEvents = styled.div`
  grid-column: content-start / content-end;
`;

const People = ({ data }) => {
  const { parent, title, avatar, role, company, twitter, pronouns, events } =
    data.people;

  return (
    <Layout title={title}>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>{title}</PageMainTitle>
            <p>
              {role} at {company}
            </p>
            <p>Twitter: {twitter}</p>
            <p>Pronouns: {pronouns}</p>
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <VarProse>
            <GatsbyImage
              image={getImage(avatar)}
              alt={`Picture of ${title}`}
              objectFit='contain'
            />
          </VarProse>
          <VarProse dangerouslySetInnerHTML={{ __html: parent.html }} />
          {!!events?.length && (
            <PeopleEvents>
              <h2>Participating</h2>

              <AgendaEventList>
                {events.map(({ event }) => (
                  <AgendaEventListItem
                    key={event.slug}
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
        </BlockAlpha>
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
          gatsbyImageData(width: 400, placeholder: BLURRED)
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
