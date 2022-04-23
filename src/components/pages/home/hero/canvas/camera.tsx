import { useThree } from "react-three-fiber"
import { useRef, useLayoutEffect } from "react"

interface CameraProps {
  position: number[],
  fov: number,
  near: number,
  far: number,
}

const Camera = (props: CameraProps) => {
  const cameraRef = useRef<JSX.IntrinsicElements["perspectiveCamera"]>()
  const set = useThree((state) => state.set)
  const size = useThree(({ size }) => size)
  
  useLayoutEffect(() => {
      if (cameraRef.current) {
        cameraRef.current.aspect = size.width / size.height
        cameraRef.current.updateProjectionMatrix()
      }
    }, [size, props])
  
  useLayoutEffect(() => {
    set({ camera: cameraRef.current })
  }, [])
  
  return <perspectiveCamera ref={cameraRef} {...props} />
}

export default Camera