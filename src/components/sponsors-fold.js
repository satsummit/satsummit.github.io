import React from 'react';
import Slide from 'react-reveal/Slide';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import {
  listReset,
  media,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';

import { Button } from '@devseed-ui/button';
import { CollecticonEnvelope } from '@devseed-ui/collecticons';

import { variableGlsp } from '$styles/variable-utils';
import { VarHeading, VarProse } from '$styles/variable-components';
import Hug from '$styles/hug';

import { useMediaQuery } from '$utils/use-media-query';
import withReveal from '$utils/with-reveal';

const SponsorsFoldSelf = styled.section`
  display: flex;
  flex-flow: column;
  filter: drop-shadow(0 -8px 0 ${themeVal('color.secondary-500')});
  margin-top: ${variableGlsp(2)};

  /* Improve performance */
  transform: translate3d(0, 0, 0);
`;

const SponsorsFoldInner = styled(Hug).attrs({
  as: 'div'
})`
  color: ${themeVal('color.surface')};
  background: ${themeVal('color.base')};
  clip-path: polygon(0 0, 100% 16rem, 100% 100%, 0% 100%);
  padding: ${variableGlsp(22, 0, 2, 0)};

  ${media.mediumUp`
    padding-top: ${variableGlsp(18)};
  `}

  ${media.largeUp`
    clip-path: polygon(0 16rem, 100% 0, 100% 100%, 0% 100%);
    padding-top: ${variableGlsp(14)};
  `}

  ${media.xlargeUp`
    padding-top: ${variableGlsp(10)};
  `}
`;

const SponsorsTitle = styled(VarHeading).attrs({
  as: 'h2',
  size: 'xlarge'
})`
  grid-column: content-start / content-end;

  ${media.mediumUp`
    grid-column: content-2 / content-8;
  `}

  ${media.largeUp`
    grid-column: content-start / content-7;
  `}
`;

const SponsorsOutro = styled(Hug).attrs({
  as: 'section'
})`
  position: relative;
  z-index: 1;
  order: -1;
  margin: ${variableGlsp(2, 0, -20, 0)};

  ${media.smallUp`
    margin: ${variableGlsp(4, 0, -20, 0)};
  `}

  ${media.mediumUp`
    margin: ${variableGlsp(2, 0, -16, 0)};
  `}

  ${media.largeUp`
    margin: ${variableGlsp(0, 0, -14, 0)};
  `}

  ${media.xlargeUp`
    margin-bottom: ${variableGlsp(-10)};
  `}
`;

const SponsorsOutroInner = withReveal(
  styled.div`
    padding: ${variableGlsp(2)};
    display: flex;
    flex-direction: column;
    gap: ${variableGlsp()};
    background: ${themeVal('color.surface')};
    color: ${themeVal('color.base')};
    border-radius: 0 0 ${themeVal('shape.rounded')} ${themeVal('shape.rounded')};
    box-shadow: ${themeVal('boxShadow.elevationD')};
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-2 / content-8;
    `}

    ${media.largeUp`
      grid-column: content-7 / content-end;
    `}
  `,
  <Slide bottom />
);

const SponsorsGroup = styled(Hug).attrs({
  grid: {
    smallUp: ['content-start', 'content-end'],
    mediumUp: ['content-2', 'content-8'],
    largeUp: ['content-start', 'content-end']
  }
})`
  grid-column: content-start / content-end;

  ${media.mediumUp`
    grid-column: content-2 / content-8;
  `}

  ${media.largeUp`
    grid-column: content-start / content-end;
  `}
`;

const SponsorsGroupTitle = styled(VarHeading).attrs({
  as: 'h3',
  size: 'small'
})`
  grid-column: content-start / content-end;

  ${media.mediumUp`
    grid-column: content-2 / content-8;
  `}

  ${media.largeUp`
    grid-column: content-start / content-end;
  `}
`;

const SponsorsList = styled(Hug).attrs({
  as: 'ol',
  grid: {
    smallUp: ['content-start', 'content-end'],
    mediumUp: ['content-2', 'content-8'],
    largeUp: ['content-start', 'content-end']
  }
})`
  ${listReset()};
  grid-column: content-start / content-end;
  align-items: middle;
  color: ${themeVal('color.base')};

  ${media.mediumUp`
    grid-column: content-2 / content-8;
  `}

  ${media.largeUp`
    grid-column: content-start / content-end;
  `}

  li {
    grid-column-end: span 2;
    display: flex;
    align-items: center;
    min-height: 6rem;
    filter: drop-shadow(0 -4px 0 ${themeVal('color.secondary-500')});

    ${media.smallUp`
      grid-column-end: span 2;
    `}

    ${media.largeUp`
      grid-column-end: span 4;
    `}

    ${media.xlargeUp`
      grid-column-end: span 3;
    `}
  }
`;

const Sponsor = styled.a`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: inherit;
  text-decoration: none;
  padding: ${variableGlsp()};
  background: ${themeVal('color.surface')};
  border-radius: 0 0 ${themeVal('shape.rounded')} ${themeVal('shape.rounded')};
  box-shadow: ${themeVal('boxShadow.elevationD')};

  &:hover {
    > * {
      opacity: 0.64;
      transition: opacity 0.24s ease-in-out;
    }
  }

  /* Adjust image optical size */

  .sponsor-azavea {
    transform: scale(0.9);
  }

  .sponsor-capella-space {
    transform: scale(1.2);
  }

  .sponsor-cyient {
    transform: scale(0.72);
  }

  .sponsor-development-seed {
    transform: scale(0.84);
  }

  .sponsor-esa {
    transform: scale(0.88);
  }

  .sponsor-esri {
    transform: scale(1.08);
  }

  .sponsor-locana {
    transform: scale(0.84);
  }

  .sponsor-nasa {
    transform: scale(1.28);
  }

  .sponsor-picterra {
    transform: scale(0.9);
  }

  .sponsor-place {
    transform: scale(0.78);
  }

  .sponsor-planet {
    transform: scale(1.2);
  }

  .sponsor-sparkgeo {
    transform: scale(1.02);
  }

  .sponsor-tiledb {
    transform: scale(0.74);
  }

  .sponsor-umbra {
    transform: scale(0.68);
  }

  .sponsor-wbg {
    transform: scale(1.2);
  }

  .sponsor-element84 {
    transform: scale(0.9);
  }
`;

const SponsorTitle = styled.h4`
  ${visuallyHidden()};
`;

const sponsorsGroups = ['Gold', 'Silver', 'Bronze', 'Supporters', 'Hosts'];

function SponsorsFold() {
  const { sponsors } = useStaticQuery(
    graphql`
      query {
        sponsors: allSponsor(
          sort: { fields: [slug], order: ASC }
          filter: { published: { eq: true } }
        ) {
          nodes {
            id
            title
            slug
            url
            group
            image {
              childImageSharp {
                gatsbyImageData(
                  height: 56
                  placeholder: BLURRED
                  transformOptions: { fit: CONTAIN }
                  formats: PNG
                  backgroundColor: "#FFFFFF"
                )
              }
            }
          }
        }
      }
    `
  );

  const { isLargeUp } = useMediaQuery();

  return (
    <SponsorsFoldSelf>
      <SponsorsFoldInner>
        <SponsorsTitle>Sponsors</SponsorsTitle>

        {sponsorsGroups.map((groupName) => {
          const items = sponsors.nodes.filter(
            (node) => node.group === groupName
          );

          if (!items.length) {
            return null;
          }

          return (
            <SponsorsGroup key={groupName}>
              <SponsorsGroupTitle>{groupName}</SponsorsGroupTitle>
              <SponsorsList>
                {items.map((node) => {
                  const image = getImage(node.image);

                  return (
                    <li key={node.id}>
                      <Sponsor href={node.url}>
                        <SponsorTitle>{node.title}</SponsorTitle>
                        <GatsbyImage
                          image={image}
                          className={`sponsor-${node.slug}`}
                          alt={`Logo for ${node.title}`}
                        />
                      </Sponsor>
                    </li>
                  );
                })}
              </SponsorsList>
            </SponsorsGroup>
          );
        })}
      </SponsorsFoldInner>

      <SponsorsOutro>
        <SponsorsOutroInner>
          <VarProse>
            <h2>Become a sponsor</h2>
            <p>
              We&apos;re excited to partner with thought and industry leaders in
              the satellite and development communities, and through their
              sponsorship and support of <strong>SatSummit</strong>, we are
              solving real-world and global development challenges.
            </p>
          </VarProse>
          <div>
            <Button
              forwardedAs='a'
              variation='base-fill'
              href='mailto:info@satsummit.io'
              size={isLargeUp ? 'xlarge' : 'large'}
              fitting='relaxed'
            >
              <CollecticonEnvelope /> Get in touch
            </Button>
          </div>
        </SponsorsOutroInner>
      </SponsorsOutro>
    </SponsorsFoldSelf>
  );
}

export default SponsorsFold;
