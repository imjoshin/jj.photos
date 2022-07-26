
import { graphql, useStaticQuery } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"
import * as React from "react"
import * as styles from "./Gallery.module.css"
import PhotoAlbum from "react-photo-album";


export const Gallery = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp(filter: {fields: {gallery: {ne: null}}}) {
        edges {
          node {
            gatsbyImageData
            original {
              src
            }
            fields {
              gallery
            }
          }
        }
      }
    }
  `)

  const gatsbyImages = data.allImageSharp.edges.map(
    edge => edge.node.fields.gallery === pageContext.name
      ? edge.node.original
      : null
  ).filter(x => !!x)

  // TODO use gatsby images
  // const gatsbyImages = data.allImageSharp.edges.map(
  //   edge => edge.node.fields.gallery === pageContext.name
  //     ? edge.node.gatsbyImageData 
  //     : null
  // ).filter(x => !!x) as IGatsbyImageData[]

  const photoAlbumImages = gatsbyImages.map(image => ({
    src: image.src,
    width: 1600,
    height: 1000,
  }))

  return (
    <div>
      {pageContext.name} Gallery
      <PhotoAlbum layout="rows" photos={photoAlbumImages} />
    </div>
  )
}
