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
