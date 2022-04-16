import { useEffect } from "react"
import {
  Box,
  Typography,
  Grid,
  InputAdornment,
  Divider,
  MenuItem,
} from "@mui/material"
import { CSSObject } from "@mui/material/styles"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSnackbar } from "notistack"
import PersonIcon from "@mui/icons-material/Person"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import BusinessIcon from "@mui/icons-material/Business"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import FmdGoodIcon from "@mui/icons-material/FmdGood"

import { BASIC_USER_DATA_TYPE } from "../../../lib/data/types/user"
import {
  CaptionText,
  SectionTitle,
  BootstrapInput,
  BootstrapSelect,
} from "../../common"

interface propTypes {
  userData: BASIC_USER_DATA_TYPE
}

interface formikValues {
  name: string
  username: string
  jobTitle: string
  company: string
  bio: string
  phoneNumber: string
  email: string
  countryId: string
  vernacularId: string
}

export default function AccountForm({ userData }: propTypes) {
  const { enqueueSnackbar } = useSnackbar()

  console.log(userData)
  const onFormSubmit = async (values: formikValues) => {
    try {
    } catch (e) {
      enqueueSnackbar("Error submitting", {
        variant: "error",
      })
    }
  }

  const formFormik = useFormik({
    initialValues: {
      name: userData.profile.name,
      username: userData.profile.username,
      jobTitle: userData.profile.jobTitle,
      company: userData.profile.company,
      bio: userData.profile.bio,
      phoneNumber: userData.profile.phoneNumber,
      email: userData.profile.email,
      countryId: userData.profile.country.id,
      vernacularId: userData.profile.vernacular.id,
    },
    validationSchema: FormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onFormSubmit,
  })

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formFormik

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={css.sectionTitleContainer}>
          <SectionTitle>Account</SectionTitle>
        </Box>
        <Box sx={css.sectionSubTitleContainer}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              fontWeight: "500",
            }}
          >
            Profile
          </Typography>
          <CaptionText>
            Following information is publicly displayed, be careful
          </CaptionText>
        </Box>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <BootstrapInput
                label="Name"
                inputBaseProps={{
                  value: values["name"],
                  onBlur: handleBlur,
                  placeholder: "Your name",
                  size: "small",
                  onChange: handleChange,
                  name: "name",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <PersonIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "name" in errors,
                }}
                helperText={"name" in errors ? errors["name"] : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <BootstrapInput
                label="Username"
                inputBaseProps={{
                  value: values["username"],
                  onBlur: handleBlur,
                  placeholder: "Your username",
                  size: "small",
                  onChange: handleChange,
                  name: "username",
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ mr: 2, width: "127px" }}
                    >
                      <Box sx={css.usernameInputAdornment}>
                        <Box sx={css.usernameInputAdornmentCaption}>
                          <CaptionText darkerGrey>hackertrail.com/</CaptionText>
                        </Box>
                      </Box>
                    </InputAdornment>
                  ),
                  sx: {
                    position: "relative",
                  },
                }}
                formControlProps={{
                  error: "username" in errors,
                }}
                helperText={"username" in errors ? errors["username"] : ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <BootstrapInput
                label="Title"
                inputBaseProps={{
                  value: values["jobTitle"],
                  onBlur: handleBlur,
                  placeholder: "Your job title",
                  size: "small",
                  onChange: handleChange,
                  name: "jobTitle",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <BusinessCenterIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "jobTitle" in errors,
                }}
                helperText={"jobTitle" in errors ? errors["jobTitle"] : ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <BootstrapInput
                label="Company"
                inputBaseProps={{
                  value: values["company"],
                  onBlur: handleBlur,
                  placeholder: "Your job title",
                  size: "small",
                  onChange: handleChange,
                  name: "company",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <BusinessIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "company" in errors,
                }}
                helperText={"company" in errors ? errors["company"] : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <BootstrapInput
                label="About"
                inputBaseProps={{
                  value: values["bio"],
                  onBlur: handleBlur,
                  placeholder: "About yourself",
                  size: "small",
                  onChange: handleChange,
                  name: "bio",
                  multiline: true,
                  maxRows: 5,
                }}
                formControlProps={{
                  error: "bio" in errors,
                }}
                helperText={
                  "bio" in errors
                    ? errors["bio"]
                    : "Brief description for your profile. Basic HTML and Emoji are allowed"
                }
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={css.dividerContainer}>
          <Divider />
        </Box>
        <Box sx={css.sectionSubTitleContainer}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              fontWeight: "500",
            }}
          >
            Personal Information
          </Typography>
          <CaptionText>
            Communication details in case we want to connect with you. These
            will be kept private.
          </CaptionText>
        </Box>
        <Box>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <BootstrapInput
                label="Email"
                inputBaseProps={{
                  value: values["email"],
                  onBlur: handleBlur,
                  placeholder: "Your name",
                  size: "small",
                  onChange: handleChange,
                  name: "email",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <EmailIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "email" in errors,
                }}
                helperText={"email" in errors ? errors["email"] : ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <BootstrapInput
                label="Phone"
                inputBaseProps={{
                  value: values["phoneNumber"],
                  onBlur: handleBlur,
                  placeholder: "Your name",
                  size: "small",
                  onChange: handleChange,
                  name: "phoneNumber",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <PhoneIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "phoneNumber" in errors,
                }}
                helperText={
                  "phoneNumber" in errors ? errors["phoneNumber"] : ""
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <BootstrapSelect
                label="Country"
                selectProps={{
                  value: values["country"],
                  onBlur: handleBlur,
                  size: "small",
                  // onChange: handleChange,
                  name: "country",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <FmdGoodIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "country" in errors,
                }}
                helperText={"country" in errors ? errors["country"] : ""}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  )
}

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  jobTitle: Yup.string().required("Job title is required"),
  company: Yup.string().required("Current employer name is required"),
  bio: Yup.string().required("Your bio is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email().required("Email is required"),
  countryId: Yup.string().required("Please select a country"),
  vernacularId: Yup.string().required("Please select a language"),
})

const css: CSSObject = {
  sectionTitleContainer: {
    mb: 3,
  },
  sectionSubTitleContainer: {
    mb: 3,
  },
  iconColor: {
    color: "text.secondary",
  },
  usernameInputAdornment: {
    bgcolor: "#eef2ff",
    borderRight: "1px solid",
    borderRightColor: "text.secondary",
    px: 2,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  usernameInputAdornmentCaption: {
    mb: 0.5,
  },
  dividerContainer: {
    my: 5,
  },
}
