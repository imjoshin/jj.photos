import { useFrame, useThree } from "react-three-fiber"
import { useEffect, useRef, useLayoutEffect } from "react"

interface PortraitProps {
  side: "left" | "right",
  index: number,
}

const Portrait = (props: PortraitProps) => {
  return (
    <mesh>
      <boxBufferGeometry width={10} height={1} depth={1} />
      <meshStandardMaterial color="#9000ff" />
    </mesh>
  )
}

export default Portrait