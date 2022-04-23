/** @jsx jsx */
import { jsx, Text, Theme } from "theme-ui"
import { TextVariant } from "../../../types/theme"

interface TypographyProps {
  variant: TextVariant,
  children: string,
}

export const Typography = ({variant, children}: TypographyProps) => {
  const text = variant === 'blockquote'
    ? <Text variant="p" as="p">{children}</Text>
    : children

  return <Text variant={variant} as={variant}>{text}</Text>
}