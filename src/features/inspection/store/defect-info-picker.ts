import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PhotoDocDefectInfo } from 'src/features/inspection/store/types'

export const defectInfoPickerStore = () =>
  defineStore('defect-info-picker', () => {
    const defectInfo = ref<PhotoDocDefectInfo>()

    return {defectInfo}
  })
