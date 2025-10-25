import { defineStore } from 'pinia'
import { Estimate, EstimateMaterial } from '../api/types'
import { ref } from 'vue'

export const useEstimateStore = defineStore('estimate-work', () => {
  const estimateWorks = ref<Estimate>()
  const estimateMaterials = ref<EstimateMaterial>()
  return {
    estimateWorks,
    estimateMaterials,
  }
})
