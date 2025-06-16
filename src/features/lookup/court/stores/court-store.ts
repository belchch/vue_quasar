import { defineLookupStore } from 'src/features/lookup/base/store/lookup-store'
import { Court } from 'src/features/lookup/court/stores/types'

export const useCourtStore = defineLookupStore<Court>('courts')
