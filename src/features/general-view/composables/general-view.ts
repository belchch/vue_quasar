import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import { GeneralViewReportApi } from "../api/general-view-report-api"
import { useGeneralViewReportStore } from "../store/general-view-store"
import { storeToRefs } from "pinia"
import { GeneralViewReport } from "../store/types"
import { ReportFormat } from "../api/types"


export const useGeneralViewReportService = () => {
    const {generalViewReport} = storeToRefs(useGeneralViewReportStore())
    const {selectedInspectionId} = storeToRefs(useInspectionsStore())

    const requestGeneralViewReport = async () => {
        const response = await GeneralViewReportApi.getReport(selectedInspectionId.value!!)
        generalViewReport.value = response.data
    }

    const buildGeneralViewReport = async (format: ReportFormat) => {
        await GeneralViewReportApi.buildReport(selectedInspectionId.value!!, format)
    }

    const updateGeneralViewReport = async () => {
        console.log('update', generalViewReport.value)
        const response = await GeneralViewReportApi.updateReport(generalViewReport.value!!)
        generalViewReport.value = response.data
    }

    return {
        requestGeneralViewReport,
        buildGeneralViewReport,
        updateGeneralViewReport
    }
}