import { useDefectReportStore } from 'src/features/defect/stores/defect-report-store'
import { DefectReportApi } from 'src/features/defect/api/defect-report-api'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { storeToRefs } from 'pinia'
import { DefectReportPhotoModel } from 'src/features/defect/stores/defect-report-types'

export const useDefectReportService = () => {
  const { defectReport, defectMovableReport } = storeToRefs(useDefectReportStore())
  const inspectionStore = useInspectionsStore()

  const buildAndRequestDefectReport = async (useTechnicalReport: boolean) => {
    await DefectReportApi.buildReport(inspectionStore.selectedInspectionId!!, useTechnicalReport)
    await requestDefectReport()
  }

  const buildAndRequestMovableDefectReport = async () => {
    await DefectReportApi.buildMovableReport(inspectionStore.selectedInspectionId!!)
    await requestMovableDefectReport()
  }

  const requestDefectReport = async () => {
    const response = await DefectReportApi.getReport(inspectionStore.selectedInspectionId!!)
    defectReport.value = response.data
  }

  const requestMovableDefectReport = async () => {
    const response = await DefectReportApi.getMovableReport(inspectionStore.selectedInspectionId!!)
    defectMovableReport.value = response.data
  }

  const moveSpot = async (spotId: number, fromIndex: number, toIndex: number) => {
    await DefectReportApi.moveSpot(spotId, fromIndex, toIndex)
    await requestDefectReport()
  }

  const moveMovable = async (movableId: number, fromIndex: number, toIndex: number) => {
    await DefectReportApi.moveMovable(movableId, fromIndex, toIndex)
    await requestMovableDefectReport()
  }

  const moveMovableRow = async (structElemId: number, fromIndex: number, toIndex: number) => {
    await DefectReportApi.moveMovableRow(structElemId, fromIndex, toIndex)
    await requestDefectReport()
  }

  const moveStructElem = async (structElemId: number, fromIndex: number, toIndex: number) => {
    await DefectReportApi.moveStructElem(structElemId, fromIndex, toIndex)
    await requestDefectReport()
  }

  const moveRow = async (rowId: number, fromIndex: number, toIndex: number) => {
    await DefectReportApi.moveRow(rowId, fromIndex, toIndex)
    await requestDefectReport()
  }

  const usePhoto = async (
    photoId: number,
    use: boolean,
    scope: number,
  ): Promise<DefectReportPhotoModel[]> => {
    const response = await DefectReportApi.usePhoto(photoId, use, scope)
    return response.data
  }

  return {
    buildAndRequestDefectReport,
    buildAndRequestMovableDefectReport,
    requestMovableDefectReport,
    requestDefectReport,
    moveSpot,
    moveStructElem,
    moveMovableRow,
    moveRow,
    moveMovable,
    usePhoto,
  }
}
