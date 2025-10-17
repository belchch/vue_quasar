import { Rate, UnitOfMeasureType } from 'src/features/lookup/rate/types'
export type RawMaterialSources = {
  id?: number
  url: string
  price: number
}
export type RawMaterial = {
  id?: number
  name: string
  factor: number | null
  unitOfMeasure: UnitOfMeasureType
  rates: Rate[]
  sources: RawMaterialSources[]
}

export type RawMaterialUpdateRequest = {
  name?: string
  factor?: number | null
  unitOfMeasure?: UnitOfMeasureType
  rates: number[]
  sources?: RawMaterialSources[]
}
