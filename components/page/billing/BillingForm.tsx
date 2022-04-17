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
  Alert,
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
import { PLAN_TYPE_LIST_TYPE } from "../../../lib/data/types/planType"

interface propTypes {
  userData: BASIC_USER_DATA_TYPE
  countryData: COUNTRY_LIST_TYPE
  planTypeData: PLAN_TYPE_LIST_TYPE
}

interface formikValues {
  cardHolderName: string
  cardNumber: string
  cardExpiryDate: string
  countryId: string
  planTypeId: string
}

export default function BillingForm({
  userData,
  countryData,
  planTypeData,
}: propTypes) {
  const [updateUserSubscriptionPlan, { loading, error, data }] = useMutation(
    UpdateUserBillingMutation,
    { errorPolicy: "all" }
  )

  const { enqueueSnackbar } = useSnackbar()

  const onFormSubmit = async (values: formikValues) => {
    try {
      const {
        cardHolderName,
        cardNumber,
        cardExpiryDate,
        countryId,
        planTypeId,
      } = values

      await updateUserSubscriptionPlan({
        variables: {
          userSubscriptionPlanId: userData.paymentDetail.id,
          planTypeId,
          cardHolderName,
          cardNumber,
          cardExpiryDate,
          countryId,
        },
      })

      enqueueSnackbar("Subscription Plan and Payment Details updated", {
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
      cardHolderName: userData.paymentDetail.cardHolderName,
      cardNumber: userData.paymentDetail.cardNumber,
      cardExpiryDate: userData.paymentDetail.cardExpiryDate,
      countryId: userData.profile.country.id,
      planTypeId: userData.userSubscriptionPlan.planType.id,
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

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={css.sectionTitleContainer}>
          <SectionTitle>{"Plan & Billing"}</SectionTitle>
        </Box>
        <Box sx={css.sectionSubTitleContainer}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              fontWeight: "500",
            }}
          >
            Change your plan
          </Typography>
          <CaptionText>Upgrade or downgrade your current plan.</CaptionText>
        </Box>
        <Box sx={css.alertBoxContainer}>
          <Alert variant="outlined" severity="info">
            Changing the plan will take effect immeditately. You will be charged
            the rest of the current month.
          </Alert>
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
            Payment Details
          </Typography>
          <CaptionText>
            Update your billing information. Make sure to set your location
            correctky as it could affect your tax rates
          </CaptionText>
        </Box>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <BootstrapInput
                label="Card Holder"
                inputBaseProps={{
                  value: values["cardHolderName"],
                  onBlur: handleBlur,
                  placeholder: "Your name",
                  size: "small",
                  onChange: handleChange,
                  name: "cardHolderName",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <PersonIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "cardHolderName" in errors,
                }}
                helperText={
                  "cardHolderName" in errors ? errors["cardHolderName"] : ""
                }
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={css.dividerContainer}>
          <Divider />
        </Box>
        <Box>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <OutlinedButton>Cancel</OutlinedButton>
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

const UpdateUserBillingMutation = gql`
  mutation UpdateUserSubscriptionPlanMutation(
    $userSubscriptionPlanId: String!
    $planTypeId: String!
    $cardHolderName: String!
    $cardNumber: String!
    $cardExpiryDate: String!
    $countryId: String!
  ) {
    updateUserSubscriptionPlan(
      userSubscriptionPlanId: $userSubscriptionPlanId
      planTypeId: $planTypeId
    ) {
      id
    }
    updatePaymentDetail(
      planTypeId: $planTypeId
      cardHolderName: $cardHolderName
      cardNumber: $cardNumber
      cardExpiryDate: $cardExpiryDate
      countryId: $countryId
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
      // return value === "" || value === undefined ? true : /^\d+$/.test(value)
    }),
  email: Yup.string()
    .email("Email must be a valid email")
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
  alertBoxContainer: {
    mt: 2,
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
