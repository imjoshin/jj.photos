import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./Nav.module.css"
import { clsx } from "clsx"

interface NavProps {
  accentColor: string,
  className?: string,
}

export const Nav = ({className, accentColor}: NavProps) => {
  const hoverColor = {
    color: accentColor,
  }

  return (
    <div className={clsx([styles.nav, className])} style={hoverColor}>
      <Link className={styles.link} to="/">Nav 1</Link>
      <Link className={styles.link} to="/">Nav 2</Link>
      <Link className={styles.link} to="/">Nav 3</Link>
    </div>
  )
}