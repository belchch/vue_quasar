import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { InspectionApi } from 'src/features/inspection/api/inspection-api'
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store'
import { storeToRefs } from 'pinia'
import _ from 'lodash'
import { toInspectionUpdateRequest } from '../api/types'
import { Inspection } from '../store/types'
import { useInspectionPageService } from './inspection-page'
import { useNavigate } from 'src/composables/navigate'

export const useInspections = () => {
  const { selectedCase } = storeToRefs(useSelectedCaseStore())
  const { inspections } = storeToRefs(useInspectionsStore())
  const { cleanPageStore } = useInspectionPageService()
  const { navigateCaseHome } = useNavigate()

  const requestInspections = async () => {
    const response = await InspectionApi.getInspections(selectedCase.value!.id)
    inspections.value = response.data
  }

  const createApartmentInspection = async (apartment: string) => {
    const response = await InspectionApi.createApartmentInspection(selectedCase.value!.id!, apartment)
    inspections.value.push(response.data)
  }

  const updateInspection = async (inspection: Inspection) => {
    const response = await InspectionApi.updateInspection(inspection.id!, toInspectionUpdateRequest(inspection))

    const index = _.findIndex(inspections.value, item => item.id == response.data.id);
    
    if (index !== -1) {
      inspections.value[index] = response.data;
    }
  }

  const deleteInspection = async (id: number) => {
    await InspectionApi.deleteInspection(id)
    inspections.value = inspections.value.filter(item => item.id != id)
    await navigateCaseHome()
  }

  return { requestInspections, createApartmentInspection, updateInspection, deleteInspection }
}
