import * as THREE from 'three'
import { useCallback, useEffect, useRef, useState } from "react"
import { useFrame } from "react-three-fiber"
import Camera from "./camera"
import Portrait from "./portrait"
import { PORTRAIT_START_POSITION, PORTRAIT_SPEED, RENDERED_PORTRAITS_COUNT, CAMERA_DISTANCE, PORTRAIT_DISTANCE } from "./const"
import { HeroImage } from '.'

// TODO clean up all these types

interface RenderedPortrait {
  index: number,
  position: {
    x: number,
    y: number,
    z: number,
  },
  side: 'left' | 'right',
  image: HeroImage,
}

const createPortraitObject = (
  image: HeroImage,
  index: number,
  side: 'left' | 'right',
  zPos: number,
) => {
  
  return {
    index,
    position: {
      x: PORTRAIT_START_POSITION.x * (side === 'left' ? -1 : 1), 
      y: PORTRAIT_START_POSITION.y,
      z: zPos
    },
    side,
    image,
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
  const nextImage = useRef<HeroImage>(images[Math.floor(images.length * Math.random())])

  useFrame(() => {
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, portraitHoveredRef.current ? 0 : PORTRAIT_SPEED, 0.1)
    const zDelta = speedRef.current / 1000

    const newRenderedPortraits: {left: RenderedPortrait[], right: RenderedPortrait[]} = {left: [], right: []}

    // TODO clean this up, it's like really nasty lookin'
  
    renderedPortraits.current.left.forEach(rp => {
      if (rp.position.z > -1 * CAMERA_DISTANCE - 2) {
        const z = rp.position.z - zDelta
        const x = -1 * (.2 * z + 2.24)

        newRenderedPortraits.left.push({
          ...rp,
          position: {
            x,
            y: rp.position.y,
            z
          }
        })
      }
    })
  
    renderedPortraits.current.right.forEach(rp => {
      if (rp.position.z > -1 * CAMERA_DISTANCE - 2) {
        const z = rp.position.z - zDelta
        const x = .2 * z + 2.24

        newRenderedPortraits.right.push({
          ...rp,
          position: {
            x,
            y: rp.position.y,
            z
          }
        })
      }
    })
  
    while(newRenderedPortraits.left.length < RENDERED_PORTRAITS_COUNT) {
      const lastPortrait = newRenderedPortraits.left[newRenderedPortraits.left.length - 1]
      const lastImage = lastPortrait?.image
      const lastPosition = lastPortrait?.position.z || (-1 * CAMERA_DISTANCE + 1)

      const nextPosition = lastPosition + PORTRAIT_DISTANCE + (1.4 * (nextImage.current.aspectRatio || 0)) / 2 + (1.4 * (lastImage?.aspectRatio || 0)) / 2

      if (nextPosition > PORTRAIT_START_POSITION.z) {
        break
      }

      newRenderedPortraits.left.push(createPortraitObject(
        nextImage.current,
        portraitCount.current++,
        'left',
        nextPosition
      ))

      nextImage.current = images[Math.floor(images.length * Math.random())]
    }
  
    while(newRenderedPortraits.right.length < RENDERED_PORTRAITS_COUNT) {
      const lastPortrait = newRenderedPortraits.right[newRenderedPortraits.right.length - 1]
      const lastImage = lastPortrait?.image
      const lastPosition = lastPortrait?.position.z || (-1 * CAMERA_DISTANCE + 1)

      const nextPosition = lastPosition + PORTRAIT_DISTANCE + (1.4 * (nextImage.current.aspectRatio || 0)) / 2 + (1.4 * (lastImage?.aspectRatio || 0)) / 2

      if (nextPosition > PORTRAIT_START_POSITION.z) {
        break
      }

      newRenderedPortraits.right.push(createPortraitObject(
        nextImage.current,
        portraitCount.current++,
        'right',
        nextPosition
      ))

      nextImage.current = images[Math.floor(images.length * Math.random())]
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
      onMouseEnter={() => onMouseHoverEvent({side: p.side, index: p.index})} 
      onMouseExit={() => onMouseHoverEvent(null)}
    />
  )
  
  return <group>
      <Camera fov={65} near={0.1} far={CAMERA_DISTANCE} position={[0, 0.5, 0]} />
      {/* <pointLight position={[10, 10, 10]} /> */}
      <ambientLight intensity={0.8} />
      {portraits}
      {/* <Floor /> */}
  </group>
}

export default HeroCanvas