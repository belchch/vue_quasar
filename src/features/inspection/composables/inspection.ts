import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { InspectionApi } from 'src/features/inspection/api/inspection-api'

export const useInspections = () => {
  const inspectionsStore = useInspectionsStore()

  const requestInspections = async () => {
    const response = await InspectionApi.getInspections()
    inspectionsStore.setInspections(response.data)
  }

  return { requestInspections }
}
