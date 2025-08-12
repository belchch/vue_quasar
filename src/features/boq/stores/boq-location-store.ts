import { defineStore } from "pinia";
import { ref } from "vue";
import { BoqLocation } from "../api/types";

export const useBoqLocationStore = defineStore('boq-location', () => {
    const floorPhotos = ref<string[]>()
    const location = ref<BoqLocation>()

    return {
        floorPhotos,
        location
    }
})