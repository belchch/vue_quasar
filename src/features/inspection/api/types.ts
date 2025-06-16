import { PhotoDocType } from 'src/features/inspection/store/types'
import type {StructElem} from "src/features/lookup/struct-elem/stores/types";
import type {Material} from "src/features/lookup/material/stores/types";
import {Defect} from "src/features/defect/flaw/stores/types";
import {Flaw} from "src/features/defect/flaw/stores/types";

export type PhotoDocUpdateRequest = {
  id: number
  sources: string[]
  spotId?: number | undefined
  type?: PhotoDocType | undefined
  defectInfo?: PhotoDocDefectInfoUpdateRequest | undefined
}

export type PhotoDocDefectInfoUpdateRequest = {
  structElemId?: number | undefined
  materialId?: number | undefined
  flawId?: number | undefined
  defectId?: number | undefined
  value?: string | undefined
  cause?: string | undefined
  technicalReportId?: number | undefined
}

export type DefectSearchRequest = {
  structElemId: number | undefined,
  materialId: number | undefined,
  flawId: number | undefined,
  defectId: number | undefined
}

export type DefectSearchResponse = {
  structElems: StructElem[],
  materials: Material[],
  flaws: Flaw[],
  defects: Defect[]
}

export type PhotoDocSearchRequest = {
  type: string[]
  spotId: number[]
  structElemId: number[]
  materialId: number[]
  typeIsNull: boolean
  spotIdIsNull: boolean
  materialIdIsNull: boolean
  structElemIdIsNull: boolean
}
