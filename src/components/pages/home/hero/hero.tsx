/** @jsx jsx */
import { Suspense } from "react"
import { jsx } from "theme-ui"
import { Canvas } from "react-three-fiber"
import { ParallaxLayer } from "@react-spring/parallax"
import HeroCanvas from "./canvas"
import { Overlay } from "./overlay"
import "./hero.css"

export interface HeroImage {
  src: string,
  blog: string,
  aspectRatio: number,
}

export const Hero = ({ offset, factor = 1, images }: { offset: number; factor?: number, images: HeroImage[] }) => (
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
      <Overlay className="hero-overlay" />
      <div className="hero-canvas">
        <Canvas>
          <HeroCanvas images={images} />
        </Canvas>
      </div>
    </ParallaxLayer>
  </div>
)
