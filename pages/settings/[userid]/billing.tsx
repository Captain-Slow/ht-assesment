import gql from "graphql-tag"
import { Box } from "@mui/material"

import {
  apolloClientServerSide,
  createApolloClient,
} from "../../../lib/graphql/apollo-client"
import { normaliseData } from "../../../lib/utility/transformer"
import SettingLayout from "../../../components/layouts/SettingLayout"
import BillingForm from "../../../components/page/billing/BillingForm"
import { BASIC_USER_DATA_TYPE } from "../../../lib/data/types/user"
import { COUNTRY_LIST_TYPE } from "../../../lib/data/types/country"
import { PLAN_TYPE_LIST_TYPE } from "../../../lib/data/types/planType"

interface propTypes {
  user: BASIC_USER_DATA_TYPE
  countries: COUNTRY_LIST_TYPE
  planTypes: PLAN_TYPE_LIST_TYPE
}

export default function UserSettingsBillingPage({
  user,
  countries,
  planTypes,
}: propTypes) {
  return (
    <Box>
      <SettingLayout page="billing" userId={user.id}>
        <BillingForm
          userData={user}
          countryData={countries}
          planTypeData={planTypes}
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
          allPlanType {
            id
            title
            description
            rate
            compoundingPeriod
          }
        }
      `,
    })
    const { userById, allCountry, allPlanType } = data

    const normaliseCountryList = await normaliseData(allCountry)
    const normalisePlanTypeList = await normaliseData(allPlanType)

    return {
      props: {
        user: {
          ...userById,
        },
        countries: normaliseCountryList,
        planTypes: normalisePlanTypeList,
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
