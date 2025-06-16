import { Region } from '../../region/stores/types'

export type Court = {
  id?: number
  name: string
  postalCode?: string
  region: Region
}
