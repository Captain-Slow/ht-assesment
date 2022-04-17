import gql from "graphql-tag"
import { Box } from "@mui/material"

import {
  apolloClientServerSide,
  createApolloClient,
} from "../../../lib/graphql/apollo-client"
import { normaliseData } from "../../../lib/utility/transformer"
import SettingLayout from "../../../components/layouts/SettingLayout"
import AccountForm from "../../../components/page/account/AccountForm"
import { BASIC_USER_DATA_TYPE } from "../../../lib/data/types/user"
import { COUNTRY_LIST_TYPE } from "../../../lib/data/types/country"
import { VERNACULAR_LIST_TYPE } from "../../../lib/data/types/vernacular"

interface propTypes {
  user: BASIC_USER_DATA_TYPE
  countries: COUNTRY_LIST_TYPE
  vernaculars: VERNACULAR_LIST_TYPE
}

export default function UserSettingsAccountPage({
  user,
  countries,
  vernaculars,
}: propTypes) {
  return (
    <Box>
      <SettingLayout page="account" userId={user.id}>
        <AccountForm
          userData={user}
          countryData={countries}
          vernacularData={vernaculars}
        />
      </SettingLayout>
    </Box>
  )
}

export async function getServerSideProps({ query, req }) {
  try {
    const client = createApolloClient(req)

    const userId = query["userid"]

    const { data } = await client.query({
      variables: {
        userId,
      },
      query: gql`
        query UserQuery($userId: String!) {
          userById(userId: $userId) {
            id
            profile {
              id
              email
              username
              name
              jobTitle
              company
              bio
              vernacular {
                id
              }
              country {
                id
              }
              phoneNumber
            }
            userSubscriptionPlan {
              id
              planType {
                id
              }
            }
            paymentDetail {
              id
              cardNumber
              cardHolderName
              cardExpiryDate
              cardCvv
              zipCode
              country {
                id
              }
            }
          }
          allCountry {
            id
            title
            code
          }
          allVernacular {
            id
            title
          }
        }
      `,
    })
    const { userById, allCountry, allVernacular } = data

    const normaliseCountryList = await normaliseData(allCountry)
    const normaliseVernacularList = await normaliseData(allVernacular)

    return {
      props: {
        user: {
          ...userById,
        },
        countries: normaliseCountryList,
        vernaculars: normaliseVernacularList,
      },
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: `/404`,
      },
      props: {},
    }
  }
}
