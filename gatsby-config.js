module.exports = {
  siteMetadata: {
    siteTitle: "JJ Photos",
    siteTitleAlt: "JJ Photos",
    siteHeadline: "JJ Photo",
    siteUrl: "https://jj.photos",
    siteDescription: "",
    siteLanguage: "en",
    siteImage: "/images/icon.png",
    author: "",
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
    "gatsby-plugin-mdx",
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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: "./src/markdown/blog/",
      },
      __key: "blog",
    },
  ],
};
