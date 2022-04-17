import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import {
  Box,
  Typography,
  Grid,
  InputAdornment,
  Divider,
  MenuItem,
  Stack,
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
import LanguageIcon from "@mui/icons-material/Language"
import { SelectChangeEvent } from "@mui/material/Select"

import {
  CaptionText,
  SectionTitle,
  BootstrapInput,
  BootstrapSelect,
  OutlinedButton,
  FilledButton,
} from "../../common"
import { BASIC_USER_DATA_TYPE } from "../../../lib/data/types/user"
import { COUNTRY_LIST_TYPE } from "../../../lib/data/types/country"
import { VERNACULAR_LIST_TYPE } from "../../../lib/data/types/vernacular"

interface propTypes {
  userData: BASIC_USER_DATA_TYPE
  countryData: COUNTRY_LIST_TYPE
  vernacularData: VERNACULAR_LIST_TYPE
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

export default function AccountForm({
  userData,
  countryData,
  vernacularData,
}: propTypes) {
  const [updateProfile, { loading, error, data }] = useMutation(
    UpdateUserProfileMutation,
    { errorPolicy: "all" }
  )

  const { enqueueSnackbar } = useSnackbar()

  const onFormSubmit = async (values: formikValues) => {
    try {
      const {
        username,
        jobTitle,
        company,
        bio,
        phoneNumber,
        email,
        countryId,
        vernacularId,
      } = values

      const fullName = values.name

      await updateProfile({
        variables: {
          profileId: userData.profile.id,
          name: fullName,
          username,
          jobTitle,
          company,
          bio,
          phoneNumber,
          email,
          countryId,
          vernacularId,
        },
      })

      enqueueSnackbar("Profile and personal information updated", {
        variant: "success",
      })
    } catch (e) {
      enqueueSnackbar("Error submitting", {
        variant: "error",
      })
    }
  }

  const formFormik = useFormik({
    initialValues: {
      name: userData.profile.name ?? "",
      username: userData.profile.username ?? "",
      jobTitle: userData.profile.jobTitle ?? "",
      company: userData.profile.company ?? "",
      bio: userData.profile.bio ?? "",
      phoneNumber: userData.profile.phoneNumber ?? "",
      email: userData.profile.email ?? "",
      countryId: userData.profile.country.id ?? "",
      vernacularId: userData.profile.vernacular.id ?? "",
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
    setFieldValue,
    resetForm,
  } = formFormik

  const countryOnChange = (event: SelectChangeEvent) => {
    setFieldValue("countryId", event.target.value as string)
  }

  const languageOnChange = (event: SelectChangeEvent) => {
    setFieldValue("vernacularId", event.target.value as string)
  }

  const phoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("phoneNumber", event.target.value as string)
  }

  const formReset = () => {
    resetForm()

    enqueueSnackbar("Form has been reset", {
      variant: "success",
    })
  }

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
                      sx={{ width: "128px", minWidth: "128px" }}
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
                  placeholder: "Your current company",
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
                  placeholder: "Your phone number",
                  size: "small",
                  onChange: phoneNumberChange,
                  name: "phoneNumber",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <PhoneIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                  type: "number",
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
                  value: values["countryId"],
                  onBlur: handleBlur,
                  size: "small",
                  onChange: countryOnChange,
                  name: "countryId",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <FmdGoodIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "countryId" in errors,
                }}
                helperText={"countryId" in errors ? errors["countryId"] : ""}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {Object.keys(countryData).map(countryId => {
                  const specificCountryData = countryData[countryId]

                  return (
                    <MenuItem key={countryId} value={countryId}>
                      {specificCountryData.title}
                    </MenuItem>
                  )
                })}
              </BootstrapSelect>
            </Grid>
            <Grid item sm={6} xs={12}>
              <BootstrapSelect
                label="Language"
                selectProps={{
                  value: values["vernacularId"],
                  onBlur: handleBlur,
                  size: "small",
                  onChange: languageOnChange,
                  name: "vernacularId",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <LanguageIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "vernacularId" in errors,
                }}
                helperText={
                  "vernacularId" in errors ? errors["vernacularId"] : ""
                }
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {Object.keys(vernacularData).map(vernacularId => {
                  const specificVernacularData = vernacularData[vernacularId]

                  return (
                    <MenuItem key={vernacularId} value={vernacularId}>
                      {specificVernacularData.title}
                    </MenuItem>
                  )
                })}
              </BootstrapSelect>
            </Grid>
          </Grid>
        </Box>
        <Box sx={css.dividerContainer}>
          <Divider />
        </Box>
        <Box>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <OutlinedButton
              buttonProps={{
                onClick: formReset,
              }}
            >
              Cancel
            </OutlinedButton>
            <FilledButton
              buttonProps={{
                type: "submit",
                disabled: isSubmitting,
              }}
            >
              Save
            </FilledButton>
          </Stack>
        </Box>
      </form>
    </Box>
  )
}

const UpdateUserProfileMutation = gql`
  mutation UpdateUserProfileMutation(
    $profileId: String!
    $name: String!
    $username: String!
    $jobTitle: String!
    $company: String!
    $bio: String!
    $phoneNumber: String!
    $email: String!
    $countryId: String!
    $vernacularId: String!
  ) {
    updateProfile(
      profileId: $profileId
      name: $name
      username: $username
      jobTitle: $jobTitle
      company: $company
      bio: $bio
      phoneNumber: $phoneNumber
      email: $email
      countryId: $countryId
      vernacularId: $vernacularId
    ) {
      id
    }
  }
`

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  jobTitle: Yup.string().required("Job title is required"),
  company: Yup.string().required("Company name is required"),
  bio: Yup.string().required("Bio is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .test("Digits only", "Phone number should have digits only", value => {
      return /^\d+$/.test(value)
    }),
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
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
    borderRightColor: "#ced4da",
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
