import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Blog } from "../../../types/pages";
import { Footer } from "../../elements/footer";
import { Layout } from "../../elements/layout";
import { Hero } from "./hero"
import * as styles from "./BlogPost.module.css"

interface BlogPostProps {
  blog: Blog
}

export const BlogPost = ({blog}: BlogPostProps) => {
  return (
    <Layout>
        <Hero title={blog.title} date={blog.date} image={blog.hero} />
        <div className={styles.container}>
          <div className={styles.body}>
            <MDXRenderer>{blog.body}</MDXRenderer>
          </div>
        </div>
        {/* <Footer /> */}
    </Layout>
  )
}