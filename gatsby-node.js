const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const galleryTemplate = path.resolve(`src/components/pages/gallery/index.ts`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  const galleries = await graphql(`
    query {
      allDirectory(filter: {absolutePath: {regex: "/images/gallery/.+/"}}) {
        edges {
          node {
            name
          }
        }
      }
    }
  `)

  galleries.data.allDirectory.edges.forEach(edge => {
    createPage({
      path: `${edge.node.name}`,
      component: galleryTemplate,
      context: {
        name: edge.node.name,
      },
    })
  })
}