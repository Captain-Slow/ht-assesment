import { BASIC_USER_PROFILE_DATA_TYPE } from "./profile"

export interface BASIC_USER_DATA_TYPE {
  id: string
  profile: BASIC_USER_PROFILE_DATA_TYPE
  userSubscriptionPlan?: {
    id: string
    planType: {
      id: string
    }
  }
  paymentDetail?: {
    id: string
    cardHolderName: string
    cardNumber: string
    cardExpiryDate: string
    countryId: string
  }
}
