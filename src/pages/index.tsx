import * as React from "react"
import { Home } from "../components/pages/home"
import { graphql } from "gatsby"

const HomePage = ({data}) => {
  const heroImages = data.allFile.edges
    .map(image => ({
      src: image.node.childImageSharp.fluid.src,
      aspectRatio: image.node.childImageSharp.fluid.aspectRatio,
      colors: image.node.fields.colors,
    }))

  return <Home images={heroImages} />
}

export const query = graphql`
  query {
    allFile(
      filter: {extension: {in: ["jpg", "png"]}, absolutePath: {regex: "/\\/images\\/home\\//"}}
    ) {
      edges {
        node {
          relativeDirectory
          name
          id
          publicURL
          extension
          publicURL
          fields {
            colors {
              vibrant
              darkVibrant
              lightVibrant
              muted
              darkMuted
              lightMuted
            }
          }
          childImageSharp {
            fluid(maxWidth: 2500) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
  
`

export default HomePage
