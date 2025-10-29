import { DefectReportPhotoModel } from 'src/features/defect/stores/defect-report-types'

export type DefectMovableItemRowModel = {
  defect: string
  measurements: string
  photos: DefectReportPhotoModel[]
}

export type DefectMovableModel = {
  id: number
  text: string
  rows: DefectMovableItemRowModel[]
}
export type DefectMovableReportModel = {
  id: number
  objects: DefectMovableModel[]
}
