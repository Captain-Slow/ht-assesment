import { Box, Typography } from "@mui/material"
import { CSSObject } from "@mui/material/styles"
import { useFormik } from "formik"
import * as Yup from "yup"

import { BASIC_USER_DATA_TYPE } from "../../../lib/data/types/user"
import { CaptionText, SectionTitle } from "../../common"

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
  console.log(userData)
  const onFormSubmit = async (values: formikValues) => {
    try {
    } catch (e) {}
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

  return (
    <Box>
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
  email: Yup.string().required("Email is required"),
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
}
