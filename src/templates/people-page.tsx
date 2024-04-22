import * as React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';
import { getImage, ImageDataLike } from 'gatsby-plugin-image';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  ListItem,
  OrderedList
} from '@chakra-ui/react';
import { Hug } from '@devseed-ui/hug-chakra';
import { CollecticonLayoutGrid3x3 } from '@devseed-ui/collecticons-chakra';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import { MDXProse } from '$components/mdx-prose';
import SpeakerHero from '$components/speakers/speaker-hero';
import { AgendaEvent } from '$components/agenda/event';
import SmartLink from '$components/smart-link';

interface PeoplePageProps {
  people: Queries.People;
}

type Sure<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export default function PeoplePage(props: PageProps<PeoplePageProps>) {
  const {
    data: {
      people: { title, avatar, role, company, social, pronouns, events }
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
        social={social}
        image={getImage(avatar as unknown as ImageDataLike)!}
      />

      <Hug py={16}>
        <MDXProse
          gridColumn={{
            base: 'content-start / content-end',
            md: 'content-2 / content-8',
            lg: 'content-2 / content-12'
          }}
        >
          <Heading as='h2' size='2xl'>
            About
          </Heading>
          {children}
        </MDXProse>

        {!!events?.length && (
          <>
            <Divider
              gridColumn={{
                base: 'content-start / content-end',
                md: 'content-2 / content-8',
                lg: 'content-2 / content-12'
              }}
              size='md'
              borderColor='base.200a'
            />
            <Box
              gridColumn={{
                base: 'content-start / content-end',
                md: 'content-2 / content-8',
                lg: 'content-2 / content-11'
              }}
            >
              <Heading as='h2' size='2xl' mb={4}>
                On the agenda
              </Heading>

              <Hug
                as={OrderedList}
                listStyleType='none'
                hugGrid={{
                  base: ['content-start', 'content-end'],
                  md: ['content-2', 'content-8'],
                  lg: ['content-2', 'content-11']
                }}
                display='flex'
                flexFlow='column nowrap'
                ml={0}
              >
                {events.map(({ event }) => {
                  const eventData = event as Sure<Queries.Event>;
                  return (
                    <ListItem
                      key={eventData.cId}
                      gridColumn='1/-1'
                      _notFirst={{
                        borderTop: '4px solid',
                        borderTopColor: 'base.200a',
                        pt: { base: 4, md: 8, lg: 10 }
                      }}
                    >
                      <AgendaEvent
                        startingHLevel={3}
                        showDate
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
          </>
        )}

        <Divider
          gridColumn={{
            base: 'content-start / content-end',
            md: 'content-2 / content-8',
            lg: 'content-2 / content-12'
          }}
          size='sm'
          borderColor='base.200a'
        />

        <Flex
          gridColumn={{
            base: 'content-start / content-end',
            md: 'content-2 / content-8',
            lg: 'content-2 / content-12'
          }}
        >
          <Button
            as={SmartLink}
            noLinkStyles
            to='/speakers'
            variant='solid'
            colorScheme='primary'
            size={{ base: 'md', md: 'lg' }}
            leftIcon={<CollecticonLayoutGrid3x3 />}
          >
            View all speakers
          </Button>
        </Flex>
      </Hug>
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
      social {
        x
        linkedin
      }
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
