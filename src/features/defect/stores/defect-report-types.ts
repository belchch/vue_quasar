export type DefectReportPhotoModel = {
  id: number
  source: string
  url: string
  used: boolean
}

export type DefectReportRowModel = {
  id: number
  technicalReport: string | undefined
  defect: string | undefined
  standard: string | undefined
  photos: DefectReportPhotoModel[]
  sortOrder: number
}

export type DefectReportStructElemModel = {
  id: number
  text: string
  rows: DefectReportRowModel[]
  sortOrder: number
}

export type DefectReportSpotModel = {
  id: number
  text: string
  structElems: DefectReportStructElemModel[]
  sortOrder: number
}

export type DefectReportModel = {
  id: number
  spots: DefectReportSpotModel[]
  useTechnicalReport: boolean
}

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
