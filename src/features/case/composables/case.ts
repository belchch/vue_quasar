import { useCasesStore } from 'src/features/case/stores/case-store'
import { CaseApi } from 'src/features/case/api/case-api'
import { useCaseFilterStore } from 'src/features/case/stores/case-filter-store'
import {CaseCreateRequest, CaseFilterRequest} from 'src/features/case/api/types'
import { storeToRefs } from 'pinia'

export const useCases = () => {
  const { setCases } = useCasesStore()
  const filterStore = useCaseFilterStore()
  const { setFilter } = filterStore
  const { filter } = storeToRefs(filterStore)

  const doRequest = async (filter: CaseFilterRequest) => {
    const response = await CaseApi.searchCases(filter)
    setCases(response.data)
  }

  const requestCases = async (filter: CaseFilterRequest) => {
    setFilter(filter)
    await doRequest(filter)
  }

  const refreshCases = async () => {
    await doRequest(filter.value)
  }

  const createCase = async (request: CaseCreateRequest) => {
    await CaseApi.createCase(request)
    await refreshCases()
  }

  return { requestCases, refreshCases, filter, createCase }
}
