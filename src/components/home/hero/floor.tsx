import { useFrame, useThree } from "react-three-fiber"
import { useEffect, useRef, useLayoutEffect } from "react"
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'

interface FloorProps {

}

const Floor = (props: FloorProps) => {
  return (
    <group position={[0, -0.5, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        {/* @ts-ignore */}
        <MeshReflectorMaterial
          blur={[250, 150]}
          color="#ffffff"
          depthScale={1.2}
          maxDepthThreshold={1.4}
          minDepthThreshold={0.4}
          mixBlur={1}
          mixStrength={50}
          metalness={0.1}
          resolution={1024}
          roughness={1}
        />
      </mesh>
    </group>
  )
}

export default Floor