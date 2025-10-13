import { storeToRefs } from 'pinia'
import { useEstimateStore } from '../stores/estimate-store'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { EstimateApi } from '../api/estimate-api'

export const useEstimateService = () => {
  const { estimateWorks, estimateMaterials } = storeToRefs(useEstimateStore())
  const { selectedInspectionId } = storeToRefs(useInspectionsStore())

  const getEstimate = async () => {
    const response = await EstimateApi.getEstimate(selectedInspectionId.value!!)
    estimateWorks.value = response.data
    const responseEstimateMaterials = await EstimateApi.getEstimateMaterial(
      selectedInspectionId.value!!,
    )
    estimateMaterials.value = responseEstimateMaterials.data
  }
  return {
    getEstimate,
  }
}
