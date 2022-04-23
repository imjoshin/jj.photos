/** @jsx jsx */
import { jsx } from "theme-ui"
import { Divider } from "../../elements/divider/divider"
import { Inner } from "../../elements/inner/inner"
import { Content } from "../../elements/content/content"
import ProjectCard from "./project-card"
import Svg from "../../svg"
import { UpDown, UpDownWide } from "../../../styles/animations"
import Colors from "../../../styles/colors";
import { Typography } from "../../elements/typography"

const Blog = ({ offset, factor = 2 }: { offset: number; factor?: number }) => (
  <div>
    <Divider
      bg="linear-gradient(to right, #6b00b6 0%, #9600ff 100%)"
      sx={{ clipPath: `polygon(0 15%, 100% 25%, 100% 85%, 0 75%)` }}
      speed={-0.2}
      offset={offset + 0.1}
      factor={factor}
    />
    <Content speed={0.4} offset={offset + 0.2} factor={factor}>
      <Inner>
        <div
          sx={{
            display: `grid`,
            gridGap: [4, 4, 4, 5],
            gridTemplateColumns: [`1fr`, `1fr`, `repeat(2, 1fr)`],
            h2: { gridColumn: `-1/1`, color: `white !important` },
          }}
        >
          <Typography variant="h2">Blog</Typography>
          <ProjectCard
            title="Tips & Tricks for Gatsby"
            link="https://www.lekoarts.de/gatsby/tips-and-tricks-for-gatsby?utm_source=cara&utm_medium=Theme"
            bg="linear-gradient(to right, #D4145A 0%, #FBB03B 100%)"
          >
            A collection of short, but useful quick tips shared by me and the community
            about Gatsby. From GraphQL over local development to deployment.
          </ProjectCard>
          <ProjectCard
            title="Setting  up a yarn Workspace"
            link="https://www.lekoarts.de/javascript/setting-up-a-yarn-workspace-with-typescript-eslint-and-cypress?utm_source=cara&utm_medium=Theme"
            bg="linear-gradient(to right, #662D8C 0%, #ED1E79 100%)"
          >
            A robust solution for multi-package repositories.
          </ProjectCard>
          <ProjectCard
            title="Adding a Draft Feature to Gatsby"
            link="https://www.lekoarts.de/garden/adding-a-draft-feature-to-gatsby?utm_source=cara&utm_medium=Theme"
            bg="linear-gradient(to right, #009245 0%, #FCEE21 100%)"
          >
            A solution with the createSchemaCustomization API.
          </ProjectCard>
          <ProjectCard
            title="Theme UI Plugin for Figma"
            link="https://www.lekoarts.de/design/introducing-the-theme-ui-plugin-for-figma?utm_source=cara&utm_medium=Theme"
            bg="linear-gradient(to right, #D585FF 0%, #00FFEE 100%)"
          >
            The Theme UI plugin for Figma allows for a workflow where Theme UI is the
            starting point both for design & development.
          </ProjectCard>
        </div>
      </Inner>
    </Content>
    <Divider speed={0.1} offset={offset} factor={factor}>
      <UpDown>
        <Svg icon="box" width={6} color="white" left="85%" top="75%" />
        <Svg icon="upDown" width={8} color="white" left="70%" top="20%" />
        <Svg icon="triangle" width={8} stroke color="white" left="25%" top="5%" />
        <Svg icon="circle" hiddenMobile width={24} color="white" left="17%" top="60%" />
        <Svg icon="triangle" width={8} stroke color={Colors.lightpurple} left="25%" top="5%" />
        <Svg icon="circle" hiddenMobile width={24} color={Colors.lightpurple} left="40%" top="0%" />
      </UpDown>
      <UpDownWide>
        <Svg icon="arrowUp" hiddenMobile width={16} color="white" left="50%" top="90%" />
        <Svg icon="triangle" width={12} stroke color="white" left="90%" top="30%" />
        <Svg icon="circle" width={16} color="white" left="70%" top="90%" />
        <Svg icon="triangle" hiddenMobile width={16} stroke color="white" left="18%" top="75%" />
        <Svg icon="circle" width={6} color="white" left="75%" top="10%" />
        <Svg icon="upDown" hiddenMobile width={8} color="white" left="45%" top="10%" />
      </UpDownWide>
      <Svg icon="circle" hiddenMobile width={6} color="white" left="4%" top="20%" />
      <Svg icon="circle" width={12} color="white" left="80%" top="60%" />
      <Svg icon="box" width={6} color="white" left="10%" top="10%" />
      <Svg icon="box" width={12} color="white" left="75%" top="30%" />
      <Svg icon="hexa" width={16} stroke color="white" left="29%" top="26%" />
      <Svg icon="hexa" width={8} stroke color="white" left="80%" top="70%" />
      <Svg icon="hexa" width={16} stroke color={Colors.purple} left="75%" top="15%" />
    </Divider>
  </div>
)

export default Blog
