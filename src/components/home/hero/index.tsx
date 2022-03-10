/** @jsx jsx */
import { Suspense } from "react"
import { jsx } from "theme-ui"
import Canvas from "./canvas"
import { ParallaxLayer } from "@react-spring/parallax"

const Hero = ({ offset, factor = 1 }: { offset: number; factor?: number }) => (
  <div>
    <ParallaxLayer
      sx={{
        position: `absolute`,
        width: `full`,
        height: `full`,
      }}
      speed={1}
      offset={offset}
      factor={factor}
    >
      {/* TODO make this loading better */}
      <Suspense fallback={<div>Loading... </div>}>
        <Canvas />
      </Suspense>
    </ParallaxLayer>
  </div>
)

export default Hero
