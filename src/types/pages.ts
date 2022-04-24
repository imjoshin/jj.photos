import { ImageDataLike } from "gatsby-plugin-image"

export type BlogSummary = {
  title: string
  date: string
  slug: string
  excerpt: string
  hero: string
}

export type Blog = {
  title: string
  date: string
  body: string
  hero: ImageDataLike
}