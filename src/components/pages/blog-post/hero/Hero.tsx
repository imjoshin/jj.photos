import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import { Typography } from "../../../elements/typography"
import * as styles from "./Hero.module.css"

interface HeroProps {
  image: ImageDataLike,
  title: string,
  date: string,
}

export const Hero = ({image, title, date}: HeroProps) => {
  console.log(image)
  return <div className={styles.container}>
    <div className={styles.hero}>
      <GatsbyImage image={getImage(image)} alt={title} className={styles.image} />
      <div className={styles.text}>
        <Typography variant="h4">{title}</Typography> 
        <Typography variant="h6">{date}</Typography> 
      </div>
    </div>
  </div>
}