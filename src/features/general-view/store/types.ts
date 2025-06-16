export type GeneralViewReport = {
  id: number
  inspectionId: number,
  rows: GeneralViewReportRow[]
}

export type GeneralViewReportRow = {
  id?: number
  items: GeneralViewReportItem[]
}

export type GeneralViewReportItem = {
  id?: number
  photos: GeneralViewReportPhoto[]
  text: string
}

export type GeneralViewReportPhoto = {
  id?: number,
  source: string,
  url?: string
}

export type GeneralViewReportGalleryPhoto = {
  source: string,
  url: string
}

export type GeneralViewReportGalleryGroup = {
  name: string,
  photos: GeneralViewReportGalleryPhoto[]
}