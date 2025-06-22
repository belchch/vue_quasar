import { defineStore } from "pinia";
import { InspectionSpot } from "../api/types";
import { ref } from "vue";

export const useInspectionSpotStore = defineStore('inspection-spots', () => {
    const inspectionSpots = ref<InspectionSpot[]>([])

    return {inspectionSpots}
})