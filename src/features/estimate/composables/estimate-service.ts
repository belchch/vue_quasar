import { storeToRefs } from 'pinia'
import { useEstimateStore } from '../stores/estimate-store'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { EstimateApi } from '../api/estimate-api'
import { useBoqService } from 'src/features/boq/composables/boq'
import { useBoqStore } from 'src/features/boq/stores/boq-store'

export const useEstimateService = () => {
  const { estimateWorks, estimateMaterials, estimateLoading } = storeToRefs(useEstimateStore())
  const { selectedInspectionId } = storeToRefs(useInspectionsStore())
  const { boq } = storeToRefs(useBoqStore())

  const getEstimate = async () => {
    if (boq.value) {
      estimateLoading.value = true
      const response = await EstimateApi.getEstimate(selectedInspectionId.value!!)
      estimateWorks.value = response.data
      const responseEstimateMaterials = await EstimateApi.getEstimateMaterial(
        selectedInspectionId.value!!,
      )
      estimateMaterials.value = responseEstimateMaterials.data
      estimateLoading.value = false
    }
  }
  return {
    getEstimate,
  }
}
