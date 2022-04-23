import React from "react"
import { graphql } from "gatsby"
import { Blog } from "../../components/pages/blog";
import { BlogSummary } from "../../types/pages";

export default function Blogs({data}) {
  const blogs: BlogSummary[] = data.allMdx.edges.map(({node}) => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    slug: node.frontmatter.slug,
    excerpt: node.frontmatter.excerpt,
    hero: node.frontmatter.hero.publicURL,
  }));

  return <Blog blogs={blogs} />
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
            hero {
              publicURL
            }
          }
        }
      }
    }
  }
  
`