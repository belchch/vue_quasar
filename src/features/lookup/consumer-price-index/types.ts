export type ConsumerPriceIndexItem = {
  id: number
  year: number
  month: number
  value: number
  isArchived: boolean
}

export type ConsumerPriceIndexItemRequest = Omit<ConsumerPriceIndexItem, 'id'>
