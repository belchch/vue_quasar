import { defineLookupStore } from 'src/features/lookup/base/store/lookup-store'
import { Judge, JudgeUpdateRequest } from 'src/features/lookup/judge/stores/types'

const requestMappingFn = (item: Judge): JudgeUpdateRequest => {
    return {
        id: item.id!!,
        courtId: item.court.id!!,
        firstName: item.firstName,
        middleName: item.middleName,
        lastName: item.lastName
    }
}

export const useJudgeStore = defineLookupStore<Judge, JudgeUpdateRequest>('judges', requestMappingFn)
