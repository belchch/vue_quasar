import { Material } from 'src/features/lookup/material/stores/types'
export type StructElem = {
  id?: number
  name: string
  materials: Material[]
  boqSection?: BoqSection | BoqSectionOption | undefined
}

export type StructElemUpdateRequest = {
  id: number
  name: string
  materialIds: number[],
  boqSection?: BoqSection | undefined
}

export type BoqSection = 'FLOOR' | 'CEIL' | 'DOOR' | 'WINDOW' | 'WALL'
export type BoqSectionOption = {id: BoqSection, name: string}