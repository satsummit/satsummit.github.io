import * as React from 'react';
import { graphql, HeadProps, type PageProps } from 'gatsby';
import { getImage, ImageDataLike } from 'gatsby-plugin-image';
import {
  Box,
  Button,
  Separator,
  Flex,
  Heading,
  ListItem,
  ListRoot
} from '@chakra-ui/react';
import { Hug } from '@devseed-ui/hug-chakra';
import { CollecticonLayoutGrid3X3 } from '@devseed-ui/collecticons-chakra';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import { MDXProse } from '$components/mdx-prose';
import SpeakerHero from '$components/speakers/speaker-hero';
import { AgendaEvent } from '$components/agenda/event';
import SmartLink from '$components/smart-link';
import { Sure } from '$utils/utils';

interface PeoplePageProps extends Queries.EditionContextualDataFragment {
  people: Queries.People;
}

export default function PeoplePage(
  props: PageProps<PeoplePageProps, { editionCId: string }>
) {
  const {
    data: {
      people: { title, avatar, role, company, social, pronouns, events }
    },
    children
  } = props;

  const { editionCId } = props.pageContext;

  return (
    <PageLayout pageProps={props}>
      <SpeakerHero
        title={title!}
        role={role}
        company={company}
        pronouns={pronouns}
        social={social}
        image={
          avatar ? getImage(avatar as unknown as ImageDataLike)! : undefined
        }
      />

      <Hug py={16} rowGap={{ lg: 12 }}>
        <MDXProse
          gridColumn={{
            base: 'content-start / content-end',
            md: 'content-2 / content-8',
            lg: 'content-3 / content-11'
          }}
        >
          <Heading as='h2' size='2xl'>
            About
          </Heading>
          {children}
        </MDXProse>

        {!!events?.length && (
          <>
            <Separator
              gridColumn={{
                base: 'content-start / content-end',
                md: 'content-2 / content-8',
                lg: 'content-3 / content-11'
              }}
              size='md'
              borderColor='basi.200a'
            />
            <Box
              gridColumn={{
                base: 'content-start / content-end',
                md: 'content-2 / content-8',
                lg: 'content-3 / content-11'
              }}
            >
              <Heading as='h2' size='2xl' mb={4}>
                On the agenda
              </Heading>

              <Hug
                as={ListRoot}
                listStyleType='none'
                hugGrid={{
                  base: ['content-start', 'content-end'],
                  md: ['content-2', 'content-8'],
                  lg: ['content-3', 'content-11']
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
                        borderTopColor: 'basi.200a',
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

        <Separator
          gridColumn={{
            base: 'content-start / content-end',
            md: 'content-2 / content-8',
            lg: 'content-3 / content-11'
          }}
          size='sm'
          borderColor='basi.200a'
        />

        <Flex
          gridColumn={{
            base: 'content-start / content-end',
            md: 'content-2 / content-8',
            lg: 'content-3 / content-11'
          }}
        >
          <Button
            asChild
            variant='solid'
            colorPalette='primary'
            size={{ base: 'md', md: 'lg' }}
          >
            <SmartLink to={`/${editionCId}/speakers`} unstyled>
              <CollecticonLayoutGrid3X3 />
              View all speakers
            </SmartLink>
          </Button>
        </Flex>
      </Hug>
    </PageLayout>
  );
}

export const query = graphql`
  query ($id: String, $editionCId: String = "") {
    ...EditionContextualData
    people(id: { eq: $id }) {
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
      events(editionCId: $editionCId) {
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

export const Head = (
  props: HeadProps<PeoplePageProps, Queries.EditionContextualDataFragment>
) => {
  return <Seo title={props.data.people.title!} edition={props.data.edition} />;
};
