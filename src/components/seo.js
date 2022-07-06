import React from 'react';
import T from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ description, lang, meta, image, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            edition
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaImage = image || '/meta/default-meta-image.png';
  const metaImageUrl = metaImage.match(/^https?:\/\//)
    ? metaImage
    : `${site.siteMetadata.siteUrl}${metaImage}`;

  const formattedTitle = `${title} — ${site.siteMetadata.title} ${site.siteMetadata.edition}`;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={formattedTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          name: 'theme-color',
          content: '#FFFFFF'
        },
        {
          property: `og:title`,
          content: formattedTitle
        },
        {
          property: `og:type`,
          content: 'article'
        },
        {
          property: `og:url`,
          content: site.siteMetadata.siteUrl
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:image`,
          content: metaImageUrl
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter
        },
        {
          name: `twitter:title`,
          content: formattedTitle
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        {
          name: `twitter:image`,
          content: metaImageUrl
        }
      ].concat(meta)}
    >
      <link
        rel='icon'
        type='image/png'
        sizes='96x96'
        href='/meta/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='192x192'
        href='/meta/apple-touch-icon.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/meta/apple-touch-icon.png'
      />
    </Helmet>
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};

SEO.propTypes = {
  description: T.string,
  lang: T.string,
  meta: T.arrayOf(T.object),
  title: T.string.isRequired,
  image: T.string
};

export default SEO;
