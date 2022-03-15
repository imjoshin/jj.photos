import { MeshReflectorMaterial } from '@react-three/drei'

interface FloorProps {

}

const Floor = (props: FloorProps) => {
  return (
    <group position={[0, -0.5, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        {/* @ts-ignore */}
        <MeshReflectorMaterial
          blur={[250, 150]}
          color="#ffffff"
          depthScale={0.5}
          maxDepthThreshold={5}
          minDepthThreshold={0}
          mixBlur={1}
          mixStrength={8}
          metalness={0}
          resolution={1024}
          roughness={0.8}
        />
      </mesh>
    </group>
  )
}

export default Floor