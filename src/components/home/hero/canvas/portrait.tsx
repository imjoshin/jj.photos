import * as THREE from 'three'
import { useFrame, useThree } from "react-three-fiber"
import { useState, useRef, useLayoutEffect, useEffect } from "react"
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import { PORTRAIT_ROTATION_MODIFIER, PORTRAIT_SCALE } from "./const"
import { navigate } from "gatsby"
import { Suspense } from "react"
import { HeroImage } from '.'


// Huge credit to Paul Henschel for the start of this frame.
// See https://codesandbox.io/s/image-gallery-lx2h8.

interface PortraitProps {
  side: "left" | "right",
  image: HeroImage,
  position: {
    x: number,
    y: number,
    z: number,
  },
  onMouseEnter: () => void,
  onMouseExit: () => void,
}

// TODO remove this and account for picture width/height
// this comes out to be the ratio of height:width
const GOLDENRATIO = 1.61803398875

const Portrait = (props: PortraitProps) => {
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const image = useRef<JSX.IntrinsicElements['mesh']>()
  const frame = useRef<JSX.IntrinsicElements['mesh']>()
  const group = useRef<JSX.IntrinsicElements['group']>()

  const frameRotation = Math.PI / PORTRAIT_ROTATION_MODIFIER * (props.side === 'left' ? 1 : -1)

  useEffect(() => {
    if (group.current) {
      group.current.rotation.y = frameRotation
    }
  }, [group.current])

  useCursor(hovered)
  useFrame((state) => {
    // @ts-ignore
    if (!image.current) {
      return
    }

    const xScale = 1 - (props.image.aspectRatio > 1 ? (.07 * props.image.aspectRatio) : (.1 / props.image.aspectRatio))
    const yScale = 1 - (props.image.aspectRatio > 1 ? (.15 / props.image.aspectRatio) : (.15 * props.image.aspectRatio))

    image.current.material.zoom = 1 + (Math.sin(rnd + state.clock.elapsedTime / 5) + 1) / 5
    image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, xScale * (hovered ? xScale : 1), 0.1)
    image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, yScale * (hovered ? yScale : 1), 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, hovered ? frameRotation / 1.5 : frameRotation, 0.1)
  })

  const groupPosition = [props.position.x, props.position.y, props.position.z]

  const meshScale = [props.image.aspectRatio * PORTRAIT_SCALE, 1 * PORTRAIT_SCALE, 0.04]
  const meshPosition = [0, PORTRAIT_SCALE / 2, 0]

  return (
    <Suspense fallback={<group></group>}>
      <group ref={group} position={groupPosition}>
        <mesh
          onPointerOver={(e) => (e.stopPropagation(), hover(true), props.onMouseEnter())}
          onPointerOut={() => (hover(false), props.onMouseExit())}
          onPointerUp={() => navigate(props.image.blog)}
          scale={meshScale}
          position={meshPosition}>
          <boxGeometry />
          <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
          <mesh ref={frame} raycast={() => null} scale={[0.93, 0.95, 0.93]} position={[0, 0, 0.2]}>
            <boxGeometry />
            <meshBasicMaterial toneMapped={false} fog={false} />
          </mesh>
          {/* @ts-ignore */}
          <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={props.image.src} form />
        </mesh>
      </group>
    </Suspense>
  )
}

export default Portrait