import React from "react"
import { Typography } from "@mui/material"
import { CSSObject } from "@mui/material/styles"

interface propTypes {
  children: React.ReactNode
}

export default function CaptionText({ children }: propTypes) {
  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={css.navDescText}
      variantMapping={{
        caption: "p",
      }}
    >
      {children}
    </Typography>
  )
}

const css: CSSObject = {
  navDescText: {
    mt: 0.5,
    lineHeight: 1.43,
  },
}
