import * as React from "react"
import * as styles from "./Home.module.css"

interface HomeProps {
  images: {
    src: string,
    blog: string,
    aspectRatio: number,
  }
}

export const Home = ({ images }: HomeProps) => {
  const image = images[0]

  return <div className={styles.home} style={{backgroundImage: `url(${image.src})`}}>
    <div className={styles.content}>
      TEST
    </div>
  </div>
}
