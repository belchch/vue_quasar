import { RawMaterial } from '../lookup/raw-material/types'
import { ConsumerPriceIndexItem } from 'src/features/lookup/consumer-price-index/types'
export type SalvageableMaterialType = {
  id: number
  rawMaterial: RawMaterial
  smId: number
  count: number
  isUse: boolean
  physicalWear: number
  functionalWear: number
  externalWear: number
  accumulatedWear: number
  averagePrice: number
  averagePriceTotal: number
  averagePriceCpi: number
  averagePriceCpiInspectionDate: number
  averagePriceWearInspectionDate: number
  averagePriceCpiActDate: number
}
export type SalvageableMaterialObjectType = {
  id: number
  consumerPriceIndex: ConsumerPriceIndexItem
  inspectionDate: string // ISO-строка даты
  actDate: string // ISO-строка даты
  averagePriceTotal: number
  averagePriceWearInspectionDate: number
  averagePriceCpiInspectionDate: number
  total1: number
  total2: number
  total3: number
  total4: number
  cost1: number
  cost2: number
  cost3: number
  cost4: number
  sum1: number
  sum2: number
  sum3: number
  sum4: number
}
export type SalvageableMaterialUpdate = Pick<
  SalvageableMaterialType,
  'count' | 'isUse' | 'physicalWear' | 'functionalWear' | 'externalWear'
>
