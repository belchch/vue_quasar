import { Region } from '../../region/stores/types'

export type Court = {
  id?: number
  name: string
  postalCode?: string
  region: Region
}

export type CourtUpdateRequest = {
  id: number
  name: string
  postalCode?: string | undefined
  regionId: number
}