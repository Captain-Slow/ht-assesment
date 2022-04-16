import React from "react"
import { Typography } from "@mui/material"
import { CSSObject } from "@mui/material/styles"

interface propTypes {
  children: React.ReactNode
  darkerGrey?: boolean
}

export default function CaptionText({
  children,
  darkerGrey = false,
}: propTypes) {
  return (
    <Typography
      variant="caption"
      color={darkerGrey ? "#77869a" : "text.secondary"}
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
    fontWeight: "500",
  },
}
