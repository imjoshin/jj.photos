
import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import Camera from "./camera"
import Portrait from "./portrait"
import Floor from "./floor"
import { PORTRAIT_POSITION_MODIFER } from "./const"


// TODO use gatsby query images
import Bird from "../../../images/florida_bird.jpg"

const HeroCanvas = () => {
  const [zPos, setZPos] = useState(-7.5)
  const zPosRef = useRef<number>()
  zPosRef.current = zPos

  // TODO pause camera on image hover

  // TODO convert to useFrame
  useEffect(() => {
    setInterval(() => {
      // TODO remove this limit once rendering is done
      if (zPosRef.current < 3) {
        setZPos(zPosRef.current + 0.005)
      }
    }, 10)
  }, [])

  const portraits = [...Array(5).keys()].reduce((acc, i) => {
    const position = -1 * PORTRAIT_POSITION_MODIFER.x * i - zPos
    acc.push(<Portrait key={`${i}-left`} side="left" position={position} image={Bird}/>)
    acc.push(<Portrait key={`${i}-right`} side="right" position={position} image={Bird}/>)
    return acc
  }, [])
  
  return (
    <Canvas>
      <Camera fov={90} near={0.1} far={1000} position={[0, 0.5, 0]} />
      {/* <pointLight position={[10, 10, 10]} /> */}
      <ambientLight intensity={0.8} />
      {portraits}
      <Floor />
    </Canvas>
  )
}

export default HeroCanvas