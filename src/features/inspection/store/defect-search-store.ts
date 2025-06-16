import {DefectSearchRequest, DefectSearchResponse} from "src/features/inspection/api/types";
import {ref} from 'vue'
import {DefectSearchApi} from "src/features/defect/flaw/stores/defect-search-api";
import {defineStore} from "pinia";

export const useDefectSearch = defineStore('defectSearch', () => {
  const request = ref<DefectSearchRequest>({
    structElemId: undefined,
    materialId: undefined,
    flawId: undefined,
    defectId: undefined,
  })

  const response = ref<DefectSearchResponse>({
    structElems: [],
    materials: [],
    flaws: [],
    defects: []
  })

  const search = async (newRequest: Partial<DefectSearchRequest>) => {
    request.value = {...request.value, ...newRequest}
    const newResponse = await DefectSearchApi.search(request.value)
    response.value = newResponse.data
  }

  return {request, response, search}
})
