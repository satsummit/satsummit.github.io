const pkg = require('./package.json');

module.exports = {
  pathPrefix: '',
  siteMetadata: {
    siteUrl: 'https://satsummit.io',
    title: 'Satsummit',
    author: {
      name: `Development Seed`
    },
    description: `A one day of presentations and discussions about satellite imagery and data processing capabilities that brings together the satellite industry and the global development leaders.`,
    social: {
      twitter: `@sat_summit`
    }
  },
  plugins: [
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
              axes: 'ital,wght@0,500;1,500'
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
    'gatsby-plugin-styled-components',
    // {
    //   resolve: "gatsby-plugin-google-analytics",
    //   options: {
    //     trackingId: "",
    //   },
    // },
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
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: pkg.alias,
        extensions: ['js', 'jsx', 'ts', 'tsx']
      }
    }
  ]
};
