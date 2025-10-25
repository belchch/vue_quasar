export type EstimatePrices = {
  url: string
  price: number
}

export type EstimateWork = {
  name: string
  averageCost: number
  averagePrice: number
  volume: number
  uom: string
  rates: EstimatePrices[]
}

export type EstimateTypeItem =
  | 'INTERIOR_DOOR'
  | 'FLOOR'
  | 'CEIL'
  | 'LOCATION_SUPPORTING'
  | 'WINDOW'
  | 'SUPPORTING'
  | 'ENTRANCE_DOOR'

export type EstimateGroup = {
  description: string
  total: number
  type: EstimateTypeItem
  works: EstimateWork[]
}

export type Estimate = {
  garbageRemoval: number
  unexpectedExpenses: number
  worksTotal: number
  total: number
  transportation: number
  groups: EstimateGroup[]
}

export type EstimateMaterialItem = {
  name: string
  uom: string
  volume: number
  sources: EstimatePrices[]
  averagePrice: number
}

export type EstimateMaterial = {
  items: EstimateMaterialItem[]
  itemsTotal: number
  unexpectedExpenses: number
  transportation: number
  total: number
}
