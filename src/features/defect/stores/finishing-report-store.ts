import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DefectReportModel } from 'src/features/defect/stores/defect-report-types'

export const useFinishingReportStore = defineStore('finishing-report', () => {
  const finishingReport = ref<DefectReportModel>()
  return { finishingReport }
})
