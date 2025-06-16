import { defineLookupStore } from 'src/features/lookup/base/store/lookup-store'
import { Defect } from '../flaw/stores/types'

export const useDefectLookupStore = defineLookupStore<Defect>('defects')
