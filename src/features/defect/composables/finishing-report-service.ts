import { useFinishingReportStore } from 'src/features/defect/stores/finishing-report-store'
import { FinishingReportApi } from 'src/features/defect/api/finishing-report-api'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { storeToRefs } from 'pinia'
import { DefectReportPhotoModel } from 'src/features/defect/stores/defect-report-types'

export const useFinishingReportService = () => {
  const { finishingReport } = storeToRefs(useFinishingReportStore())
  const inspectionStore = useInspectionsStore()

  const buildAndRequestReport = async () => {
    await FinishingReportApi.buildFinishingReport(inspectionStore.selectedInspectionId!!)
    await requestFinishingReport()
  }

  const requestFinishingReport = async () => {
    const response = await FinishingReportApi.getFinishingReport(
      inspectionStore.selectedInspectionId!!,
    )
    finishingReport.value = response.data
  }

  const moveSpot = async (spotId: number, fromIndex: number, toIndex: number) => {
    await FinishingReportApi.moveSpot(spotId, fromIndex, toIndex)
    await requestFinishingReport()
  }

  const moveStructElem = async (structElemId: number, fromIndex: number, toIndex: number) => {
    await FinishingReportApi.moveStructElem(structElemId, fromIndex, toIndex)
    await requestFinishingReport()
  }

  const moveRow = async (rowId: number, fromIndex: number, toIndex: number) => {
    await FinishingReportApi.moveRow(rowId, fromIndex, toIndex)
    await requestFinishingReport()
  }

  const usePhoto = async (
    photoId: number,
    use: boolean,
    scope: number,
  ): Promise<DefectReportPhotoModel[]> => {
    const response = await FinishingReportApi.usePhoto(photoId, use, scope)
    return response.data
  }

  return {
    buildAndRequestReport,
    requestFinishingReport,
    moveSpot,
    moveStructElem,
    moveRow,
    usePhoto,
  }
}
