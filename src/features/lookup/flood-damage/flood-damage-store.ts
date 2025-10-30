import { defineLookupStore } from 'src/features/lookup/base/store/lookup-store'
import { FloodDamage } from 'src/features/lookup/flood-damage/types'

export const useFloodDamageStore = defineLookupStore<FloodDamage, FloodDamage>('flood-property-damage')
