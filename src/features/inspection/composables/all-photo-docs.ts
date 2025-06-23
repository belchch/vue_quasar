import { storeToRefs } from "pinia"
import { InspectionApi } from "../api/inspection-api"
import { useAllPhotoDocStore } from "../store/all-photo-doc-store"
import { useInspectionsStore } from "../store/inspection-store"

export const useAllPhotoDocsService = () => {
    const {allPhotoDocs} = storeToRefs(useAllPhotoDocStore())
    const {selectedInspectionId} = storeToRefs(useInspectionsStore())

    const requestAllPhotoDocs = async () => {
        await InspectionApi.generatePresignedUrls(selectedInspectionId.value!)
        const response = await InspectionApi.searchPhotoDocs(selectedInspectionId.value!)
        allPhotoDocs.value = response.data
    }

    return {requestAllPhotoDocs}
}