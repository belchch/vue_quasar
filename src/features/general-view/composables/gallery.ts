import { storeToRefs } from "pinia";
import { InspectionApi } from "src/features/inspection/api/inspection-api";
import { useInspectionsStore } from "src/features/inspection/store/inspection-store";
import { GeneralViewReportApi } from "../api/general-view-report-api";
import { useGeneralViewGalleryStore } from "../store/general-view-gallery-store";


export const useGeneralViewGalleryService = () => {
    const {selectedInspectionId} = storeToRefs(useInspectionsStore())
    const {generalViewGallery} = storeToRefs(useGeneralViewGalleryStore())

    const requestGallery = async () => {
        const response = await GeneralViewReportApi.getGallery(selectedInspectionId.value!!)
        generalViewGallery.value = response.data
    }

    const generatePresignedUrlsAndRequestGallery = async () => {
        await InspectionApi.generatePresignedUrls(selectedInspectionId.value!!)
        await requestGallery()
    }

    return {
        requestGallery,
        generatePresignedUrlsAndRequestGallery
    }
}