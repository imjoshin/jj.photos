import * as React from "react"
import { useRef } from "react"
import { useEffect, useState } from "react"
import { Icon } from "../../elements/icon"
import { Nav } from "../../elements/nav"
import { SEO } from "../../elements/seo"
import * as styles from "./Home.module.css"

type HomeImage = {
  src: string,
  aspectRatio: number,
  accentColor: string,
  started?: number,
  className?: string,
}

interface HomeProps {
  images: HomeImage[],
}

const ORIENTATION_RATIO_MIN = 4 / 3

const imageIsAllowedOnWindowRatio = (image: HomeImage) => {
  // window is not available in SSR, so just allow it
  if (typeof window === "undefined") {
    return true
  }

  const windowAspectRatio = window.innerWidth / window.innerHeight

  // close to square, so allow all
  if (windowAspectRatio <= ORIENTATION_RATIO_MIN && windowAspectRatio >= 1 / ORIENTATION_RATIO_MIN) {
    return true
  }

  // window is landscape and image is landscape
  if (windowAspectRatio > ORIENTATION_RATIO_MIN && image.aspectRatio > ORIENTATION_RATIO_MIN) {
    return true
  }

  // window is portrait and image is portrait
  if (windowAspectRatio < 1 / ORIENTATION_RATIO_MIN && image.aspectRatio < 1 / ORIENTATION_RATIO_MIN) {
    return true
  }

  // boo... not allowed. get outta here.
  return false
}

const getRandomImage = (images: HomeImage[], currentImage: HomeImage = null) => {

  let random = images[Math.floor(Math.random() * images.length)]

  while (!imageIsAllowedOnWindowRatio(random) || (currentImage && random.src === currentImage.src)) {
    random = images[Math.floor(Math.random() * images.length)]
  }

  return {
    started: Date.now(),
    ...random,
  }
}

const ROTATE_INTERVAL = 10000
const TRANSITION_INTERVAL = 1500

export const Home = ({ images }: HomeProps) => {
  // initialize background state
  const [backgrounds, setBackgrounds] = useState([])
  const backgroundsRef = useRef([])
  backgroundsRef.current = backgrounds

  const [accentColor, setAccentColor] = useState('#FFFFFF')

  // kick off animation
  useEffect(() => {
    const initialBackgrounds = [
      getRandomImage(images),
      getRandomImage(images),
    ];
    setBackgrounds(initialBackgrounds);
    setAccentColor(initialBackgrounds[1].accentColor)

    const handleAnimations = (fadeOutLastImage = true) => {
      const fadedBackgrounds = [...backgroundsRef.current]
      fadedBackgrounds[fadedBackgrounds.length - 2].className = styles.zoom

      if (fadeOutLastImage) {
        fadedBackgrounds[fadedBackgrounds.length - 1].className = [styles.zoom, styles.fadeOut].join(' ')
      } else {
        fadedBackgrounds[fadedBackgrounds.length - 1].className = styles.zoom
      }

      setBackgrounds(fadedBackgrounds)
      setAccentColor(fadedBackgrounds[fadedBackgrounds.length - 2].accentColor)
    }

    // remove one image and add a new one every ROTATE_INTERVAL
    const handleImageLayers = () => {
      const backgroundsMinusOne = backgroundsRef.current.slice(0, backgroundsRef.current.length - 1)
      const newBackgrounds = [
        getRandomImage(
          images,
          backgroundsMinusOne[backgroundsMinusOne.length - 1]
        ), 
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
    }, ROTATE_INTERVAL / 2)

    // TODO return cleanup for all these
  }, [])

  // order background divs
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
      <div className={styles.backgroundBorder}></div>
    </div>
    <div className={styles.content}>
      <div className={styles.iconContainer}>
        <Icon accent={accentColor} className={styles.icon} />
      </div>
      <Nav accentColor={accentColor} className={styles.nav} itemClassName={styles.navItem} />
    </div>
  </div>
}
