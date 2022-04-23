import { StaticImage } from "gatsby-plugin-image"

interface ImageProps {
  src: string,
  alt?: string
}

export const Image = ({src, alt=""}: ImageProps) => {
  return <div>
    <StaticImage src={src} alt={alt} />
  </div>
}