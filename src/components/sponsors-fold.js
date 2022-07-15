import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  listReset,
  media,
  themeVal,
  visuallyHidden
} from '@devseed-ui/theme-provider';

import { variableGlsp } from '$styles/variable-utils';
import { VarHeading, VarProse } from '$styles/variable-components';
import Hug from '$styles/hug';
import { Button } from '@devseed-ui/button';
import { CollecticonEnvelope } from '@devseed-ui/collecticons';
import { useMediaQuery } from '$utils/use-media-query';

const SponsorsFoldSelf = styled.section`
  display: flex;
  flex-flow: column;
  filter: drop-shadow(0 -8px 0 ${themeVal('color.secondary-500')});

  & + footer {
    border: 0;
  }
`;

const SponsorsFoldInner = styled(Hug).attrs({
  as: 'div'
})`
  color: ${themeVal('color.surface')};
  background: ${themeVal('color.base')};
  clip-path: polygon(0 0, 100% 28%, 100% 100%, 0% 100%);
  padding: ${variableGlsp(22, 0, 2, 0)};

  ${media.largeUp`
    padding: ${variableGlsp(8, 0, 2, 0)};
    clip-path: polygon(0 28%, 100% 0, 100% 100%, 0% 100%);
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
    margin: ${variableGlsp(6, 0, -20, 0)};
  `}

  ${media.largeUp`
    margin: ${variableGlsp(0, 0, -10, 0)};
  `}
`;

const SponsorsOutroInner = styled.div`
  padding: ${variableGlsp(2, 2, 2, 2)};
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
`;

const SponsorsGroup = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${variableGlsp()};

  &:nth-of-type(1) {
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-2 / content-8;
   `}

    ${media.largeUp`
      grid-column: content-start / content-7;
   `}
  }

  &:nth-of-type(2) {
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-2 / content-8;
   `}

    ${media.largeUp`
      grid-column: content-start / content-7;
   `}
  }

  &:nth-of-type(3) {
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-2 / content-8;
   `}

    ${media.largeUp`
      grid-column: content-7 / content-end;
   `}
  }

  &:nth-of-type(4) {
    grid-column: content-start / content-end;

    ${media.mediumUp`
      grid-column: content-2 / content-8;
   `}

    ${media.largeUp`
      grid-column: content-start / content-7;
   `}
  }
`;

const SponsorsGroupTitle = styled(VarHeading).attrs({
  as: 'h3',
  size: 'small'
})`
  /* styled-component */
`;

const SponsorsList = styled.ol`
  ${listReset()};
  display: flex;
  flex-direction: row;
  gap: ${variableGlsp()};
`;

const Sponsor = styled.a`
  display: block;
  transition: opacity 0.24s ease;

  &:hover {
    opacity: 0.64;
  }
`;

const SponsorTitle = styled.h4`
  ${visuallyHidden()};
`;

const sponsorsGroups = ['Hosts', 'Gold', 'Silver', 'Bronze'];

function SponsorsFold() {
  const { sponsors } = useStaticQuery(
    graphql`
      query {
        sponsors: allSponsor {
          nodes {
            id
            title
            url
            group
            image {
              childImageSharp {
                gatsbyImageData(width: 200, placeholder: BLURRED)
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
              <CollecticonEnvelope /> Contact us
            </Button>
          </div>
        </SponsorsOutroInner>
      </SponsorsOutro>
    </SponsorsFoldSelf>
  );
}

export default SponsorsFold;
