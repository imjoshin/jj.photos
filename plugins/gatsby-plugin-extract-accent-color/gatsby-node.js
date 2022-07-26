const fs = require('fs')
const Vibrant = require('node-vibrant')
const Color = require('color')

const defaultOptions = {
  extensions: ['jpg', 'png'],
  exclude: [],
  directories: [],
}

const getHex = rgb => {
  return Color({
    r: rgb[0],
    g: rgb[1],
    b: rgb[2]
  }).hex()
}

const CACHE_FILE = '.cache/extracted-accent-colors.json'

const getCache = () => {
  try {
    const contents = fs.readFileSync(CACHE_FILE)
    return JSON.parse(contents.toString())
  } catch {
    return {}
  }
}

const writeCache = (contents) => {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(contents, null, 2))
}

exports.onCreateNode = async ({ node, actions, reporter }, pluginOptions) => {
  const options = Object.assign({}, { ...defaultOptions, ...pluginOptions })

  if (
    options &&
    options.extensions &&
    options.exclude &&
    options.extensions.indexOf(node.extension) !== -1 &&
    options.exclude.indexOf(`${node.name}${node.ext}`) === -1
  ) {
    // TODO this is bad but it works for now
    if (options.directories) {
      const isDirectoryIncluded = options.directories.some(
        d => node.absolutePath.indexOf(d) >= 0
      )

      if (!isDirectoryIncluded) {
        return
      }
    }

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
      let cache = getCache()

      if (cache && cache[node.absolutePath]) {
        return cache[node.absolutePath]
      }

      // Transform the new node here and create a new node or
      // create a new node field.
      await Vibrant.from(node.absolutePath).getPalette((err, palette) => {
        if (err) {
          reporter.warn(`Encountered an error while processing ${node.absolutePath}: ${err}`)
          return
        }

        if (!palette || !palette.Vibrant) {
          reporter.warn(`Encountered an error getting the pallete while processing ${node.absolutePath}`)
          return
        }
        
        const color = getHex(palette.Vibrant._rgb)

        actions.createNodeField({
          node,
          name: `accentColor`,
          value: color,
        })

        cache = getCache()
        cache[node.absolutePath] = color
        writeCache(cache)
      })
    }
  }
}
