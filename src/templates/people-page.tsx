import * as React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import { Container, Text } from '@chakra-ui/react';

import PageLayout from '$components/page-layout';
import PageHero from '$components/page-hero';
import Seo from '$components/seo';

import { MDXProse } from '$components/mdx-prose';

interface PeoplePageProps {
  people: Queries.People;
}

export default function PeoplerPage(props: PageProps<PeoplePageProps>) {
  const {
    data: {
      people: { title, avatar, role, company, twitter, pronouns, events }
    },
    children
  } = props;

  return (
    <PageLayout>
      <PageHero title={title!} />

      <Text>
        {role} at {company}
        {pronouns && <span> • {pronouns}</span>}
      </Text>

      <GatsbyImage
        image={getImage(avatar as unknown as ImageDataLike)!}
        alt={`Picture of ${title}`}
        objectFit='contain'
      />

      <Container
        py={{ base: '8', lg: '16' }}
        px={{ base: '4', md: '8' }}
        maxW='container.lg'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <MDXProse>{children}</MDXProse>
      </Container>
    </PageLayout>
  );
}

export const query = graphql`
  query ($slug: String!) {
    people(slug: { eq: $slug }) {
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

export const Head = (props: HeadProps<PeoplePageProps>) => (
  <Seo title={props.data.people.title!} />
);
