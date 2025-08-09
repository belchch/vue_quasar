import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { InspectionApi } from 'src/features/inspection/api/inspection-api'
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store'
import { storeToRefs } from 'pinia'
import _ from 'lodash'

export const useInspections = () => {
  const inspectionsStore = useInspectionsStore()
  const { selectedCase } = storeToRefs(useSelectedCaseStore())

  const requestInspections = async () => {
    const response = await InspectionApi.getInspections(selectedCase.value!.id)
    inspectionsStore.setInspections(response.data)
    
    if (selectedCase.value?.expertiseType == 'SHARED_EQUITY') {
      inspectionsStore.selectedInspectionId = _.first(response.data)?.id
    }
  }

  return { requestInspections }
}
