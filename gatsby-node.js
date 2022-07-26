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
      path: `${edge.node.name.slice(2)}`,
      component: galleryTemplate,
      context: {
        name: edge.node.name.slice(2),
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const parent = getNode(node.parent)

  if (
    node.internal.type === `ImageSharp` && 
    parent.absolutePath.indexOf("src/images/gallery") >= 0
  ) {
    const pathRegex = /src\/images\/gallery\/\d+-([^\/]+)\//
    const pathRegexMatch = parent.absolutePath.match(pathRegex)

    if (pathRegexMatch) {
      createNodeField({
        node,
        name: `gallery`,
        value: pathRegexMatch[1],
      })
    }
  }
}