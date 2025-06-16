import { defineStore } from "pinia";
import { GeneralViewReport } from "./types";
import { ref } from "vue";

export const useGeneralViewReportStore = defineStore('general-view', () => {
    const generalViewReport = ref<GeneralViewReport>()

    return {
        generalViewReport
    }
})