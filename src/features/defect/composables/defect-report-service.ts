import { useDefectReportStore } from 'src/features/defect/stores/defect-report-store'
import { DefectReportApi } from 'src/features/defect/api/defect-report-api'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { storeToRefs } from 'pinia'
import {DefectReportPhotoModel} from "src/features/defect/stores/defect-report-types";

export const useDefectReportService = () => {
  const { defectReport } = storeToRefs(useDefectReportStore())
  const inspectionStore = useInspectionsStore()

  const buildAndRequestDefectReport = async (useTechnicalReport: boolean) => {
    await DefectReportApi.buildReport(inspectionStore.selectedInspectionId!!, useTechnicalReport)
    await requestDefectReport()
  }

  const requestDefectReport = async () => {
    const response = await DefectReportApi.getReport(inspectionStore.selectedInspectionId!!)
    defectReport.value = response.data
  }

  const moveSpot = async (spotId: number, fromIndex: number, toIndex: number) => {
    await DefectReportApi.moveSpot(spotId, fromIndex, toIndex)
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

  const usePhoto = async (photoId: number, use: boolean, scope: number): Promise<DefectReportPhotoModel[]> => {
    const response = await DefectReportApi.usePhoto(photoId, use, scope)
    return response.data
  }

  return { buildAndRequestDefectReport, requestDefectReport, moveSpot, moveStructElem, moveRow, usePhoto }
}
