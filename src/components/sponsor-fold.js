import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const SponsorFold = () => {
  const { sponsors } = useStaticQuery(
    graphql`
      query {
        sponsors: allMarkdownRemark(
          filter: { fields: { type: { eq: "sponsor" } } }
        ) {
          nodes {
            id
            html
            frontmatter {
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
      }
    `
  );

  return (
    <div>
      {sponsors.nodes.map((node) => {
        const image = getImage(node.frontmatter.image);
        return (
          <div key={node.id}>
            <h2>
              <a href={node.frontmatter.url}>{node.frontmatter.title}</a>
            </h2>
            <GatsbyImage
              image={image}
              alt={`Logo for ${node.frontmatter.title}`}
            />
            <p>{node.frontmatter.group}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SponsorFold;
