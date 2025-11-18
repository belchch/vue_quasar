import { Material } from 'src/features/lookup/material/stores/types'
export type Rate = {
  id?: number
  name: string
  sourceUrl: string
  price: number
  unitOfMeasure: UnitOfMeasureType
  boqWorkParamsType?: ParamsType | '' | null
  boqWorkParams?:
    | BoqFloor
    | BoqFloorSection
    | BoqFloorSectionUpdateRequest
    | BoqSectionBaseUpdateRequest
    | BoqCeil
    | BoqDoor
    | BoqWindow
    | BoqWallSection
    | BoqWallSectionUpdateReuest
    | BoqFixedAssetParams
    | BoqFixedAssetParamsUpdateRequest
    | null
  factor?: number | null
  sources?: RateSources[]
  averagePrice?: number
  isArchived?: boolean
}

export type RateSources = {
  id?: number
  url: string
  price: number
}

export enum ParamsTypeEnum {
  FLOOR = 'Пол',
  FLOOR_SECTION = 'Секция пола',
  CEIL = 'Потолок',
  CEIL_SECTION = 'Секция потолка',
  DOOR = 'Дверь',
  WINDOW = 'Окно',
  WALL_SECTION = 'Секция стены',
  BOQ = 'Дополнительные работы',
  SUPPORTING = 'Дополнительные работы в помещении',
  FIXED_ASSET = 'Конструктив',
}

export type ParamsType = keyof typeof ParamsTypeEnum
export enum DimensionEnum {
  AREA = 'Площадь',
  PERIMETER = 'Периметр',
  SLOPES_AREA = 'Площадь откосов'
}
export type DimensionType = keyof typeof DimensionEnum
export enum DoorTypeEnum {
  INTERIOR = 'Межкомнатная дверь',
  ENTRANCE = 'Входная дверь',
}
export type DoorType = keyof typeof DoorTypeEnum
export interface BoqSectionBase {
  material?: Material | null
  materialReplacement: boolean | null
  materialPreservation: boolean | null
}
export interface BoqSectionBaseUpdateRequest {
  materialId: number | undefined | null
  materialReplacement: boolean | null
  materialPreservation: boolean | null
}
export interface BoqFloorSection extends BoqSectionBase {
  screedLeveling?: boolean | null
}

export type BoqFloor = {
  id?: number
  baseboardReplacement: boolean | null
  baseboardPreservation: boolean | null
}

export interface BoqFloorSectionUpdateRequest extends BoqSectionBaseUpdateRequest {
  screedLeveling?: boolean | undefined | null
}

export type BoqCeil = {
  id?: number
  moldingReplacement: boolean | null
  moldingPreservation: boolean | null
}

export type BoqDoor = {
  id?: number
  type: DoorType
  hasSlopes: boolean | null
  trimsReplacement: boolean | null
  replacement: boolean | null
  preservation: boolean | null
  dimension: DimensionType
}

export type BoqWindow = {
  id?: number
  hasSlopes: boolean | null
  replacement: boolean | null
  preservation: boolean | null
  slopesPainting: boolean | null
  material?: Material | null
  dimension: DimensionType
}

export type BoqWallSection = {
  id?: number
  material?: Material | null
  replacement: boolean | null
  painting: boolean | null
  plaster: boolean | null
}
export type BoqWallSectionUpdateReuest = {
  materialId?: number | null
  replacement: boolean | null
  pinting: boolean | null
  plaster: boolean | null
}

export type BoqFixedAssetParams = {
  id?: number
  material?: Material | null
  replacement: boolean | null
  painting: boolean | null
  plaster: boolean | null
}

export type BoqFixedAssetParamsUpdateRequest = {
  materialId?: number | null
  replacement: boolean | null
  painting: boolean | null
  plaster: boolean | null
}

export enum UnitOfMeasureEnum {
  SQUARE_METER = 'кв.метры',
  RUNNING_METER = 'погонные метры',
  PIECE = 'шт',
}
export type UnitOfMeasureType = keyof typeof UnitOfMeasureEnum
