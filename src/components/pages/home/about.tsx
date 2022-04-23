import * as React from "react"
import { Divider } from "../../elements/divider/divider"
import { Inner } from "../../elements/inner/inner"
import { Content } from "../../elements/content/content"
import Svg from "../../svg"
import { UpDown, UpDownWide } from "../../../styles/animations"
import Colors from "../../../styles/colors"
import { Typography } from "../../elements/typography"

const About = ({ offset, factor = 1 }: { offset: number; factor?: number }) => (
  <div>
    <Divider
      bg="var(--theme-ui-colors-gray-3)"
      clipPath="polygon(0 16%, 100% 4%, 100% 82%, 0 94%)"
      speed={0.2}
      offset={offset}
      factor={factor}
    />
    <Divider speed={0.1} offset={offset} factor={factor}>
      <UpDown>
        <Svg icon="box" hiddenMobile width={6} color={Colors.darkpurple} left="50%" top="75%" />
        <Svg icon="upDown" hiddenMobile width={8} color="icon_darkest" left="70%" top="20%" />
        <Svg icon="triangle" width={8} stroke color="icon_darkest" left="25%" top="5%" />
        <Svg icon="upDown" hiddenMobile width={24} color={Colors.purple} left="80%" top="80%" />
      </UpDown>
      <UpDownWide>
        <Svg icon="arrowUp" hiddenMobile width={16} color={Colors.lightpurple} left="5%" top="80%" />
        <Svg icon="triangle" width={12} stroke color="icon_brightest" left="95%" top="50%" />
        <Svg icon="circle" hiddenMobile width={6} color="icon_brightest" left="85%" top="15%" />
        <Svg icon="upDown" hiddenMobile width={8} color="icon_darkest" left="45%" top="10%" />
      </UpDownWide>
      <Svg icon="circle" hiddenMobile width={6} color="icon_brightest" left="4%" top="20%" />
      <Svg icon="circle" width={12} color="icon_darkest" left="70%" top="60%" />
      <Svg icon="box" width={6} color={Colors.purple} left="10%" top="10%" />
      <Svg icon="box" width={12} color="icon_darkest" left="20%" top="30%" />
      <Svg icon="hexa" width={8} stroke color="icon_darkest" left="80%" top="70%" />
    </Divider>
    <Content speed={0.4} offset={offset} factor={factor}>
      <Inner>
        <Typography variant="h2">Hello!</Typography>
        <Typography variant="blockquote">
          Content content content content content content content content content content content content content
        </Typography>
        <Typography variant="p">
          Content content content content content content content content content content content content content content content content content content content content content content content content content
        </Typography>
      </Inner>
    </Content>
  </div>
)

export default About
