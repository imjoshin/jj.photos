/** @jsx jsx */
import { jsx } from "theme-ui"
import { Divider } from "../../elements/divider/divider"
import { Inner } from "../../elements/inner/inner"
import { Content } from "../../elements/content/content"
import Svg from "../../svg"
import { UpDown, UpDownWide, waveAnimation } from "../../../styles/animations"
import Footer from "../../footer"
// @ts-ignore
import ContactMDX from "../../../markdown/home/contact"

const Contact = ({ offset, factor = 1 }: { offset: number; factor?: number }) => (
  <div>
    <Content speed={0.4} offset={offset} factor={factor}>
      <Inner>
        <ContactMDX />
      </Inner>
      <Footer />
    </Content>
    <Divider speed={0.1} offset={offset} factor={factor}>
      <UpDown>
        <Svg icon="upDown" hiddenMobile width={8} color="icon_darkest" left="70%" top="20%" />
        <Svg icon="triangle" width={8} stroke color="icon_darkest" left="25%" top="5%" />
      </UpDown>
      <UpDownWide>
        <Svg icon="triangle" width={12} stroke color="icon_brightest" left="95%" top="50%" />
        <Svg icon="circle" width={6} color="icon_brightest" left="85%" top="15%" />
        <Svg icon="upDown" hiddenMobile width={8} color="icon_darkest" left="45%" top="10%" />
      </UpDownWide>
      <Svg icon="circle" width={6} color="icon_brightest" left="4%" top="20%" />
      <Svg icon="circle" width={12} color="icon_darkest" left="70%" top="60%" />
      <Svg icon="box" width={12} color="icon_darkest" left="20%" top="30%" />
      <Svg icon="hexa" width={8} stroke color="icon_darkest" left="80%" top="70%" />
    </Divider>
  </div>
)

export default Contact
