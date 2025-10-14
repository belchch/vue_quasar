import { defineStore } from "pinia"
import { Estimate } from "../api/types"
import { ref } from "vue"

export const useEstimateStore = defineStore('estimate-work', () => {
    const estimate = ref<Estimate>()

    return {
        estimate
    }
})
