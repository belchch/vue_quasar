export type EstimateRate = {
  url: string,
  price: number
}

export type EstimateWork = {
  name: string,
  averageCost: number,
  averagePrice: number,
  volume: number,
  uom: string
  rates: EstimateRate[]
}

export type EstimateTypeItem = 'INTERIOR_DOOR' | 'FLOOR' | 'CEIL' | 'LOCATION_SUPPORTING' | 'WINDOW' | 'SUPPORTING' | 'ENTRANCE_DOOR'

export type EstimateGroup = {
  description: string,
  total: number
  type: EstimateTypeItem,
  works: EstimateWork[]
}

export type Estimate = {
    garbageRemoval: number,
    unexpectedExpenses: number,
    worksTotal: number,
    total: number,
    transportation: number,
    groups: EstimateGroup[]
}
