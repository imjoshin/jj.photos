/** @jsx jsx */
import { Box, Flex, Link, useColorMode, jsx } from "theme-ui"

export const Footer = () => {
  // const [colorMode, setColorMode] = useColorMode()
  // const isDark = colorMode === `dark`
  // const toggleColorMode = (e: any) => {
  //   setColorMode(isDark ? `light` : `dark`)
  // }

  return (
    <Box as="footer" variant="footer">
      Copyright &copy; {new Date().getFullYear()}. All rights reserved.
      <br />
      <Flex
        sx={{
          justifyContent: `center`,
          alignItems: `center`,
          mt: 3,
          color: `text`,
          fontWeight: `semibold`,
          a: { color: `text` },
        }}
      >
        Built with{` `}
        <Link
          aria-label="Link to the Gatsby's home page"
          sx={{ ml: 2 }}
          target="_blank"
          href="https://gatsbyjs.com/"
        >
          Gatsby
        </Link>
        , inspired by{` `}
        <Link
          aria-label="Link to the theme's GitHub repository"
          sx={{ ml: 2 }}
          target="_blank"
          href="https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-cara"
        >
          LekoArts
        </Link>
      </Flex>
    </Box>
  )
}
