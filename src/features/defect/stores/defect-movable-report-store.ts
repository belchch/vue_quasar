import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DefectMovableReportModel } from 'src/features/defect/stores/defect-movable-report-types'

export const useDefectMovableReportStore = defineStore('defect-movable-report', () => {
  const defectMovableReport = ref<DefectMovableReportModel>()
  return { defectMovableReport }
})
