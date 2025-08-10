import { storeToRefs } from "pinia"
import { useTechnicalReportService } from "src/features/defect/composables/technical-report"
import { useTechnicalReportStore } from "src/features/defect/stores/technical-report-store"
import { useAllPhotoDocStore } from "../store/all-photo-doc-store"
import { usePhotoDocsStore } from "../store/photo-doc-store"
import { useAllPhotoDocsService } from "./all-photo-docs"
import { useInspectionSpotService } from "./inspection-spot"
import { useInspectionsStore } from "../store/inspection-store"

export const useInspectionPageService = () => {
    const { requestAllPhotoDocs } = useAllPhotoDocsService()
    const { allPhotoDocs } = storeToRefs(useAllPhotoDocStore())
    const { photoDocs } = storeToRefs(usePhotoDocsStore())
    const { requestTechnicalReport } = useTechnicalReportService()
    const { requestInspectionSpots } = useInspectionSpotService()
    const { technicalReport } = storeToRefs(useTechnicalReportStore())
    const { selectedInspectionId } = storeToRefs(useInspectionsStore())

    const initPageStore = async (inspectionId: number) => {
        selectedInspectionId.value = inspectionId
        await requestAllPhotoDocs()
        photoDocs.value = allPhotoDocs.value
        await requestTechnicalReport()
        await requestInspectionSpots()        
    }

    const cleanPageStore = () => {
        selectedInspectionId.value = undefined
        photoDocs.value = []
        allPhotoDocs.value = []
        technicalReport.value = undefined
    }

    return {
        initPageStore, cleanPageStore
    }
}