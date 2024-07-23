import React, { useMemo } from 'react';
import { PageProps, graphql, type HeadFC } from 'gatsby';
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  StaticImage
} from 'gatsby-plugin-image';
import { format, isFuture, isToday } from 'date-fns';
import {
  Box,
  Container,
  Divider,
  Heading,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';
import { CollecticonExpandTopRight } from '@devseed-ui/collecticons-chakra';

import cloudSmallUrl from '$images/banner/banner--cloud-small@2x.png';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';
import SmartLink from '$components/smart-link';
import { PageHero } from '$components/page-hero';
import { utcString2userTzDate } from '$utils/date';

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

  const [upcoming, past] = useMemo(
    () =>
      data.allEdition.nodes.reduce(
        (acc, edition) => {
          const current = edition.dates?.some((date) => {
            const d = utcString2userTzDate(date);
            return isToday(d) || isFuture(d);
          });
          if (current) {
            return [[...acc[0], edition], acc[1]];
          } else {
            return [acc[0], [...acc[1], edition]];
          }
        },
        [[], []] as PageQueryEdition[][]
      ),
    [data.allEdition.nodes]
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
        maxW='container.lg'
        display='flex'
        flexFlow='column'
        gap={{ base: '4', md: '8' }}
      >
        <Heading size='lg'>Upcoming</Heading>
        <List display='flex' flexDir='column' gap={4}>
          {upcoming.map((edition) => (
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
        <List display='grid' gap={4} gridTemplateColumns='1fr 1fr'>
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
                  src='../images/editions/washington22.jpg'
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
                  src='../images/editions/washington22.jpg'
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
                  src='../images/editions/washington22.jpg'
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
                  src='../images/editions/washington22.jpg'
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

interface EditionCardProps {
  title: string;
  url: string;
  isExternal?: boolean;
  dates: Date[];
  image?: React.ReactElement | IGatsbyImageData;
}
function EditionCard(props: EditionCardProps) {
  const { title, url, isExternal, dates, image } = props;

  return (
    <SmartLink
      to={url}
      borderRadius='sm'
      display='flex'
      flexDir='column'
      justifyContent='end'
      h='100%'
      color='surface.500'
      _hover={{
        textDecoration: 'none',
        transform: 'translateY(-2px)'
      }}
      p={{ base: 4, md: 8 }}
      gap={4}
      position='relative'
      sx={{
        '.gatsby-image-wrapper': {
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none'
        }
      }}
      minH='12rem'
      overflow='hidden'
      bgColor='primary.800'
      bgImage={`url('${cloudSmallUrl}')`}
      bgRepeat='no-repeat'
      bgSize='auto 70%'
      bgPosition='calc(100% + 8rem) bottom'
      // Override background if image is provided.
      bg={image ? 'none' : undefined}
    >
      {image ? (
        React.isValidElement(image) ? (
          image
        ) : (
          <GatsbyImage image={image as IGatsbyImageData} alt={title} />
        )
      ) : null}
      {isExternal && (
        <Box position='absolute' right={0} top={0} p={4} bg='primary.500'>
          <CollecticonExpandTopRight display='block' />
        </Box>
      )}
      <Box>
        <Heading size='xl'>{title}</Heading>
        <Text fontSize='sm' fontStyle='initial'>
          {multiDateDisplay(dates)}
        </Text>
      </Box>
      <Text>Satellite data for global development.</Text>
    </SmartLink>
  );
}

// Creates a human readable string of dates without much repetition.
// Groups by year and month, then lists the days.
// Example:
// The dates: [2022-09-28, 2022-09-29, 2022-10-01, 2022-01-01]
// Will be displayed as:
// September 28 & 29 & October 01, 2022 & January 01, 2022
function multiDateDisplay(dates: Date[]) {
  const group = dates.reduce(
    (acc, date) => {
      // Group by month and year
      const y = date.getFullYear();
      const m = date.getMonth();

      const yGroup = acc[y] || {};
      const mGroup = yGroup[m] || [];

      return {
        ...acc,
        [y]: {
          ...yGroup,
          [m]: [...mGroup, date]
        }
      };
    },
    {} as Record<number, Record<number, Date[]>>
  );

  return Object.entries(group)
    .map(([y, yGroup]) => {
      const months = Object.entries(yGroup).map(([, mGroup]) => {
        const days = mGroup.map((d) => format(d, 'dd')).join(' & ');
        return `${format(mGroup[0], 'MMMM')} ${days}`;
      });
      return `${months.join(' & ')}, ${y}`;
    })
    .join(' & ');
}
