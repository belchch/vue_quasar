import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  DefectReportModel,
  DefectMovableReportModel,
} from 'src/features/defect/stores/defect-report-types'
const defaultMovableDefectReport: DefectMovableReportModel = {
  id: 0,
  movables: [
    {
      id: 0,
      text: 'Ящик',
      rows: [
        {
          name: 'Вздутие покрытия1_1',
          measurements: '10x43x12',
          photos: [],
        },
        {
          name: 'Вздутие покрытия1_2',
          measurements: '10x43x12',
          photos: [],
        },
      ],
    },
    {
      id: 0,
      text: 'Столд',
      rows: [
        {
          name: 'Вздутие покрытия_2-1',
          measurements: '10x43x12',
          photos: [],
        },
        {
          name: 'Вздутие покрытия_2-2',
          measurements: '10x43x12',
          photos: [],
        },
      ],
    },
  ],
}
export const useDefectReportStore = defineStore('defect-report', () => {
  const defectReport = ref<DefectReportModel>()
  const defectMovableReport = ref<DefectMovableReportModel>(defaultMovableDefectReport)

  return { defectReport, defectMovableReport }
})
