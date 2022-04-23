import React from "react"
import { Parallax } from "@react-spring/parallax"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Blog } from "../../../types/pages";
import { Footer } from "../../elements/footer";
import { Layout } from "../../elements/layout";
import { Divider } from "../../elements/parallax/divider"
import { Content } from "../../elements/parallax/content"

interface BlogPostProps {
  blog: Blog
}

export const BlogPost = ({blog}: BlogPostProps) => {
  return (
    <Layout>
        <h1>{blog.title}</h1>
        <h2>{blog.date}</h2>
        <h3>{blog.hero}</h3>
        <div>
          <MDXRenderer>{blog.body}</MDXRenderer>
        </div>
        <Footer />
    </Layout>
  )
}