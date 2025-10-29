import { useDefectMovableReportStore } from 'src/features/defect/stores/defect-movable-report-store'
import { DefectMovableReportApi } from 'src/features/defect/api/defect-movable-report-api'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { storeToRefs } from 'pinia'
import { DefectReportPhotoModel } from 'src/features/defect/stores/defect-report-types'

export const useDefectMovableReportService = () => {
  const { defectMovableReport } = storeToRefs(useDefectMovableReportStore())
  const inspectionStore = useInspectionsStore()

  const buildAndRequestMovableDefectReport = async () => {
    await DefectMovableReportApi.buildMovableReport(inspectionStore.selectedInspectionId!!)
    await requestDefectMovableReport()
  }

  const requestDefectMovableReport = async () => {
    const response = await DefectMovableReportApi.getMovableReport(
      inspectionStore.selectedInspectionId!!,
    )
    defectMovableReport.value = response.data
  }

  const moveMovable = async (movableId: number, fromIndex: number, toIndex: number) => {
    await DefectMovableReportApi.moveMovable(movableId, fromIndex, toIndex)
    await requestDefectMovableReport()
  }

  const moveMovableRow = async (structElemId: number, fromIndex: number, toIndex: number) => {
    await DefectMovableReportApi.moveMovableRow(structElemId, fromIndex, toIndex)
    await requestDefectMovableReport()
  }

  const usePhoto = async (
    photoId: number,
    use: boolean,
    scope: number,
  ): Promise<DefectReportPhotoModel[]> => {
    const response = await DefectMovableReportApi.usePhoto(photoId, use, scope)
    return response.data
  }

  return {
    buildAndRequestMovableDefectReport,
    requestDefectMovableReport,
    moveMovableRow,
    moveMovable,
    usePhoto,
  }
}
