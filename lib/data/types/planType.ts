export interface PLAN_TYPE_DATA_TYPE {
  id: string
  title: string
  description: string
  rate: string
  compoundingPeriod: string
}

export interface PLAN_TYPE_LIST_TYPE {
  [key: string]: PLAN_TYPE_DATA_TYPE
}
