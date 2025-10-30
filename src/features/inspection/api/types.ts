import { Inspection, PhotoDocType } from 'src/features/inspection/store/types'
import type {StructElem} from "src/features/lookup/struct-elem/stores/types";
import type {Material} from "src/features/lookup/material/stores/types";
import {Defect} from "src/features/defect/flaw/stores/types";
import {Flaw} from "src/features/defect/flaw/stores/types";
import { Spot } from 'src/features/lookup/spot/stores/types';
import dayjs from 'dayjs';

export type PhotoDocUpdateRequest = {
  id: number
  sources: string[]
  spotId?: number | undefined
  spotNum?: number | undefined
  type?: PhotoDocType | undefined
  defectInfo?: PhotoDocDefectInfoUpdateRequest | undefined
  movableInfo?: PhotoDocMovableInfoUpdateRequest | undefined 
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

export type PhotoDocMovableInfoUpdateRequest = {
  movableId: number | undefined,
  floodPropertyDamageId: number | undefined
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

export type PhotoDocSpotSearchRequest = {
  spotId: number,
  spotNum?: number | undefined
}

export type PhotoDocSearchRequest = {
  type: string[]
  spot: PhotoDocSpotSearchRequest[]
  structElemId: number[]
  materialId: number[]
  typeIsNull: boolean
  spotIdIsNull: boolean
  materialIdIsNull: boolean
  structElemIdIsNull: boolean
}

export type InspectionSpot = {
  id?: number | undefined,
  spot: Spot,
  count: number,
  inUse: boolean
}

export type InspectionSpotUpdateRequest = {
  id?: number | undefined,
  spotId: number,
  count: number,
  inUse: boolean
}

export type InspectionUpdateRequest = {
    apartment: string,
    address: string,
    performedDate?: string,
    performedById?: number | undefined,
    caseId: number
}

export const toInspectionUpdateRequest = (inspection: Inspection): InspectionUpdateRequest => {
  return {
    apartment: inspection.apartment,
    address: inspection.address,
    performedDate: inspection.performedDate,
    performedById: inspection.performedBy?.id,
    caseId: inspection.caseId
  }
}