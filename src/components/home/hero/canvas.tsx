import * as THREE from 'three'
import { useCallback, useEffect, useRef, useState } from "react"
import { useFrame } from "react-three-fiber"
import Camera from "./camera"
import Portrait from "./portrait"
import { PORTRAIT_POSITION_MODIFER, PORTRIAT_SPEED } from "./const"

// TODO use gatsby query images
import Bird from "../../../images/florida_bird.jpg"

const HeroCanvas = () => {
  const [zPos, setZPos] = useState<number>(-7)
  const [portraitHovered, setPortraitHovered] = useState<string | null>()
  const [speed, setSpeed] = useState<number>()
  const zPosRef = useRef<number>()
  zPosRef.current = zPos
  const portraitHoveredRef = useRef<string | null>()
  portraitHoveredRef.current = portraitHovered
  const speedRef = useRef<number>(PORTRIAT_SPEED)

  useFrame(() => {
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, portraitHoveredRef.current ? 0 : PORTRIAT_SPEED, 0.05)
    setZPos(zPosRef.current + (speedRef.current / 1000))
  })

  const onMouseHoverEvent = useCallback((portrait: {side: 'left' | 'right', index: number} | null) => {
    setPortraitHovered(portrait ? `${portrait.index}-${portrait.side}` : null)
  }, [])

  // TODO there's some optimization to be done here
  const portraits = [...Array(5).keys()].reduce((acc, i) => {
    const position = -1 * PORTRAIT_POSITION_MODIFER.x * i - zPosRef.current

    // TODO pull actual images from blog
    if (position < 0) {
      acc.push(<Portrait 
        key={`${i}-left`} 
        side="left" 
        position={position} 
        image={Bird} 
        onMouseEnter={() => onMouseHoverEvent({side: 'left', index: i})} 
        onMouseExit={() => onMouseHoverEvent(null)}
      />)
      
      acc.push(<Portrait 
        key={`${i}-right`} 
        side="right" 
        position={position} 
        image={Bird} 
        onMouseEnter={() => onMouseHoverEvent({side: 'right', index: i})} 
        onMouseExit={() => onMouseHoverEvent(null)}
      />)
    }

    return acc
  }, [])
  
  return <group>
      <Camera fov={90} near={0.1} far={10} position={[0, 0.5, 0]} />
      {/* <pointLight position={[10, 10, 10]} /> */}
      <ambientLight intensity={0.8} />
      {portraits}
      {/* <Floor /> */}
  </group>
}

export default HeroCanvas