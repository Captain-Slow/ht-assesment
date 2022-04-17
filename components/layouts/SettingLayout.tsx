import React from "react"
import { useRouter } from "next/router"
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
  Grid,
  Typography,
} from "@mui/material"
import { CSSObject } from "@mui/material/styles"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"

import { CaptionText } from "../common"
import useWidth from "../../lib/hooks/useWidth"

interface propTypes {
  children: React.ReactNode
  page: "account" | "billing" | "notifications"
  userId: string
}

export default function SettingLayout({ children, page, userId }: propTypes) {
  const router = useRouter()
  const width = useWidth()

  const navItemOnClick = (navItem: string) => {
    switch (navItem) {
      case "Account":
        router.push(`/settings/${userId}/account`)
        break
      case "Plan & Billing":
        router.push(`/settings/${userId}/billing`)
        break
      case "Notifications":
        router.push(`/settings/${userId}/notifications`)
        break
      default:
        console.log("Wrong input")
    }
  }

  const smallerLayout = width === "sm" || width === "xs"

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={css.cardContainer}>
        <Grid container wrap="nowrap">
          <Grid item sx={!smallerLayout ? css.navContainer : {}}>
            {!smallerLayout && (
              <Box sx={css.navWrapper}>
                <Typography
                  variant="h4"
                  variantMapping={{
                    h4: "h1",
                  }}
                  sx={css.title}
                >
                  Settings
                </Typography>
              </Box>
            )}
            <Divider />
            <List sx={css.list}>
              {navItems.map((navItem, index) => {
                const selected =
                  (page === "account" && navItem.title === "Account") ||
                  (page === "billing" && navItem.title === "Plan & Billing") ||
                  (page === "notifications" &&
                    navItem.title === "Notifications")
                    ? true
                    : false

                return (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={[
                        selected ? css.listItemSelected : css.listItem,
                        !smallerLayout
                          ? css.sharedListItemStyle
                          : css.smallerSharedListItemStyle,
                      ]}
                      button
                      alignItems="flex-start"
                      onClick={() => navItemOnClick(navItem.title)}
                    >
                      <ListItemIcon
                        sx={
                          !smallerLayout
                            ? css.iconContainer
                            : css.smallerIconContainer
                        }
                      >
                        {navItem.title === "Account" ? (
                          <AccountCircleOutlinedIcon
                            fontSize="small"
                            sx={selected ? css.iconSelected : css.icon}
                          />
                        ) : navItem.title === "Plan & Billing" ? (
                          <CreditCardOutlinedIcon
                            fontSize="small"
                            sx={selected ? css.iconSelected : css.icon}
                          />
                        ) : (
                          <NotificationsOutlinedIcon
                            fontSize="small"
                            sx={selected ? css.iconSelected : css.icon}
                          />
                        )}
                      </ListItemIcon>
                      {!smallerLayout && (
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              color="text.primary"
                              sx={
                                selected
                                  ? css.selectedPrimaryText
                                  : css.primaryText
                              }
                            >
                              {navItem.title}
                            </Typography>
                          }
                          secondary={<CaptionText>{navItem.desc}</CaptionText>}
                          secondaryTypographyProps={{
                            component: "div",
                          }}
                        />
                      )}
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                )
              })}
            </List>
          </Grid>
          <Grid
            item
            sx={
              !smallerLayout
                ? css.contentContainer
                : css.smallerContentContainer
            }
          >
            {smallerLayout && (
              <Box sx={css.smallerNavWrapper}>
                <Typography
                  variant="h4"
                  variantMapping={{
                    h4: "h1",
                  }}
                  sx={css.title}
                >
                  Settings
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                  }}
                >
                  <Divider />
                </Box>
              </Box>
            )}
            <Box sx={css.contentWrapper}>{children}</Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

const css: CSSObject = {
  cardContainer: {
    borderRadius: 0,
    minHeight: "100vh",
  },
  iconContainer: {
    minWidth: "auto",
    mr: 1.5,
  },
  smallerIconContainer: {
    minWidth: "auto",
  },
  icon: {
    color: "text.secondary",
  },
  iconSelected: {
    color: "primary.main",
  },
  navContainer: {
    flexBasis: 320,
    flexGrow: 0,
    maxWidth: 320,
  },
  navWrapper: {
    my: 4,
    mx: 3,
  },
  smallerNavWrapper: {
    mb: 4,
  },
  navDescText: {
    mt: 0.5,
    lineHeight: 1.43,
  },
  list: {
    width: "100%",
    pt: 0,
  },
  sharedListItemStyle: {},
  smallerSharedListItemStyle: {
    px: 2,
  },
  listItem: {
    px: 3,
  },
  listItemSelected: {
    bgcolor: "#eef2ff",
    px: 3,
  },
  primaryText: {
    fontWeight: "500",
  },
  selectedPrimaryText: {
    color: "primary.main",
    fontWeight: "500",
  },
  title: {
    fontWeight: "900",
    fontSize: "1.85rem",
  },
  contentContainer: {
    bgcolor: "#f1f5f9",
    pt: 4,
    pb: 6,
    px: 5,
    flex: 1,
  },
  smallerContentContainer: {
    bgcolor: "#f1f5f9",
    pt: 4,
    pb: 6,
    px: 3.5,
    flex: 1,
  },
  contentWrapper: {},
}

const navItems = [
  {
    title: "Account",
    desc: "Manage your public profile and private information",
  },
  {
    title: "Plan & Billing",
    desc: "Manage your subscription plan, payment method and billing information",
  },
  {
    title: "Notifications",
    desc: "Manage wehn you'll be notified on which channels",
  },
]
