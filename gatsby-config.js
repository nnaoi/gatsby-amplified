require('dotenv').config();
const { createProxyMiddleware } = require("http-proxy-middleware") //v1.x.x
// Use implicit require for v0.x.x of 'http-proxy-middleware'
// const proxy = require('http-proxy-middleware')
// be sure to replace 'createProxyMiddleware' with 'proxy' where applicable

module.exports = {
  siteMetadata: {
    siteUrl: `https://gatsby-typescript-tailwind.netlify.app/`,
    title: `Gatsby Typescript Tailwind`,
    description: `An example config of Gatsby + TypeScript + Tailwind CSS`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-graphql`,
      options: { 
        typeName: `Todo`,
        fieldName: `gatsbyamplified`,
        url: `${process.env.AWS_APPSYNC_GRAPHQLENDPOINT}`,
        headers: {
          'x-api-key': `${process.env.AWS_APPSYNC_APIKEY}`
        },
        // gatsby develop 実行時に何秒ごとにappsyncからデータを拾ってくるか。
        refetchInterval: 60,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        tailwind: true,
        purgeOnly: ["src/css/index.css"],
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        codegen: false, // 毎回生成すると遅くなる。したいときtrue。
        documentPaths: [
          "./src/**/*.{ts,tsx}",
          // './node_modules/gatsby-*/**/*.js',
          // './gatsby-node.ts',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `docs/logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        test: /\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ["develop", "build-javascript"],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
        configPath: require.resolve(`./i18n/config.json`),
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-i18next`,
      options: {
        locales: `./i18n/react-i18next`,
        i18nextOptions: {
          ns: ["translation"],
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      createProxyMiddleware({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    )
  },
}
