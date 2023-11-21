import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useToken } from '@chakra-ui/react';

interface SeoProps {
  description?: string;
  image?: string;
  title: string;
  children?: React.ReactNode;
}

export default function Seo(props: SeoProps) {
  const { description, image, title, children } = props;

  const { site } = useStaticQuery(graphql`
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
  `);

  const metaDescription = description || site.siteMetadata.description;
  const metaImage = image || '/meta/meta-image.png';
  const metaImageUrl = metaImage.match(/^https?:\/\//)
    ? metaImage
    : `${site.siteMetadata.siteUrl}${metaImage}`;

  const formattedTitle = `${title} — ${site.siteMetadata.title} ${site.siteMetadata.edition}`;

  const themeColor = useToken('colors', 'primary.500');

  return (
    <>
      <title>{formattedTitle}</title>
      <meta name='description' content={metaDescription} />
      <meta name='theme-color' content={themeColor} />

      <meta property='og:title' content={formattedTitle} />
      <meta property='og:type' content='article' />
      <meta property='og:url' content={site.siteMetadata.siteUrl} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:image' content={metaImageUrl} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content={site.siteMetadata.social.twitter} />
      <meta name='twitter:title' content={formattedTitle} />
      <meta name='twitter:description' content={metaDescription} />
      <meta name='twitter:image' content={metaImageUrl} />

      <link rel='icon' sizes='any' href='/meta/favicon.ico' />
      <link rel='icon' type='image/svg+xml' href='/meta/icon.svg' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/meta/apple-touch-icon.png'
      />
      <link rel='manifest' href='/meta/site.webmanifest' />
      {children}
    </>
  );
}
