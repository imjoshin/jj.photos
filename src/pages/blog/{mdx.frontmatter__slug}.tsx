import React from "react"
import { graphql } from "gatsby"
import { BlogPost } from "../../components/pages/blog-post"
import { Blog } from "../../types/pages"

export default function BlogTemplate({data}) {
  const { frontmatter, body } = data.mdx

  const blog: Blog = {
    title: frontmatter.title,
    date: frontmatter.date,
    hero: frontmatter.hero.publicURL,
    body
  }
  
  return <BlogPost blog={blog} />
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        hero {
          publicURL
        }
      }
    }
  }
`