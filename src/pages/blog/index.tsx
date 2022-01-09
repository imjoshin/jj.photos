import React from "react"
import { graphql } from "gatsby"

export default function Blogs({data}) {
  const { edges } = data.allMdx

  const blogs = edges.map(({node}) => (
    <>
      <h1><a href={`/blog/${node.frontmatter.slug}`}>{node.frontmatter.title}</a></h1>
      <h2>{node.frontmatter.date}</h2>
      <div>
        {node.excerpt}
      </div>
    </>
  ));

  return (
    <div>
      {blogs}
    </div>
  )
}

export const pageQuery = graphql`
query {
    allMdx {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
        }
      }
    }
  }
  
`