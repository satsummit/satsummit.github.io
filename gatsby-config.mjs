import { createRequire } from 'module';

import remarkGfm from 'remark-gfm';
import remarkExternalLinks from 'remark-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const require = createRequire(import.meta.url);

const pkg = require('./package.json');

const config = {
  siteMetadata: {
    siteUrl: 'https://2024.satsummit.io',
    title: 'SatSummit',
    subtitle: `Satellite data for global development`,
    edition: '2024',
    description: `SatSummit convenes leaders in the satellite industry and experts in global development for 2 days of presentations and in-depth conversations on solving the world's most critical development challenges with satellite data.`,
    author: {
      name: `Development Seed & DevGlobal`
    },
    social: {
      twitter: `@sat_summit`
    },
    eventDates: ['2024-05-16', '2024-05-17']
  },
  // More easily incorporate content into your pages through automatic
  // TypeScript type generation and better GraphQL IntelliSense. If you use
  // VSCode you can also use the GraphQL plugin Learn more at:
  // https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-5NPWQ998'
      }
    },
    'gatsby-plugin-image',
    // 'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              quality: 75
            }
          }
        ],
        mdxOptions: {
          remarkPlugins: [
            // Add GitHub Flavored Markdown (GFM) support
            remarkGfm,
            // To pass options, use a 2-element array with the
            // configuration in an object in the second element
            [remarkExternalLinks, { target: false }]
          ],
          rehypePlugins: [
            // Generate heading ids for rehype-autolink-headings
            rehypeSlug,
            // To pass options, use a 2-element array with the
            // configuration in an object in the second element
            [
              rehypeAutolinkHeadings,
              { behavior: `wrap`, properties: { class: 'anchor-heading' } }
            ]
          ]
        }
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {number} [portalZIndex=undefined]
         * The z-index to apply to all portal nodes. This is useful
         * if your app uses a lot z-index to position elements.
         */
        portalZIndex: undefined
      }
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google2: [
            {
              family: 'Barlow',
              axes: 'ital,wght@0,400;0,700;1,400;1,700'
            },
            {
              family: 'Barlow Condensed',
              axes: 'ital,wght@0,500;0,600;1,600;1,700'
            }
          ]
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'letter',
        path: './content/letter/'
      }
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `sponsor`,
        path: `./content/sponsors`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `event`,
        path: `./content/events`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `people`,
        path: `./content/people`
      }
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: pkg.alias,
        extensions: ['js', 'jsx', 'ts', 'tsx']
      }
    }
  ]
};

export default config;
