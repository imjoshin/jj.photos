import { graphql } from 'gatsby'

export const GatsbyImageColors = graphql`
  fragment GatsbyImageColors on File {
    vibrant
    darkVibrant
    lightVibrant
    muted
    darkMuted
    lightMuted
  }
`