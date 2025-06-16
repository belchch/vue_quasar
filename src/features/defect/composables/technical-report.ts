import { TechnicalReportApi } from 'src/features/defect/api/technical-report-api'
import {
  TechnicalReportCreateRequest, technicalReportRowToUpdateRequest, TechnicalReportRowUpdateRequest,
  TechnicalReportUpdateRequest,
} from 'src/features/defect/api/types'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { useTechnicalReportStore } from 'src/features/defect/stores/technical-report-store'
import { storeToRefs } from 'pinia'
import {TechnicalReportRowApi} from "src/features/defect/api/technical-report-row-api";

export const useTechnicalReportService = () => {
  const inspectionStore = useInspectionsStore()
  const { technicalReport } = storeToRefs(useTechnicalReportStore())

  const assertInspectionSelected = () => {
    if (!inspectionStore.selectedInspectionId) {
      throw Error('No inspection selected')
    }
  }

  const createTechnicalReport = async (request: TechnicalReportCreateRequest) => {
    assertInspectionSelected()
    const response = await TechnicalReportApi.createTechnicalReport(inspectionStore.selectedInspectionId!!, request)
    technicalReport.value = response.data
  }

  const updateTechnicalReport = async (request: TechnicalReportUpdateRequest) => {
    assertInspectionSelected()
    const response = await TechnicalReportApi.updateTechnicalReport(
      inspectionStore.selectedInspectionId!!,
      request,
    )
    technicalReport.value = response.data
  }

  const updateTechnicalReportRow = async (row: TechnicalReportRowUpdateRequest) => {
    if (row.id) {
      await TechnicalReportRowApi.updateTechnicalReportRow(inspectionStore.selectedInspectionId!!, row)
    } else {
      await TechnicalReportRowApi.createTechnicalReportRow(inspectionStore.selectedInspectionId!!, row)
    }

    await requestTechnicalReport()
  }

  const requestTechnicalReport = async () => {
    assertInspectionSelected()
    const response = await TechnicalReportApi.getTechnicalReport(
      inspectionStore.selectedInspectionId!!,
    )
    technicalReport.value = response.data
  }

  const deleteTechnicalReport = async () => {
    assertInspectionSelected()
    await TechnicalReportApi.deleteTechnicalReport(inspectionStore.selectedInspectionId!!)
    await requestTechnicalReport()
  }

  const deleteTechnicalReportRow = async (rowId: number) => {
    assertInspectionSelected()
    await TechnicalReportRowApi.deleteTechnicalReportRow(inspectionStore.selectedInspectionId!!, rowId)
    await requestTechnicalReport()
  }

  return { createTechnicalReport, updateTechnicalReport, requestTechnicalReport, updateTechnicalReportRow, deleteTechnicalReport, deleteTechnicalReportRow }
}
