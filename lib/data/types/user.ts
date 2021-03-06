import { NOTIFICATIONS_DATA_TYPE } from "./notifications"
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
    cardExpiryDate: Date
    cardCvv: string
    zipCode?: string
    coutnry: {
      id: string
    }
  }
  notificationSetting?: NOTIFICATIONS_DATA_TYPE
}
