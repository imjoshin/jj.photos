import * as THREE from 'three'
import { useCallback, useEffect, useRef, useState } from "react"
import { useFrame } from "react-three-fiber"
import Camera from "./camera"
import Portrait from "./portrait"
import { PORTRAIT_POSITION_MODIFER, PORTRAIT_SPEED, RENDERED_PORTRAITS_COUNT, CAMERA_DISTANCE, PORTRAIT_DISTANCE } from "./const"
import { HeroImage } from '.'

// TODO clean up all these types

interface RenderedPortrait {
  index: number,
  position: {
    x: number,
    y: number,
    z: number,
  },
  image: string,
  blog: string,
  side: 'left' | 'right',
}

const createPortraitObject = (
  images: HeroImage[],
  index: number,
  side: 'left' | 'right',
  zPos: number,
) => {
  const randomImage = images[Math.floor(images.length * Math.random())]
  return {
    index,
    position: {
      x: PORTRAIT_POSITION_MODIFER.x * (side === 'left' ? -1 : 1), 
      y: PORTRAIT_POSITION_MODIFER.y,
      z: zPos
    },
    image: randomImage.src,
    blog: randomImage.blog,
    side,
  }
}

const HeroCanvas = ({images}: {images: HeroImage[]}) => {
  const [zPos, setZPos] = useState<number>(-3)
  const [portraitHovered, setPortraitHovered] = useState<string | null>()
  const zPosRef = useRef<number>()
  zPosRef.current = zPos
  const portraitHoveredRef = useRef<string | null>()
  portraitHoveredRef.current = portraitHovered
  const speedRef = useRef<number>(PORTRAIT_SPEED)
  const portraitCount = useRef<number>(0)
  const renderedPortraits = useRef<{left: RenderedPortrait[], right: RenderedPortrait[]}>({left: [], right: []})

  useFrame(() => {
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, portraitHoveredRef.current ? 0 : PORTRAIT_SPEED, 0.1)
    const zDelta = speedRef.current / 1000

    const newRenderedPortraits: {left: RenderedPortrait[], right: RenderedPortrait[]} = {left: [], right: []}

    // TODO clean this up, it's like really nasty lookin'
  
    renderedPortraits.current.left.forEach(rp => {
      if (rp.position.z > -1 * CAMERA_DISTANCE - 2) {
        newRenderedPortraits.left.push({
          ...rp,
          position: {
            x: rp.position.x,
            y: rp.position.y,
            z: rp.position.z - zDelta
          }
        })
      }
    })
  
    renderedPortraits.current.right.forEach(rp => {
      if (rp.position.z > -1 * CAMERA_DISTANCE - 2) {
        newRenderedPortraits.right.push({
          ...rp,
          position: {
            x: rp.position.x,
            y: rp.position.y,
            z: rp.position.z - zDelta
          }
        })
      }
    })
  
    while(newRenderedPortraits.left.length < RENDERED_PORTRAITS_COUNT) {
      const lastPosition = newRenderedPortraits.left[newRenderedPortraits.left.length - 1]?.position.z || (-1 * CAMERA_DISTANCE + 1)
      newRenderedPortraits.left.push(createPortraitObject(
        images,
        portraitCount.current++,
        'left',
        lastPosition + PORTRAIT_DISTANCE
      ))
    }
  
    while(newRenderedPortraits.right.length < RENDERED_PORTRAITS_COUNT) {
      const lastPosition = newRenderedPortraits.right[newRenderedPortraits.right.length - 1]?.position.z || (-1 * CAMERA_DISTANCE + 1)
      newRenderedPortraits.right.push(createPortraitObject(
        images,
        portraitCount.current++,
        'right',
        lastPosition + PORTRAIT_DISTANCE
      ))
    }
  
    renderedPortraits.current = newRenderedPortraits

    setZPos(zPosRef.current + (speedRef.current / 1000))
  })

  const onMouseHoverEvent = useCallback((portrait: {side: 'left' | 'right', index: number} | null) => {
    setPortraitHovered(portrait ? `${portrait.index}-${portrait.side}` : null)
  }, [])

  const portraits = renderedPortraits.current.left.concat(renderedPortraits.current.right).map(p => 
    <Portrait 
        key={p.index} 
        side={p.side}
        position={p.position} 
        image={p.image} 
        blog={p.blog} 
        onMouseEnter={() => onMouseHoverEvent({side: p.side, index: p.index})} 
        onMouseExit={() => onMouseHoverEvent(null)}
      />
  )
  
  return <group>
      <Camera fov={75} near={0.1} far={CAMERA_DISTANCE} position={[0, 0.5, 0]} />
      {/* <pointLight position={[10, 10, 10]} /> */}
      <ambientLight intensity={0.8} />
      {portraits}
      {/* <Floor /> */}
  </group>
}

export default HeroCanvas