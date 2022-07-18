import * as React from "react"
import { Home } from "../components/pages/home"
import { graphql } from "gatsby"

const HomePage = ({data}) => {
  const heroImages = data.allFile.edges
    .map(sharp => ({
      src: sharp.node.childImageSharp.fluid.src,
      aspectRatio: sharp.node.childImageSharp.fluid.aspectRatio
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
