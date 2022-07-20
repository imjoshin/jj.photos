
import * as React from "react"
import * as styles from "./Gallery.module.css"

export const Gallery = ({ pageContext }) => {
  return (
    <div>
      {pageContext.name} Gallery
    </div>
  )
}