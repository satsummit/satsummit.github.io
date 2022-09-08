const pkg = require('./package.json');

module.exports = {
  pathPrefix: '',
  siteMetadata: {
    siteUrl: 'https://2022.satsummit.io',
    title: 'SatSummit',
    subtitle: `Satellite data for global development`,
    edition: '2022',
    description: `SatSummit convenes leaders in the satellite industry and experts in global development for 2 days of presentations and in-depth conversations on solving the world's most critical development challenges with satellite data.`,
    author: {
      name: `Cyient, Development Seed & DevGlobal`
    },
    social: {
      twitter: `@sat_summit`
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-K18ZKYSQBS']
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
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://developmentseed.us11.list-manage.com/subscribe/post?u=83197aba6c63ace1729a7beff&amp;id=73c42dcaab',
        timeout: 3500
      }
    },
    'gatsby-transformer-yaml',
    'gatsby-transformer-remark',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 100
        }
      }
    },
    'gatsby-transformer-sharp',
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
        name: `letter`,
        path: `${__dirname}/content/letter`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `sponsor`,
        path: `${__dirname}/content/sponsors`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `event`,
        path: `${__dirname}/content/events`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `people`,
        path: `${__dirname}/content/people`
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
