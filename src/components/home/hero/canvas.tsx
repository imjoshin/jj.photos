import * as THREE from 'three'
import { useCallback, useEffect, useRef, useState } from "react"
import { useFrame } from "react-three-fiber"
import Camera from "./camera"
import Portrait from "./portrait"
import { PORTRAIT_POSITION_MODIFER, PORTRAIT_SPEED } from "./const"
import { HeroImage } from '.'

const HeroCanvas = ({images}: {images: HeroImage[]}) => {
  const [zPos, setZPos] = useState<number>(-3)
  const [portraitHovered, setPortraitHovered] = useState<string | null>()
  const zPosRef = useRef<number>()
  zPosRef.current = zPos
  const portraitHoveredRef = useRef<string | null>()
  portraitHoveredRef.current = portraitHovered
  const speedRef = useRef<number>(PORTRAIT_SPEED)

  useFrame(() => {
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, portraitHoveredRef.current ? 0 : PORTRAIT_SPEED, 0.05)
    setZPos(zPosRef.current + (speedRef.current / 1000))
  })

  const onMouseHoverEvent = useCallback((portrait: {side: 'left' | 'right', index: number} | null) => {
    setPortraitHovered(portrait ? `${portrait.index}-${portrait.side}` : null)
  }, [])

  // TODO there's some optimization to be done here
  // TODO wrap images when we've rendered all
  const portraits = [...Array(5).keys()].reduce((acc, i) => {
    const position = -1 * PORTRAIT_POSITION_MODIFER.x * i - zPosRef.current

    if (position < 0) {
      acc.push(<Portrait 
        key={`${i}-left`} 
        side="left" 
        position={position} 
        image={images[i % images.length].src} 
        blog={images[i % images.length].blog} 
        onMouseEnter={() => onMouseHoverEvent({side: 'left', index: i})} 
        onMouseExit={() => onMouseHoverEvent(null)}
      />)
      
      acc.push(<Portrait 
        key={`${i}-right`} 
        side="right" 
        position={position}
        image={images[(i + 1) % images.length].src} 
        blog={images[(i + 1) % images.length].blog} 
        onMouseEnter={() => onMouseHoverEvent({side: 'right', index: i})} 
        onMouseExit={() => onMouseHoverEvent(null)}
      />)
    }

    return acc
  }, [])
  
  return <group>
      <Camera fov={75} near={0.1} far={10} position={[0, 0.5, 0]} />
      {/* <pointLight position={[10, 10, 10]} /> */}
      <ambientLight intensity={0.8} />
      {portraits}
      {/* <Floor /> */}
  </group>
}

export default HeroCanvas