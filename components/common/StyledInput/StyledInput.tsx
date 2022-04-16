import { InputBase } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2.5),
    border: "1px solid #ced4da",
    borderColor: "#ced4da",
    borderRadius: 4,
    padding: "10px 12px",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  "& .MuiInputBase-input": {
    position: "relative",
    fontSize: "0.875rem",
    fontWeight: "500",
    paddingBottom: 0,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      backgroundColor: "white",
    },
  },
  "& .MuiAutocomplete-endAdornment": {
    marginRight: 8,
  },
  "&.Mui-focused": {
    borderColor: "#9da3a8",
  },
  "&:hover": {
    borderColor: "#9da3a8",
  },
  "&:active": {
    borderColor: "#9da3a8",
  },
}))

export default StyledInput
