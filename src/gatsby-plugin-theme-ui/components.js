import * as React from "react"
import { Image } from "../components/pages/blog-post/image"
import ProjectCard from "../components/pages/home/project-card"

const components = {
  // eslint-disable-next-line react/display-name
  ProjectCard: ({ link, title, bg, children, ...props }) => (
    <ProjectCard {...props} link={link} title={title} bg={bg}>
      {children}
    </ProjectCard>
  ),

  Image: ({src}) => (
    <Image src={src} />
  )
}

export default components
