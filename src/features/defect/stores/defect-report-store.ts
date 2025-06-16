import {defineStore} from "pinia";
import {ref} from 'vue'
import {DefectReportModel} from "src/features/defect/stores/defect-report-types";


export const useDefectReportStore = defineStore('defect-report', () => {
  const defectReport = ref<DefectReportModel>()

  return {defectReport}
})
