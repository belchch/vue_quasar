import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TechnicalReport } from 'src/features/defect/stores/types'

export const useTechnicalReportStore = defineStore('technical-report', () => {
  const technicalReport = ref<TechnicalReport>()
  const rowEditorOpen = ref<boolean>(false)

  return { technicalReport, rowEditorOpen }
})
