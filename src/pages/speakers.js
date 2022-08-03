import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import Layout from '$components/layout';

import {
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

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

        <ul>
          {allPeople.nodes.map((speaker) => (
            <li key={speaker.id}>
              <div>
                <h2>
                  <Link to={`/speakers/${speaker.slug}`}>{speaker.title}</Link>
                </h2>
                <GatsbyImage
                  image={getImage(speaker.avatar)}
                  alt={`Picture of ${speaker.title}`}
                  objectFit='contain'
                />
              </div>
            </li>
          ))}
        </ul>
      </PageMainContent>
    </Layout>
  );
};

export default SpeakersPage;
