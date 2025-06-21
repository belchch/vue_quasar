import {TechnicalReportRow} from "src/features/defect/stores/types";

export type TechnicalReportCreateRequest = {
  name: string
}

export type TechnicalReportUpdateRequest = {
  name: string
}

export type TechnicalReportRowUpdateRequest = {
  id?: number | undefined,
  description: string,
  standardId: number,
  photoDocId?: number | undefined,
  technicalReportId: number
}

export const technicalReportRowToUpdateRequest = (technicalReportRow: TechnicalReportRow): TechnicalReportRowUpdateRequest => ({
  description: technicalReportRow.description,
  standardId: technicalReportRow.standard.id!!,
  photoDocId: technicalReportRow.photoDoc?.id,
  technicalReportId: technicalReportRow.technicalReportId
})


export type FileInfo = {
    fileName: string
    fileLink: string
}