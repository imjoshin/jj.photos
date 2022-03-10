/** @jsx jsx */
import { jsx } from "theme-ui"
import Divider from "../../../elements/divider"
import Inner from "../../../elements/inner"
import Content from "../../../elements/content"
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
      <Canvas />
    </ParallaxLayer>
  </div>
)

export default Hero
