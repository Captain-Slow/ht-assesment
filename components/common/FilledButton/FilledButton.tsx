import { Box, Button } from "@mui/material"
import { CSSObject } from "@mui/material/styles"
import { ButtonProps } from "@mui/material/Button"
import { styled } from "@mui/material/styles"

interface FilledButtonPropsTypes {
  children?: React.ReactNode
  buttonProps?: ButtonProps
}

export default function FilledButton({
  children = null,
  buttonProps = {},
}: FilledButtonPropsTypes) {
  return (
    <Box>
      <StyledButton
        variant="contained"
        color="primary"
        size="medium"
        disableElevation
        {...buttonProps}
      >
        {children}
      </StyledButton>
    </Box>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  borderRadius: 30,
  padding: "5px 20px",
}))

const css: CSSObject = {}
