
import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import Camera from "./camera"

const HeroCanvas = () => {
  const [zPos, setZPos] = useState(2)
  const zPosRef = useRef<number>()
  zPosRef.current = zPos

  useEffect(() => {
    setInterval(() => {
      // TODO remove this limit once rendering is done
      if (zPosRef.current < 10000) {
        setZPos(zPosRef.current * 1.005)
      }
    }, 10)
  }, [])
  
  return (
    <Canvas>
      <Camera fov={75} near={0.1} far={1000} position={[0, 0, zPos]} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereBufferGeometry />
        <meshStandardMaterial color="#9000ff" />
      </mesh>
    </Canvas>
  )
}

export default HeroCanvas