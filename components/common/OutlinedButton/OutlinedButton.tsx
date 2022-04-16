import { Box, Button } from "@mui/material"
import { CSSObject } from "@mui/material/styles"
import { ButtonProps } from "@mui/material/Button"
import { styled } from "@mui/material/styles"

interface OutlinedButtonPropsTypes {
  children?: React.ReactNode
  buttonProps?: ButtonProps
}

export default function OutlinedButton({
  children = null,
  buttonProps = {},
}: OutlinedButtonPropsTypes) {
  return (
    <Box
      sx={{
        color: "text.primary",
      }}
    >
      <StyledButton
        variant="outlined"
        color="inherit"
        size="medium"
        {...buttonProps}
      >
        {children}
      </StyledButton>
    </Box>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  borderColor: "#ced4da",
  borderRadius: 30,
  padding: "5px 20px",
}))

const css: CSSObject = {}
