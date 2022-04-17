import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import {
  Box,
  Typography,
  Grid,
  InputAdornment,
  Divider,
  Card,
  Stack,
  Alert,
  CardActionArea,
  MenuItem,
} from "@mui/material"
import { CSSObject } from "@mui/material/styles"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSnackbar } from "notistack"
import PersonIcon from "@mui/icons-material/Person"
import InfoIcon from "@mui/icons-material/Info"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import LockIcon from "@mui/icons-material/Lock"
import TagIcon from "@mui/icons-material/Tag"
import FmdGoodIcon from "@mui/icons-material/FmdGood"
import EventIcon from "@mui/icons-material/Event"
import { SelectChangeEvent } from "@mui/material/Select"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterMoment from "@mui/lab/AdapterMoment"

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
import { PLAN_TYPE_LIST_TYPE } from "../../../lib/data/types/planType"
import moment from "moment"

interface propTypes {
  userData: BASIC_USER_DATA_TYPE
  countryData: COUNTRY_LIST_TYPE
  planTypeData: PLAN_TYPE_LIST_TYPE
}

interface formikValues {
  cardHolderName: string
  cn: string
  cardExpiryDate: Date
  cardCvv: string
  zipCode: string
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
        cn,
        cardExpiryDate,
        countryId,
        zipCode,
        planTypeId,
      } = values

      await updateUserSubscriptionPlan({
        variables: {
          paymentDetaild: userData.paymentDetail.id,
          userSubscriptionPlanId: userData.userSubscriptionPlan.id,
          planTypeId,
          cardHolderName,
          cardNumber: cn,
          cardExpiryDate: moment(cardExpiryDate).format("DD/MM/YYYY"),
          zipCode,
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
      cardHolderName: userData.paymentDetail.cardHolderName ?? "",
      cn: userData.paymentDetail.cardNumber ?? "",
      cardExpiryDate: userData.paymentDetail.cardExpiryDate ?? new Date(),
      cardCvv: userData.paymentDetail.cardCvv ?? "",
      zipCode: userData.paymentDetail.zipCode ?? "",
      countryId: userData.profile.country.id ?? "",
      planTypeId: userData.userSubscriptionPlan.planType.id ?? "",
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

  const zipCodeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("zipCode", event.target.value as string)
  }

  const cvvOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("cardCvv", event.target.value as string)
  }

  const planTypeOnChange = (planTypeId: string) => {
    setFieldValue("planTypeId", planTypeId as string)
  }

  const expiryonChange = (newData: Date) => {
    setFieldValue("cardExpiryDate", newData)
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
          <Alert
            variant="outlined"
            severity="info"
            sx={css.alert}
            icon={<InfoIcon sx={{ color: "#2d5bdb" }} />}
          >
            <Typography
              sx={{ color: "#2d5bdb", fontWeight: "700" }}
              variant="body2"
            >
              Changing the plan will take effect immeditately. You will be
              charged the rest of the current month.
            </Typography>
          </Alert>
        </Box>
        <Box sx={css.cardContainer}>
          <Grid container justifyContent="center" spacing={3}>
            {Object.keys(planTypeData).map(planTypeId => {
              const specificPlanType = planTypeData[planTypeId]

              const selected = values.planTypeId === planTypeId

              return (
                <Grid key={planTypeId} item sm={4} xs={12}>
                  <Card
                    variant={selected ? "outlined" : "elevation"}
                    sx={selected ? css.selectedPlanTypeCard : css.planTypeCard}
                  >
                    <CardActionArea
                      onClick={() => planTypeOnChange(planTypeId)}
                    >
                      <Box sx={css.cardWrapper}>
                        <Box>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            sx={{
                              minHeight: "26px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "500",
                              }}
                            >
                              {specificPlanType.title}
                            </Typography>
                            {selected && (
                              <Box>
                                <CheckCircleIcon
                                  sx={{
                                    fontSize: "1.45rem",
                                  }}
                                  color="primary"
                                  fontSize="medium"
                                />
                              </Box>
                            )}
                          </Stack>
                          <CaptionText>
                            {specificPlanType.description}
                          </CaptionText>
                        </Box>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="flex-end"
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "500",
                            }}
                          >{`$${specificPlanType.rate}`}</Typography>
                          <Typography variant="body2">{`/ ${specificPlanType.compoundingPeriod}`}</Typography>
                        </Stack>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            })}
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
                  placeholder: "Card holder's name",
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
            <Grid item sm={6} xs={12}>
              <BootstrapInput
                label="Card Number"
                inputBaseProps={{
                  value: values["cn"],
                  onBlur: handleBlur,
                  placeholder: "Your name",
                  size: "small",
                  onChange: handleChange,
                  name: "cn",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <CreditCardIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "cn" in errors,
                }}
                helperText={"cn" in errors ? errors["cn"] : ""}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label=""
                  value={new Date()}
                  onChange={(newValue: any) => {
                    expiryonChange(newValue.toDate())
                  }}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <BootstrapInput
                      label="Expiration Date"
                      inputBaseProps={{
                        ref: inputRef,
                        value: moment(values["cardExpiryDate"]).format(
                          "DD/MM/YYYY"
                        ),
                        placeholder: "Your name",
                        size: "small",
                        name: "cardExpiryDate",
                        startAdornment:
                          inputProps.onClick !== undefined ? (
                            <InputAdornment position="start" sx={{ mr: 1.5 }}>
                              <EventIcon fontSize="small" sx={css.iconColor} />
                            </InputAdornment>
                          ) : (
                            <Box
                              sx={{
                                display: "flex",
                                paddingRight: 3,
                                "& .MuiInputAdornment-root": {
                                  marginLeft: 0,
                                },
                                "& .MuiIconButton-root": {
                                  padding: 0,
                                  color: "text.secondary",
                                },
                                "& .MuiSvgIcon-root": {
                                  fontSize: "1.25rem",
                                },
                              }}
                            >
                              {InputProps?.endAdornment}
                            </Box>
                          ),
                        onClick: (e: any) => {
                          if (inputProps.onClick !== undefined) {
                            inputProps.onClick(e)
                          } else {
                            if (InputProps.endAdornment !== undefined) {
                              InputProps.endAdornment["props"]["children"][
                                "props"
                              ].onClick()
                            }
                          }
                        },
                      }}
                      formControlProps={{
                        error: "cardExpiryDate" in errors,
                      }}
                      helperText={
                        "cardExpiryDate" in errors
                          ? errors["cardExpiryDate"]
                          : ""
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item sm={3} xs={12}>
              <BootstrapInput
                label="CVC / CVC2"
                inputBaseProps={{
                  value: values["cardCvv"],
                  onBlur: handleBlur,
                  placeholder: "Your name",
                  size: "small",
                  onChange: cvvOnChange,
                  name: "cardCvv",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <LockIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "cardCvv" in errors,
                }}
                helperText={"cardCvv" in errors ? errors["cardCvv"] : ""}
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
              <BootstrapInput
                label="Zip / Postal Code"
                inputBaseProps={{
                  value: values["zipCode"],
                  onBlur: handleBlur,
                  placeholder: "Your name",
                  size: "small",
                  onChange: zipCodeOnChange,
                  name: "zipCode",
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                      <TagIcon fontSize="small" sx={css.iconColor} />
                    </InputAdornment>
                  ),
                }}
                formControlProps={{
                  error: "zipCode" in errors,
                }}
                helperText={"zipCode" in errors ? errors["zipCode"] : ""}
              />
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

const UpdateUserBillingMutation = gql`
  mutation UpdateUserSubscriptionPlanMutation(
    $userSubscriptionPlanId: String!
    $planTypeId: String!
    $cardHolderName: String!
    $cardNumber: String!
    $cardExpiryDate: String!
    $countryId: String!
    $zipCode: String!
    $paymentDetaild: String!
  ) {
    updateUserSubscriptionPlan(
      userSubscriptionPlanId: $userSubscriptionPlanId
      planTypeId: $planTypeId
    ) {
      id
    }
    updatePaymentDetail(
      paymentDetaild: $paymentDetaild
      cardHolderName: $cardHolderName
      cardNumber: $cardNumber
      cardExpiryDate: $cardExpiryDate
      zipCode: $zipCode
      countryId: $countryId
    ) {
      id
    }
  }
`

const FormSchema = Yup.object().shape({
  cardHolderName: Yup.string().required("Card holder name is required"),
  cn: Yup.string()
    .required("Card number is required")
    .test("Digits only", "Card number format is incorrect", value => {
      return /^[0-9\-]+$/.test(value)
    }),
  cardCvv: Yup.string()
    .required("Card CVV is required")
    .test("Digits only", "Card cvv format is incorrect", value => {
      return /^\d+$/.test(value) && value.length < 5
    }),
  zipCode: Yup.string()
    .required("Zip code is required")
    .test("Digits only", "Zip code should have digits only", value => {
      return /^\d+$/.test(value)
    }),
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
  alert: {
    bgcolor: "#eff6ff",
  },
  cardContainer: {
    mt: 2.5,
  },
  planTypeCardContainer: {
    flexBasis: 250,
    flexGrow: 0,
    maxWidth: 250,
  },
  selectedPlanTypeCard: {
    borderColor: "primary.main",
    borderWidth: 3,
  },
  planTypeCard: {},
  cardWrapper: {
    p: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 130,
  },
}
