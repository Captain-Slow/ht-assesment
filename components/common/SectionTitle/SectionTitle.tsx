import React from "react"
import { Typography } from "@mui/material"
import { CSSObject } from "@mui/material/styles"

interface propTypes {
  children: React.ReactNode
}

export default function SectionTitle({ children }: propTypes) {
  return (
    <Typography
      variant="h6"
      variantMapping={{
        h6: "h2",
      }}
      sx={css.title}
    >
      {children}
    </Typography>
  )
}

const css: CSSObject = {
  title: {
    fontWeight: "700",
    fontSize: "1.35rem",
  },
}
