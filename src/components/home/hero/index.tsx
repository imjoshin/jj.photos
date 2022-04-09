/** @jsx jsx */
import { Suspense } from "react"
import { jsx } from "theme-ui"
import HeroCanvas from "./canvas"
import { Canvas } from "react-three-fiber"
import { ParallaxLayer } from "@react-spring/parallax"

export interface HeroImage {
  src: string,
  blog: string,
}

const Hero = ({ offset, factor = 1, images }: { offset: number; factor?: number, images: HeroImage[] }) => (
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
      <Suspense fallback={<div></div>}>
        <Canvas>
          <HeroCanvas images={images} />
        </Canvas>
      </Suspense>
    </ParallaxLayer>
  </div>
)

export default Hero
