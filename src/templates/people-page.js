import React from 'react';
import T from 'prop-types';
import { graphql, Link } from 'gatsby';

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
          <VarProse>
            <h2>Participating</h2>
            <ul>
              {events.map(({ role, event }) => (
                <li key={event.slug}>
                  <h3>
                    <Link to={`/agenda#${event.cId}`}>{event.title}</Link>
                  </h3>
                  <span>As: {role}</span>
                  <p>
                    {event.type}
                    <span> at {event.date} in </span>
                    {event.room}
                  </p>
                  <p>{event.lead}</p>
                </li>
              ))}
            </ul>
          </VarProse>
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
        }
      }
    }
  }
`;
