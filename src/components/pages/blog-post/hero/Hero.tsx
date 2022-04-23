import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Typography } from "../../../elements/typography"

interface HeroProps {
  image: string,
  title: string,
  date: string,
}

export const Hero = ({image, title, date}: HeroProps) => {
  return <div>
    {/* <GatsbyImage image={getImage(image)} alt={title} /> */}
    <Typography variant="h4">Title: {title}</Typography> 
    <Typography variant="h5">Date: {date}</Typography> 
  </div>
}