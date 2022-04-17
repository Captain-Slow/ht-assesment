import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import {
  Box,
  Typography,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemText,
  Switch,
} from "@mui/material"
import { CSSObject } from "@mui/material/styles"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSnackbar } from "notistack"

import {
  CaptionText,
  SectionTitle,
  OutlinedButton,
  FilledButton,
} from "../../common"
import { BASIC_USER_DATA_TYPE } from "../../../lib/data/types/user"

interface propTypes {
  userData: BASIC_USER_DATA_TYPE
}

interface formikValues {
  communicationAlert: boolean
  securityAlert: boolean
  meetupAlert: boolean
  itemCommentAlert: boolean
  mentionAlert: boolean
  followAlert: boolean
  repliesAlert: boolean
}

export default function NotificationsForm({ userData }: propTypes) {
  const [updateNotificationSetting, { loading, error, data }] = useMutation(
    UpdateUserProfileMutation,
    { errorPolicy: "all" }
  )

  const { enqueueSnackbar } = useSnackbar()

  const onFormSubmit = async (values: formikValues) => {
    try {
      const {
        communicationAlert,
        securityAlert,
        meetupAlert,
        itemCommentAlert,
        mentionAlert,
        followAlert,
        repliesAlert,
      } = values

      await updateNotificationSetting({
        variables: {
          notificationSettingId: userData.notificationSetting.id,
          communicationAlert,
          securityAlert,
          meetupAlert,
          itemCommentAlert,
          mentionAlert,
          followAlert,
          repliesAlert,
        },
      })

      enqueueSnackbar("Notifications settings updated", {
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
      communicationAlert: userData.notificationSetting.communicationAlert,
      securityAlert: userData.notificationSetting.securityAlert,
      meetupAlert: userData.notificationSetting.meetupAlert,
      itemCommentAlert: userData.notificationSetting.itemCommentAlert,
      mentionAlert: userData.notificationSetting.mentionAlert,
      followAlert: userData.notificationSetting.followAlert,
      repliesAlert: userData.notificationSetting.repliesAlert,
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

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={css.sectionTitleContainer}>
          <SectionTitle>Notifications</SectionTitle>
        </Box>
        <Box sx={css.sectionSubTitleContainer}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              fontWeight: "500",
            }}
          >
            Alerts
          </Typography>
        </Box>
        <Box>
          <List>
            <ListItem sx={css.listItem}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={css.primaryText}
                  >
                    {"Communication"}
                  </Typography>
                }
                secondary={
                  <CaptionText>
                    {"Get mews. announcements, and product updates."}
                  </CaptionText>
                }
                secondaryTypographyProps={{
                  component: "div",
                }}
              />
              <Switch
                edge="end"
                name="communicationAlert"
                onBlur={handleBlur}
                onChange={handleChange}
                checked={values["communicationAlert"]}
              />
            </ListItem>
            <ListItem sx={css.listItem}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={css.primaryText}
                  >
                    {"Security"}
                  </Typography>
                }
                secondary={
                  <CaptionText>
                    {"Get important notifications about your account security."}
                  </CaptionText>
                }
                secondaryTypographyProps={{
                  component: "div",
                }}
              />
              <Switch
                edge="end"
                name="securityAlert"
                onBlur={handleBlur}
                onChange={handleChange}
                checked={values["securityAlert"]}
              />
            </ListItem>
            <ListItem sx={css.listItem}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={css.primaryText}
                  >
                    {"Meetups"}
                  </Typography>
                }
                secondary={
                  <CaptionText>
                    {
                      "Get an email when a Meetup is posted close to my location."
                    }
                  </CaptionText>
                }
                secondaryTypographyProps={{
                  component: "div",
                }}
              />
              <Switch
                edge="end"
                name="meetupAlert"
                onBlur={handleBlur}
                onChange={handleChange}
                checked={values["meetupAlert"]}
              />
            </ListItem>
          </List>
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
            Account Activity
          </Typography>
        </Box>
        <Box sx={{ pt: 2 }}>
          <Typography sx={{ fontWeight: "500" }}>Email me when:</Typography>
          <List>
            <ListItem sx={css.listItem}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={css.primaryText}
                  >
                    {"someone comments on one of my items"}
                  </Typography>
                }
                secondaryTypographyProps={{
                  component: "div",
                }}
              />
              <Switch
                edge="end"
                name="itemCommentAlert"
                onBlur={handleBlur}
                onChange={handleChange}
                checked={values["itemCommentAlert"]}
              />
            </ListItem>
            <ListItem sx={css.listItem}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={css.primaryText}
                  >
                    {"someone mentions me"}
                  </Typography>
                }
                secondaryTypographyProps={{
                  component: "div",
                }}
              />
              <Switch
                edge="end"
                name="mentionAlert"
                onBlur={handleBlur}
                onChange={handleChange}
                checked={values["mentionAlert"]}
              />
            </ListItem>
            <ListItem sx={css.listItem}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={css.primaryText}
                  >
                    {"someone follows me"}
                  </Typography>
                }
                secondaryTypographyProps={{
                  component: "div",
                }}
              />
              <Switch
                edge="end"
                name="followAlert"
                onBlur={handleBlur}
                onChange={handleChange}
                checked={values["followAlert"]}
              />
            </ListItem>
            <ListItem sx={css.listItem}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={css.primaryText}
                  >
                    {"someone replies to my job posting"}
                  </Typography>
                }
                secondaryTypographyProps={{
                  component: "div",
                }}
              />
              <Switch
                edge="end"
                name="repliesAlert"
                onBlur={handleBlur}
                onChange={handleChange}
                checked={values["repliesAlert"]}
              />
            </ListItem>
          </List>
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

const UpdateUserProfileMutation = gql`
  mutation UpdateUserProfileMutation(
    $notificationSettingId: String!
    $communicationAlert: Boolean!
    $securityAlert: Boolean!
    $meetupAlert: Boolean!
    $itemCommentAlert: Boolean!
    $mentionAlert: Boolean!
    $followAlert: Boolean!
    $repliesAlert: Boolean!
  ) {
    updateNotificationSetting(
      notificationSettingId: $notificationSettingId
      communicationAlert: $communicationAlert
      securityAlert: $securityAlert
      meetupAlert: $meetupAlert
      itemCommentAlert: $itemCommentAlert
      mentionAlert: $mentionAlert
      followAlert: $followAlert
      repliesAlert: $repliesAlert
    ) {
      id
    }
  }
`

const FormSchema = Yup.object().shape({
  communicationAlert: Yup.boolean().required("communicationAlert is required"),
  securityAlert: Yup.boolean().required("securityAlert is required"),
  meetupAlert: Yup.boolean().required("meetupAlert is required"),
  itemCommentAlert: Yup.boolean().required("itemCommentAlert is required"),
  mentionAlert: Yup.boolean().required("mentionAlert is required"),
  followAlert: Yup.boolean().required("followAlert is required"),
  repliesAlert: Yup.boolean().required("repliesAlert is required"),
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
  primaryText: {
    fontWeight: "500",
  },
  listItem: {
    px: 0,
  },
}
