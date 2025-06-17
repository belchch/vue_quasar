import { Material } from 'src/features/lookup/material/stores/types'
export type StructElem = {
  id?: number
  name: string
  materials: Material[]
}

export type StructElemUpdateRequest = {
  id: number
  name: string
  materialIds: number[]
}