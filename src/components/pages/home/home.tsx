import { HeroImage } from "./hero";
import * as React from "react"
import { Parallax } from "@react-spring/parallax"
import Layout from "../../layout"
import Hero from "./hero"
import Intro from "./intro"
import Blog from "./blog"
import About from "./about"
import Contact from "./contact"

interface HomeProps {
  images: HeroImage[]
}

export const Home = ({ images }: HomeProps) => {
  return (
    <Layout>
      <Parallax pages={6}>
        <Hero offset={0} factor={1} images={images} />
        <Intro offset={1} factor={1} />
        <Blog offset={2} factor={2} />
        <About offset={4} factor={1} />
        <Contact offset={5} factor={1} />
      </Parallax>
    </Layout>
  )
}
