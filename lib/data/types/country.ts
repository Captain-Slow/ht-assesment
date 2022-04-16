export interface COUNTRY_DATA_TYPE {
  id: string
  title: string
  code: string
}

export interface COUNTRY_LIST_TYPE {
  [key: string]: COUNTRY_DATA_TYPE
}
