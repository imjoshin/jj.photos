const standardBasePath = `/`

exports.createPages = async ({ actions }, themeOptions) => {
  // const { createPage } = actions

  // const basePath = themeOptions.basePath || standardBasePath

  // createPage({
  //   path: basePath,
  //   component: require.resolve(`./src/templates/home.tsx`),
  // })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // TODO add blog path

  if (node.internal.type === `ImageSharp`) {
    const parent = getNode(node.parent)

    createNodeField({
      node,
      name: `absolutePath`,
      value: parent.absolutePath,
    })

    createNodeField({
      node,
      name: `relativePath`,
      value: parent.relativePath,
    })

    createNodeField({
      node,
      name: `relativeDirectory`,
      value: parent.relativeDirectory,
    })
  }
}