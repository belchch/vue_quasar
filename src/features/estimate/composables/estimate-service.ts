import { storeToRefs } from "pinia"
import { useEstimateStore } from "../stores/estimate-store"
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import { EstimateApi } from "../api/estimate-api"

export const useEstimateService = () => {
    const { estimate } = storeToRefs(useEstimateStore())
    const { selectedInspectionId } = storeToRefs(useInspectionsStore())

    const getEstimate = async () => {
        const response = await EstimateApi.getEstimate(selectedInspectionId.value!!)
        estimate.value = response.data
    }
    return {
        getEstimate
    }
}
