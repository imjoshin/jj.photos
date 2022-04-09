
import { useEffect, useRef, useState } from "react"
import { useFrame } from "react-three-fiber"
import Camera from "./camera"
import Portrait from "./portrait"
import { PORTRAIT_POSITION_MODIFER } from "./const"

// TODO use gatsby query images
import Bird from "../../../images/florida_bird.jpg"

const HeroCanvas = () => {
  const [zPos, setZPose] = useState<number>(-7.5)
  const zPosRef = useRef<number>()
  zPosRef.current = zPos

  // TODO pause camera on image hover
  useFrame(() => {
    if (zPosRef.current < 3) {
      setZPose(zPosRef.current + 0.005)
    }
  })

  // TODO there's some optimization to be done here
  const portraits = [...Array(5).keys()].reduce((acc, i) => {
    const position = -1 * PORTRAIT_POSITION_MODIFER.x * i - zPosRef.current

    if (position < 0) {
      acc.push(<Portrait key={`${i}-left`} side="left" position={position} image={Bird}/>)
      acc.push(<Portrait key={`${i}-right`} side="right" position={position} image={Bird}/>)
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