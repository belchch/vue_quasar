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

export type EstimateGroup = {
  description: string,
  total: number
  type: 'INTERIOR_DOOR' | 'FLOOR' | 'CEIL' | 'LOCATION_SUPPORTING' | 'WINDOW' | 'SUPPORTING',
  works: EstimateWork[]
}

export type Estimate = {
    garbageRemoval: number,
    unexpectedExpenses: number,
    worksTotal: number,
    total: number,
    groups: EstimateGroup[]
}
