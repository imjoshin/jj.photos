import * as THREE from 'three'
import { useFrame, useThree } from "react-three-fiber"
import { useState, useRef, useLayoutEffect } from "react"
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import { PORTRAIT_ROTATION_MODIFIER, PORTRAIT_POSITION_MODIFER } from "./const"
import { navigate } from "gatsby"
import { Suspense } from "react"


// Huge credit to Paul Henschel for the start of this frame.
// See https://codesandbox.io/s/image-gallery-lx2h8.

interface PortraitProps {
  side: "left" | "right",
  image: string,
  blog: string,
  position: number,
  onMouseEnter: () => void,
  onMouseExit: () => void,
}

// TODO remove this and account for picture width/height
const GOLDENRATIO = 1.61803398875

const Portrait = (props: PortraitProps) => {
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const image = useRef<JSX.IntrinsicElements['mesh']>()
  const frame = useRef<JSX.IntrinsicElements['mesh']>()
  const group = useRef<JSX.IntrinsicElements['group']>()

  const frameRotation = Math.PI / PORTRAIT_ROTATION_MODIFIER * (props.side === 'left' ? 1 : -1)

  useCursor(hovered)
  useFrame((state) => {
    // @ts-ignore
    if (!image.current) {
      return
    }

    image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
    image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1)
    image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, hovered ? frameRotation / 3 : frameRotation, 0.05)
  })

  const position = [
    PORTRAIT_POSITION_MODIFER.x * (props.side === 'left' ? -1 : 1), 
    PORTRAIT_POSITION_MODIFER.y,
    props.position
  ]

  return (
    <Suspense fallback={<group></group>}>
      <group ref={group} position={position}>
        <mesh
          onPointerOver={(e) => (e.stopPropagation(), hover(true), props.onMouseEnter())}
          onPointerOut={() => (hover(false), props.onMouseExit())}
          onPointerUp={() => navigate(props.blog)}
          scale={[1, GOLDENRATIO, 0.05]}
          position={[0, GOLDENRATIO / 2, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
          <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
            <boxGeometry />
            <meshBasicMaterial toneMapped={false} fog={false} />
          </mesh>
          {/* @ts-ignore */}
          <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={props.image} form />
        </mesh>
      </group>
    </Suspense>
  )
}

export default Portrait