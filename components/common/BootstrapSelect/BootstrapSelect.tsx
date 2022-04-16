import { FormControl, FormHelperText, Select } from "@mui/material"
import { SelectProps } from "@mui/material/Select"
import { FormControlProps } from "@mui/material/FormControl"
import { FormikErrors } from "formik"

import StyledInput from "../StyledInput"
import StyledLabel from "../StyledLabel"

interface BootstrapInputPropsTypes {
  label: string
  selectProps?: SelectProps
  formControlProps?: FormControlProps
  helperText?: string | string[] | FormikErrors<any> | FormikErrors<any>[]
  children?: React.ReactNode
}

export default function BootstrapSelect({
  label = "",
  selectProps = {},
  formControlProps = {},
  helperText = null,
  children = null,
}: BootstrapInputPropsTypes) {
  return (
    <FormControl fullWidth variant="standard" {...formControlProps}>
      <StyledLabel shrink>{label}</StyledLabel>
      <Select {...selectProps} input={<StyledInput />}>
        {children}
      </Select>
      {helperText !== undefined && helperText !== null && helperText !== "" && (
        <FormHelperText>{`${helperText}`}</FormHelperText>
      )}
    </FormControl>
  )
}
