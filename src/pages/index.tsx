import * as React from "react"
import { Parallax } from "@react-spring/parallax"
import Layout from "../components/layout"
import Hero from "../components/home/hero"
import Intro from "../components/home/intro"
import Blog from "../components/home/blog"
import About from "../components/home/about"
import Contact from "../components/home/contact"

const Home = () => (
  <Layout>
    <Parallax pages={6}>
      <Hero offset={0} factor={1} />
      <Intro offset={1} factor={1} />
      <Blog offset={2} factor={2} />
      <About offset={4} factor={1} />
      <Contact offset={5} factor={1} />
    </Parallax>
  </Layout>
)

export default Home
