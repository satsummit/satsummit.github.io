import * as React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';
import { getImage, ImageDataLike } from 'gatsby-plugin-image';
import {
  Box,
  Container,
  Heading,
  ListItem,
  OrderedList
} from '@chakra-ui/react';
import { Hug } from '@devseed-ui/hug-chakra';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';

import { MDXProse } from '$components/mdx-prose';
import SpeakerHero from '$components/speakers/speaker-hero';
import { AgendaEvent } from '$components/agenda/event';

interface PeoplePageProps {
  people: Queries.People;
}

type Sure<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export default function PeoplerPage(props: PageProps<PeoplePageProps>) {
  const {
    data: {
      people: { title, avatar, role, company, twitter, pronouns, events }
    },
    children
  } = props;

  return (
    <PageLayout>
      <SpeakerHero
        title={title!}
        role={role}
        company={company}
        pronouns={pronouns}
        twitter={twitter}
        image={getImage(avatar as unknown as ImageDataLike)!}
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

      {!!events?.length && (
        <Hug>
          <Box
            gridColumn={{
              base: 'content-start / content-end',
              md: 'content-2 / content-8',
              lg: 'content-2 / content-12',
              xl: 'content-3 / content-11'
            }}
          >
            <Heading as='h2' size='xl'>
              On the agenda
            </Heading>

            <Hug
              as={OrderedList}
              listStyleType='none'
              hugGrid={{
                base: ['content-start', 'content-end'],
                md: ['content-2', 'content-8'],
                lg: ['content-3', 'content-11']
              }}
              display='flex'
              flexFlow='column nowrap'
            >
              {events.map(({ event }) => {
                const eventData = event as Sure<Queries.Event>;
                return (
                  <ListItem key={eventData.cId} gridColumn='1/-1'>
                    <AgendaEvent
                      startingHLevel={3}
                      cId={eventData.cId}
                      title={eventData.title}
                      type={eventData.type}
                      date={eventData.date}
                      room={eventData.room}
                      people={eventData.people}
                    />
                  </ListItem>
                );
              })}
            </Hug>
          </Box>
        </Hug>
      )}
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
          gatsbyImageData(width: 296, placeholder: BLURRED, aspectRatio: 1)
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
