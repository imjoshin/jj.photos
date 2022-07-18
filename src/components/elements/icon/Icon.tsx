import * as React from "react"
import * as styles from "./Icon.module.css"

interface IconProps {
  accent: string,
  className?: string,
}

export const Icon = ({accent, className}: IconProps) => {
  const accentStyle = {
    background: accent,
  }

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.main} />
      <div className={styles.accent} style={accentStyle} />
    </div>
  )
}