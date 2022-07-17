import * as React from "react"
import { useRef } from "react"
import { useEffect, useState } from "react"
import * as styles from "./Home.module.css"

type HomeImage = {
  src: string,
  blog: string,
  aspectRatio: number,
  started?: number,
  className?: string,
}

interface HomeProps {
  images: HomeImage[],
}

let lastRandomImage: string
const getRandomImage = (images: HomeImage[]) => {
  let random = images[Math.floor(Math.random() * images.length)]

  while (random.blog === lastRandomImage) {
    random = images[Math.floor(Math.random() * images.length)]
  }

  lastRandomImage = random.src

  return {
    started: Date.now(),
    ...random,
  }
}

const ROTATE_INTERVAL = 3000
const TRANSITION_INTERVAL = 1000

export const Home = ({ images }: HomeProps) => {
  const [backgrounds, setBackgrounds] = useState([
    getRandomImage(images), 
    getRandomImage(images),
  ])
  const backgroundsRef = useRef([])
  backgroundsRef.current = backgrounds

  useEffect(() => {
    // remove one image and add a new one every ROTATE_INTERVAL
    const interval = setInterval(() => {
      const backgroundsMinusOne = backgroundsRef.current.slice(0, backgroundsRef.current.length - 1)
      const newBackgrounds = [getRandomImage(images), ...backgroundsMinusOne]

      // set the last image to fadeOut every TRANSITION_INTERVAL
      setTimeout(() => {
        const fadedBackgrounds = [...backgroundsRef.current]
        fadedBackgrounds[fadedBackgrounds.length - 2].className = styles.zoom
        fadedBackgrounds[fadedBackgrounds.length - 1].className = [styles.zoom, styles.fadeOut].join(' ')
        setBackgrounds(fadedBackgrounds)
      }, TRANSITION_INTERVAL)

      setBackgrounds(newBackgrounds)
    }, ROTATE_INTERVAL)

    return () => {
      clearInterval(interval)
    }
  })

  const backgroundsDisplay = backgrounds.map(background => (
    <div 
      key={`${background.src}-${background.started}`} 
      className={`${styles.backgroundImage} ${background.className || ''}`} 
      style={{backgroundImage: `url(${background.src})`}} 
    />
  ))

  return <div className={styles.home}>
    <div className={styles.background}>
      {backgroundsDisplay}
    </div>
    <div className={styles.content}>
      <div>TEST</div>
      <a href={backgrounds[0].blog}>See this blog post</a>
    </div>
  </div>
}
