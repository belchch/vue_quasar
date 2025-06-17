import { defineLookupStore } from 'src/features/lookup/base/store/lookup-store'
import { Court, CourtUpdateRequest } from 'src/features/lookup/court/stores/types'

const requestMappingFn = (item: Court): CourtUpdateRequest => {
    return {
        id: item.id!!,
        name: item.name,
        postalCode: item.postalCode,
        regionId: item.region.id!!
    }
}

export const useCourtStore = defineLookupStore<Court, CourtUpdateRequest>('courts', requestMappingFn)
