import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  DefectReportModel,
  DefectMovableReportModel,
} from 'src/features/defect/stores/defect-report-types'
const defaultMovableDefectReport: DefectMovableReportModel = {
  id: 0,
  objects: [
    {
      id: 0,
      text: 'Ящик',
      rows: [
        {
          defect: 'Вздутие покрытия1_1',
          measurements: '10x43x12',
          photos: [],
        },
        {
          defect: 'Вздутие покрытия1_2',
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
          defect: 'Вздутие покрытия_2-1',
          measurements: '10x43x12',
          photos: [],
        },
        {
          defect: 'Вздутие покрытия_2-2',
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
