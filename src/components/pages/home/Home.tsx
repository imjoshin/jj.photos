import * as React from "react"
import { useRef } from "react"
import { useEffect, useState } from "react"
import { Icon } from "../../elements/icon"
import { SEO } from "../../elements/seo"
import * as styles from "./Home.module.css"

type HomeImage = {
  src: string,
  aspectRatio: number,
  started?: number,
  className?: string,
}

interface HomeProps {
  images: HomeImage[],
}

const getRandomImage = (images: HomeImage[], currentImage: HomeImage = null) => {
  let random = images[Math.floor(Math.random() * images.length)]

  if (currentImage) {
    while (random.src === currentImage.src) {
      random = images[Math.floor(Math.random() * images.length)]
    }
  }

  return {
    started: Date.now(),
    ...random,
  }
}

const ROTATE_INTERVAL = 10000
const TRANSITION_INTERVAL = 1500

export const Home = ({ images }: HomeProps) => {
  const [backgrounds, setBackgrounds] = useState([
    getRandomImage(images), 
    getRandomImage(images),
  ])
  const backgroundsRef = useRef([])
  backgroundsRef.current = backgrounds

  useEffect(() => {
    const handleAnimations = (fadeOutLastImage = true) => {
      const fadedBackgrounds = [...backgroundsRef.current]
      fadedBackgrounds[fadedBackgrounds.length - 2].className = styles.zoom

      if (fadeOutLastImage) {
        fadedBackgrounds[fadedBackgrounds.length - 1].className = [styles.zoom, styles.fadeOut].join(' ')
      } else {
        fadedBackgrounds[fadedBackgrounds.length - 1].className = styles.zoom
      }
      setBackgrounds(fadedBackgrounds)
    }

    // remove one image and add a new one every ROTATE_INTERVAL
    const handleImageLayers = () => {
      const backgroundsMinusOne = backgroundsRef.current.slice(0, backgroundsRef.current.length - 1)
      const newBackgrounds = [
        getRandomImage(images, backgroundsMinusOne[backgroundsMinusOne.length - 1]), 
        ...backgroundsMinusOne
      ]

      // set the last image to fadeOut every TRANSITION_INTERVAL
      setTimeout(handleAnimations, TRANSITION_INTERVAL)
      setTimeout(handleImageLayers, ROTATE_INTERVAL)
      setBackgrounds(newBackgrounds)
    }

    // TODO there's something weird here... images flicker on first load sometimes
    setTimeout(() => {
      handleAnimations(false)
      setTimeout(() => {
        handleAnimations()
        setTimeout(handleImageLayers, ROTATE_INTERVAL)
      }, TRANSITION_INTERVAL)
    }, 10)
  }, [])

  const backgroundsDisplay = backgrounds.map(background => (
    <div 
      key={`${background.src}-${background.started}`} 
      className={`${styles.backgroundImage} ${background.className || ''}`} 
      style={{backgroundImage: `url(${background.src})`}} 
    />
  ))

  return <div className={styles.home}>
    <SEO />
    <div className={styles.background}>
      {backgroundsDisplay}
    </div>
    <div className={styles.content}>
      <Icon accent="#0000FF" className={styles.icon} />
    </div>
  </div>
}
