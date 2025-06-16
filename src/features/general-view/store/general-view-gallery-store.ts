import { defineStore } from "pinia";
import { ref } from "vue";
import { GeneralViewReportGalleryGroup } from "./types";

export const useGeneralViewGalleryStore = defineStore('general-view-gallery', () => {
    const generalViewGallery = ref<GeneralViewReportGalleryGroup[]>()
    
    return {
        generalViewGallery
    }
})