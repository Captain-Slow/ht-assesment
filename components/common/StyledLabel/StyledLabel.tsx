import { InputLabel } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledLabel = styled(InputLabel)(({ theme }) => ({
  color: "#000",
  fontWeight: "600",
  "&.Mui-focused": {
    color: "#000",
  },
}))

export default StyledLabel
