
import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import Camera from "./camera"
import Portrait from "./portrait"
import Floor from "./floor"

// TODO use gatsby query images
import Bird from "../../../images/florida_bird.jpg"

const HeroCanvas = () => {
  const [zPos, setZPos] = useState(0)
  const zPosRef = useRef<number>()
  zPosRef.current = zPos

  // TODO pause camera on image hover

  useEffect(() => {
    setInterval(() => {
      // TODO remove this limit once rendering is done
      if (zPosRef.current < 20) {
        setZPos(zPosRef.current + 0.005)
      }
    }, 10)
  }, [])

  const portraits = [...Array(10).keys()].reduce((acc, i) => {
    acc.push(<Portrait key={`${i}-left`} side="left" index={i} image={Bird}/>)
    acc.push(<Portrait key={`${i}-right`} side="right" index={i} image={Bird}/>)
    return acc
  }, [])
  
  return (
    <Canvas>
      <Camera fov={90} near={0.1} far={1000} position={[0, 0.5, zPos]} />
      <pointLight position={[10, 10, 10]} />
      {portraits}
      <Floor />
    </Canvas>
  )
}

export default HeroCanvas