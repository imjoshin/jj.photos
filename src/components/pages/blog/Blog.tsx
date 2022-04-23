import React from "react"
import { BlogSummary } from "../../../types/pages";
import { Footer } from "../../elements/footer";

interface BlogProps {
  blogs: BlogSummary[],
}

export const Blog = ({blogs}: BlogProps) => {
  const display = blogs.map((blog) => (
    <>
      <h1><a href={`/blog/${blog.slug}`}>{blog.title}</a></h1>
      <h2>{blog.date}</h2>
      <div>
        {blog.excerpt}
      </div>
    </>
  ));

  return <div>
    {display}
    <Footer />
  </div>
}