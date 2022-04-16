import { FormControl, FormHelperText } from "@mui/material"
import { InputBaseProps } from "@mui/material/InputBase"
import { FormControlProps } from "@mui/material/FormControl"
import { FormikErrors } from "formik"

import StyledInput from "../StyledInput"
import StyledLabel from "../StyledLabel"

interface BootstrapInputPropsTypes {
  label: string
  inputBaseProps?: InputBaseProps
  formControlProps?: FormControlProps
  helperText?: string | string[] | FormikErrors<any> | FormikErrors<any>[]
}

export default function BootstrapInput({
  label = "",
  inputBaseProps = {},
  formControlProps = {},
  helperText = null,
}: BootstrapInputPropsTypes) {
  return (
    <FormControl fullWidth variant="standard" {...formControlProps}>
      <StyledLabel shrink>{label}</StyledLabel>
      <StyledInput {...inputBaseProps} />
      {helperText !== undefined && helperText !== null && helperText !== "" && (
        <FormHelperText>{`${helperText}`}</FormHelperText>
      )}
    </FormControl>
  )
}
