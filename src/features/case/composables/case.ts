import { useCasesStore } from 'src/features/case/stores/case-store'
import { CaseApi } from 'src/features/case/api/case-api'
import { useCaseFilterStore } from 'src/features/case/stores/case-filter-store'
import {CaseCreateRequest, CaseFilterRequest} from 'src/features/case/api/types'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { extractApiErrorMessage } from 'src/common/errors'

const isLoading = ref(false)
const loadError = ref<string | null>(null)

export const useCases = () => {
  const { setCases } = useCasesStore()
  const filterStore = useCaseFilterStore()
  const { setFilter } = filterStore
  const { filter } = storeToRefs(filterStore)

  const doRequest = async (requestFilter: CaseFilterRequest) => {
    isLoading.value = true
    loadError.value = null
    try {
      const response = await CaseApi.searchCases(requestFilter)
      setCases(response.data)
    } catch (err) {
      setCases([])
      loadError.value = extractApiErrorMessage(err, 'Не удалось загрузить список экспертиз')
    } finally {
      isLoading.value = false
    }
  }

  const requestCases = async (requestFilter: CaseFilterRequest) => {
    setFilter(requestFilter)
    await doRequest(requestFilter)
  }

  const refreshCases = async () => {
    await doRequest(filter.value)
  }

  const createCase = async (request: CaseCreateRequest) => {
    const response = await CaseApi.createCase(request)
    await refreshCases()
    return response
  }

  return { requestCases, refreshCases, filter, createCase, isLoading, loadError }
}
