/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Country: { // root type
    code: string; // String!
    id: string; // String!
    title: string; // String!
  }
  Mutation: {};
  NotificationSetting: { // root type
    communicationAlert: boolean; // Boolean!
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    followAlert: boolean; // Boolean!
    id: string; // String!
    itemCommentAlert: boolean; // Boolean!
    meetupAlert: boolean; // Boolean!
    mentionAlert: boolean; // Boolean!
    repliesAlert: boolean; // Boolean!
    securityAlert: boolean; // Boolean!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  PaymentDetail: { // root type
    cardCvv?: string | null; // String
    cardExpiryDate?: NexusGenScalars['DateTime'] | null; // DateTime
    cardHolderName?: string | null; // String
    cardNumber?: string | null; // String
    id: string; // String!
    zipCode?: string | null; // String
  }
  PlanType: { // root type
    compoundingPeriod?: string | null; // String
    description: string; // String!
    id: string; // String!
    rate?: number | null; // Float
    title: string; // String!
  }
  Profile: { // root type
    bio?: string | null; // String
    company?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    email: string; // String!
    id: string; // String!
    jobTitle?: string | null; // String
    name?: string | null; // String
    phoneNumber?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    username?: string | null; // String
  }
  Query: {};
  User: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  UserSubscriptionPlan: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Vernacular: { // root type
    id: string; // String!
    title: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Country: { // field return type
    code: string; // String!
    id: string; // String!
    paymentDetails: Array<NexusGenRootTypes['PaymentDetail'] | null> | null; // [PaymentDetail]
    profiles: Array<NexusGenRootTypes['Profile'] | null> | null; // [Profile]
    title: string; // String!
  }
  Mutation: { // field return type
    signupUser: NexusGenRootTypes['User'] | null; // User
    updateNotificationSetting: NexusGenRootTypes['NotificationSetting'] | null; // NotificationSetting
    updatePaymentDetail: NexusGenRootTypes['PaymentDetail'] | null; // PaymentDetail
    updateProfile: NexusGenRootTypes['Profile'] | null; // Profile
    updateUserSubscriptionPlan: NexusGenRootTypes['UserSubscriptionPlan'] | null; // UserSubscriptionPlan
  }
  NotificationSetting: { // field return type
    communicationAlert: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    followAlert: boolean; // Boolean!
    id: string; // String!
    itemCommentAlert: boolean; // Boolean!
    meetupAlert: boolean; // Boolean!
    mentionAlert: boolean; // Boolean!
    repliesAlert: boolean; // Boolean!
    securityAlert: boolean; // Boolean!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User'] | null; // User
  }
  PaymentDetail: { // field return type
    cardCvv: string | null; // String
    cardExpiryDate: NexusGenScalars['DateTime'] | null; // DateTime
    cardHolderName: string | null; // String
    cardNumber: string | null; // String
    country: NexusGenRootTypes['Country'] | null; // Country
    id: string; // String!
    user: NexusGenRootTypes['User'] | null; // User
    zipCode: string | null; // String
  }
  PlanType: { // field return type
    compoundingPeriod: string | null; // String
    description: string; // String!
    id: string; // String!
    rate: number | null; // Float
    title: string; // String!
    userSubscriptionPlans: Array<NexusGenRootTypes['UserSubscriptionPlan'] | null> | null; // [UserSubscriptionPlan]
  }
  Profile: { // field return type
    bio: string | null; // String
    company: string | null; // String
    country: NexusGenRootTypes['Country'] | null; // Country
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    email: string; // String!
    id: string; // String!
    jobTitle: string | null; // String
    name: string | null; // String
    phoneNumber: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User'] | null; // User
    username: string | null; // String
    vernacular: NexusGenRootTypes['Vernacular'] | null; // Vernacular
  }
  Query: { // field return type
    allCountry: Array<NexusGenRootTypes['Country'] | null> | null; // [Country]
    allPlanType: Array<NexusGenRootTypes['PlanType'] | null> | null; // [PlanType]
    allUser: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    allVernacular: Array<NexusGenRootTypes['Vernacular'] | null> | null; // [Vernacular]
    notificationSettingById: NexusGenRootTypes['NotificationSetting'] | null; // NotificationSetting
    profileById: NexusGenRootTypes['Profile'] | null; // Profile
    profileByUsername: NexusGenRootTypes['Profile'] | null; // Profile
    showFirstUser: NexusGenRootTypes['User'] | null; // User
    userById: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    notificationSetting: NexusGenRootTypes['NotificationSetting'] | null; // NotificationSetting
    paymentDetail: NexusGenRootTypes['PaymentDetail'] | null; // PaymentDetail
    profile: NexusGenRootTypes['Profile'] | null; // Profile
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    userSubscriptionPlan: NexusGenRootTypes['UserSubscriptionPlan'] | null; // UserSubscriptionPlan
  }
  UserSubscriptionPlan: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    planType: NexusGenRootTypes['PlanType']; // PlanType!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User']; // User!
  }
  Vernacular: { // field return type
    id: string; // String!
    profiles: Array<NexusGenRootTypes['Profile'] | null> | null; // [Profile]
    title: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Country: { // field return type name
    code: 'String'
    id: 'String'
    paymentDetails: 'PaymentDetail'
    profiles: 'Profile'
    title: 'String'
  }
  Mutation: { // field return type name
    signupUser: 'User'
    updateNotificationSetting: 'NotificationSetting'
    updatePaymentDetail: 'PaymentDetail'
    updateProfile: 'Profile'
    updateUserSubscriptionPlan: 'UserSubscriptionPlan'
  }
  NotificationSetting: { // field return type name
    communicationAlert: 'Boolean'
    createdAt: 'DateTime'
    followAlert: 'Boolean'
    id: 'String'
    itemCommentAlert: 'Boolean'
    meetupAlert: 'Boolean'
    mentionAlert: 'Boolean'
    repliesAlert: 'Boolean'
    securityAlert: 'Boolean'
    updatedAt: 'DateTime'
    user: 'User'
  }
  PaymentDetail: { // field return type name
    cardCvv: 'String'
    cardExpiryDate: 'DateTime'
    cardHolderName: 'String'
    cardNumber: 'String'
    country: 'Country'
    id: 'String'
    user: 'User'
    zipCode: 'String'
  }
  PlanType: { // field return type name
    compoundingPeriod: 'String'
    description: 'String'
    id: 'String'
    rate: 'Float'
    title: 'String'
    userSubscriptionPlans: 'UserSubscriptionPlan'
  }
  Profile: { // field return type name
    bio: 'String'
    company: 'String'
    country: 'Country'
    createdAt: 'DateTime'
    email: 'String'
    id: 'String'
    jobTitle: 'String'
    name: 'String'
    phoneNumber: 'String'
    updatedAt: 'DateTime'
    user: 'User'
    username: 'String'
    vernacular: 'Vernacular'
  }
  Query: { // field return type name
    allCountry: 'Country'
    allPlanType: 'PlanType'
    allUser: 'User'
    allVernacular: 'Vernacular'
    notificationSettingById: 'NotificationSetting'
    profileById: 'Profile'
    profileByUsername: 'Profile'
    showFirstUser: 'User'
    userById: 'User'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    notificationSetting: 'NotificationSetting'
    paymentDetail: 'PaymentDetail'
    profile: 'Profile'
    updatedAt: 'DateTime'
    userSubscriptionPlan: 'UserSubscriptionPlan'
  }
  UserSubscriptionPlan: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    planType: 'PlanType'
    updatedAt: 'DateTime'
    user: 'User'
  }
  Vernacular: { // field return type name
    id: 'String'
    profiles: 'Profile'
    title: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    signupUser: { // args
      email: string; // String!
      username: string; // String!
    }
    updateNotificationSetting: { // args
      communicationAlert: boolean; // Boolean!
      followAlert: boolean; // Boolean!
      itemCommentAlert: boolean; // Boolean!
      meetupAlert: boolean; // Boolean!
      mentionAlert: boolean; // Boolean!
      notificationSettingId: string; // String!
      repliesAlert: boolean; // Boolean!
      securityAlert: boolean; // Boolean!
    }
    updatePaymentDetail: { // args
      cardExpiryDate: string; // String!
      cardHolderName: string; // String!
      cardNumber: string; // String!
      countryId: string; // String!
      paymentDetaild: string; // String!
      zipCode: string; // String!
    }
    updateProfile: { // args
      bio: string; // String!
      company: string; // String!
      countryId: string; // String!
      email: string; // String!
      jobTitle: string; // String!
      name: string; // String!
      phoneNumber: string; // String!
      profileId: string; // String!
      username: string; // String!
      vernacularId: string; // String!
    }
    updateUserSubscriptionPlan: { // args
      planTypeId: string; // String!
      userSubscriptionPlanId: string; // String!
    }
  }
  Query: {
    notificationSettingById: { // args
      notificationSettingId: string; // String!
    }
    profileById: { // args
      profileId: string; // String!
    }
    profileByUsername: { // args
      username: string; // String!
    }
    userById: { // args
      userId: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}