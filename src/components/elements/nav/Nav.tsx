import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./Nav.module.css"
import { clsx } from "clsx"
import { useStaticQuery, graphql } from "gatsby"

interface NavProps {
  accentColor: string,
  className?: string,
  itemClassName?: string,
}

export const Nav = ({className, itemClassName, accentColor}: NavProps) => {
  const galleries = useStaticQuery(graphql`
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

  let galleryItems = []
  if (process.env.NODE_ENV === "development") {
    galleryItems = galleries.allDirectory.edges.map(edge => ({
      name: edge.node.name.slice(2),
      path: `/${edge.node.name.slice(2)}`
    }))
  }

  const hoverColor = {
    color: accentColor,
  }

  return (
    <div className={clsx([styles.nav, className])} style={hoverColor}>
      {galleryItems.map(gallery => (
        <Link className={clsx(styles.link, itemClassName)} to={gallery.path}>{gallery.name}</Link>
      ))}
      <a className={clsx(styles.link, itemClassName)} href="https://my.jj.photos">clients</a>
      <a className={clsx(styles.link, itemClassName)} href="mailto:josh@jj.photos">contact</a>
    </div>
  )
}