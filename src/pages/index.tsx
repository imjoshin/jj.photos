import * as React from "react"
import { Home } from "../components/pages/home"
import { graphql } from "gatsby"

const HomePage = ({data}) => { 
  const heroImages = data.allImageSharp.edges
    .map(sharp => ({
      src: sharp.node.fluid.src,
      blog: `/${sharp.node.fields.relativeDirectory}`,
      aspectRatio: sharp.node.fluid.aspectRatio
    }))

  return <Home images={heroImages} />
}

export const query = graphql`
  query {
    allImageSharp(
      filter: {fields: {absolutePath: {regex: "/.*\\/images\\/blog\\/.*/"}}}
    ) {
      edges {
        node {
          id
          fluid {
            src,
            aspectRatio
          }
          fields {
            relativeDirectory
          }
        }
      }
    }
  }
`

export default HomePage
