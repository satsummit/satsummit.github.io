import * as React from 'react';
import { PageProps, graphql, type HeadFC } from 'gatsby';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';
import { CollecticonExpandTopRight } from '@devseed-ui/collecticons-chakra';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import SmartLink from '$components/smart-link';
import { PageHero } from '$components/page-hero';

import { multiDateDisplay, utcString2userTzDate } from '$utils/date';

interface PageQuery {
  allEdition: {
    nodes: {
      name: string;
      cId: string;
      dates: string[];
      tickets?: {
        url: string;
        description: string;
        status: string;
      };
    }[];
  };
  site: { siteMetadata: { eventDates: string[] } };
}

export default function IndexPage(props: PageProps<PageQuery>) {
  const { data } = props;

  return (
    <PageLayout>
      <PageHero title='Tickets' lead="Get'em while they're hot" />
      <Container
        py={{ base: '8', lg: '16' }}
        px={{ base: '4', md: '8' }}
        maxW='container.lg'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <List>
          {data.allEdition.nodes
            .filter((e) => e.dates?.length)
            .map((edition) => (
              <ListItem
                key={edition.cId}
                _notFirst={{
                  borderTop: '8px solid',
                  borderTopColor: 'base.200a'
                }}
              >
                <EditionEntry edition={edition} />
              </ListItem>
            ))}
        </List>
      </Container>
    </PageLayout>
  );
}

function getEventStatus(edition: PageQuery['allEdition']['nodes'][0]) {
  const lastDate = utcString2userTzDate(
    edition.dates[edition.dates.length - 1]
  );

  if (lastDate < new Date()) return 'finished';

  const status = edition.tickets?.status;

  if (status === 'sold-out') return 'sold-out';

  if (status === 'live' && edition.tickets?.url) return 'live';

  return 'coming-soon';
}

function EditionEntry(props: { edition: PageQuery['allEdition']['nodes'][0] }) {
  const { edition } = props;

  const status = getEventStatus(edition);

  return (
    <Flex
      py={8}
      gap={{ base: 4, md: 8 }}
      opacity={['finished', 'sold-out'].includes(status) ? 0.4 : 1}
      direction={{ base: 'column', md: 'row' }}
    >
      <Box width={{ base: 'auto', md: '14rem', lg: '16rem' }}>
        <Heading as='h2' size='2xl'>
          {edition.name}
        </Heading>
        <Heading as='p' size='lg'>
          {multiDateDisplay(edition.dates.map((d) => utcString2userTzDate(d)))}
        </Heading>
      </Box>
      {edition.tickets?.description && (
        <Text
          maxW='30rem'
          sx={{
            a: {
              color: 'primary.500',
              _hover: {
                textDecoration: 'underline'
              }
            }
          }}
          dangerouslySetInnerHTML={{ __html: edition.tickets.description }}
        />
      )}
      <Flex
        width={{ base: 'auto', md: '7rem', lg: '9rem' }}
        ml='auto'
        justifyContent={{ base: 'left', md: 'right' }}
      >
        {status === 'finished' ? (
          <Heading as='p' size='sm'>
            Event has passed
          </Heading>
        ) : status === 'sold-out' ? (
          <Heading as='p' size='sm'>
            Sold out
          </Heading>
        ) : status === 'live' ? (
          <Button
            as={SmartLink}
            to={edition.tickets!.url}
            colorScheme='primary'
            borderRadius='xs'
            size='sm'
            rightIcon={<CollecticonExpandTopRight />}
          >
            Book ticket
          </Button>
        ) : (
          <Heading as='p' size='sm'>
            Coming soon
          </Heading>
        )}
      </Flex>
    </Flex>
  );
}

export const pageQuery = graphql`
  query {
    allEdition(
      sort: { dates: DESC }
      filter: { tickets: { status: { ne: "hide" } } }
    ) {
      nodes {
        cId
        name
        dates
        tickets {
          url
          description
          status
        }
      }
    }
  }
`;

export const Head: HeadFC = () => (
  <Seo title='Tickets' description='Get your SatSummit ticket.' />
);
