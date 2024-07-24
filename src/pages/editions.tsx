import React from 'react';
import { PageProps, graphql, type HeadFC } from 'gatsby';
import {
  getImage,
  IGatsbyImageData,
  StaticImage
} from 'gatsby-plugin-image';
import {
  Container,
  Divider,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';


import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import { PageHero } from '$components/page-hero';
import { utcString2userTzDate } from '$utils/date';
import { useFuturePastEditions } from '$utils/use-future-past-edition';
import { EditionCard } from '$components/editions/edition-card';

interface PageQueryEdition {
  name: string;
  cId: string;
  dates?: string[];
  card: {
    src: IGatsbyImageData;
  };
}

interface PageQuery {
  allEdition: {
    nodes: PageQueryEdition[];
  };
  site: { siteMetadata: { eventDates: string[] } };
}

export default function IndexPage(props: PageProps<PageQuery>) {
  const { data } = props;

  const [future, past] = useFuturePastEditions<PageQueryEdition>(
    data.allEdition.nodes
  );

  return (
    <PageLayout>
      <PageHero
        title='Editions'
        lead='Every place where you can find satsummit'
      />
      <Container
        py={{ base: '8', lg: '16' }}
        px={{ base: '4', md: '8' }}
        maxW='container.xl'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <Heading size='lg'>Upcoming</Heading>
        <List display='flex' flexDir='column' gap={4}>
          {future.map((edition) => (
            <ListItem key={edition.cId}>
              <EditionCard
                title={edition.name}
                url={`/${edition.cId}`}
                dates={edition.dates?.map(utcString2userTzDate) || []}
                image={getImage(edition.card?.src)}
              />
            </ListItem>
          ))}
        </List>
        <Divider borderColor='base.200a' size='sm' orientation='horizontal' />
        <Heading size='lg'>Past</Heading>
        <List
          display='grid'
          gap={{ base: 4, md: 8 }}
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
        >
          {past.map((edition) => (
            <ListItem key={edition.cId}>
              <EditionCard
                title={edition.name}
                url={`/${edition.cId}`}
                dates={edition.dates?.map(utcString2userTzDate) || []}
                image={getImage(edition.card?.src)}
              />
            </ListItem>
          ))}
          <ListItem>
            <EditionCard
              title={`Washington DC '22`}
              url='https://2022.satsummit.io/'
              dates={[
                utcString2userTzDate('2022-09-28T00:00:00Z'),
                utcString2userTzDate('2022-09-29T00:00:00Z')
              ]}
              image={
                <StaticImage
                  src='../images/editions/external-edition.jpg'
                  alt='Washington DC 2022'
                />
              }
              isExternal
            />
          </ListItem>
          <ListItem>
            <EditionCard
              title={`Washington DC '18`}
              url='https://2018.satsummit.io/'
              dates={[
                utcString2userTzDate('2018-09-19T00:00:00Z'),
                utcString2userTzDate('2018-09-20T00:00:00Z')
              ]}
              image={
                <StaticImage
                  src='../images/editions/external-edition.jpg'
                  alt='Washington DC 2018'
                />
              }
              isExternal
            />
          </ListItem>
          <ListItem>
            <EditionCard
              title={`Washington DC '17`}
              url='https://2017.satsummit.io/'
              dates={[utcString2userTzDate('2017-01-31T00:00:00Z')]}
              image={
                <StaticImage
                  src='../images/editions/external-edition.jpg'
                  alt='Washington DC 2017'
                />
              }
              isExternal
            />
          </ListItem>
          <ListItem>
            <EditionCard
              title={`Washington DC '15`}
              url='https://2015.satsummit.io/'
              dates={[utcString2userTzDate('2015-11-09T00:00:00Z')]}
              image={
                <StaticImage
                  src='../images/editions/external-edition.jpg'
                  alt='Washington DC 2015'
                />
              }
              isExternal
            />
          </ListItem>
        </List>
      </Container>
    </PageLayout>
  );
}

export const pageQuery = graphql`
  query {
    allEdition(sort: { dates: DESC }) {
      nodes {
        name
        cId
        dates
        card {
          src {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                width: 700
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <Seo title='Welcome' />;
