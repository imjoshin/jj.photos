const fs = require('fs')
const Vibrant = require('node-vibrant')
const Color = require('color')

const defaultOptions = {
  extensions: ['jpg', 'png'],
  exclude: []
}

const getHex = rgb => {
  return Color({
    r: rgb[0],
    g: rgb[1],
    b: rgb[2]
  }).hex()
}

exports.onCreateNode = async ({ node, actions, reporter, cache }, pluginOptions) => {
  const options = Object.assign({}, { ...defaultOptions, ...pluginOptions })

  if (
    options &&
    options.extensions &&
    options.exclude &&
    options.extensions.indexOf(node.extension) !== -1 &&
    options.exclude.indexOf(`${node.name}${node.ext}`) === -1
  ) {
    // allow file name override
    const imageColorRegex = /-c([A-F0-9]{6})/
    const colorMatch = node.name.match(imageColorRegex)
    
    if (colorMatch) {
      actions.createNodeField({
        node,
        name: `accentColor`,
        value: `#${colorMatch[1]}`,
      })
    } else {
      const cachedValue = await cache.get(node.absolutePath)

      if (cachedValue) {
        return cachedValue
      }

      let color = '#FFFFFF'

      await Vibrant.from(node.absolutePath).getPalette((err, palette) => {
        if (err) {
          reporter.warn(`Encountered an error while processing ${node.absolutePath}: ${err}`)
          return
        }

        if (!palette || !palette.Vibrant) {
          reporter.warn(`Encountered an error getting the pallete while processing ${node.absolutePath}`)
          return
        }
        
        color = getHex(palette.Vibrant._rgb)

        actions.createNodeField({
          node,
          name: `accentColor`,
          value: color,
        })
      })

      await cache.set(node.absolutePath, color)
    }
  }
}
