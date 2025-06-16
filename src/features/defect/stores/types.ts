import {Standard} from "src/features/lookup/standard/stores/types";
import {PhotoDoc} from "src/features/inspection/store/types";

export type TechnicalReport = {
  id: number,
  name: string,
  rows: TechnicalReportRow[]
}

export type TechnicalReportRow = {
  id: number,
  description: string,
  standard: Standard,
  photoDoc?: PhotoDoc,
  technicalReportId: number,
  used: boolean
}
