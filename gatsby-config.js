module.exports = {
  siteMetadata: {
    siteTitle: "JJ Photos",
    siteTitleAlt: "JJ Photos",
    siteHeadline: "JJ Photos",
    siteUrl: "https://jj.photos",
    siteDescription: "",
    siteLanguage: "en",
    siteImage: "/images/icon.png",
    author: "0xJ05H",
    basePath: "/",
  },
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-91566124-2",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    `gatsby-remark-images`,
    "gatsby-plugin-sharp",
    "gatsby-plugin-theme-ui",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    'gatsby-plugin-extract-image-colors'
  ],
};
