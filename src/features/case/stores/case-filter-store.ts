import { defineStore } from 'pinia'
import { CaseFilterRequest } from 'src/features/case/api/types'
import { ref } from 'vue'

export const useCaseFilterStore = defineStore('case-filter', () => {
  const filter = ref<CaseFilterRequest>({})

  const setFilter = (value: CaseFilterRequest) => {
    filter.value = value
  }

  return { filter, setFilter }
})
