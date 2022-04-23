import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Blog } from "../../../types/pages";

interface BlogPostProps {
  blog: Blog
}

export const BlogPost = ({blog}: BlogPostProps) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <h2>{blog.date}</h2>
      <div>
        <MDXRenderer>{blog.body}</MDXRenderer>
      </div>
    </div>
  )
}