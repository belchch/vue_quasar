import { Material } from 'src/features/lookup/material/stores/types'
export type Rate = {
    id?: number,
    name: string,
    sourceUrl : string,
    price: number,
    unitOfMeasure : UnitOfMeasureType,
    boqWorkParamsType?: ParamsType | '' | null,
    boqWorkParams?: BoqFloor | BoqFloorSection | BoqFloorSectionUpdateRequest | BoqSectionBaseUpdateRequest | BoqCeil,
    factor?: number | null
}

export enum ParamsTypeEnum {
  FLOOR = 'Пол',
  FLOOR_SECTION = 'Секция пола',
  CEIL = 'Потолок',
  CEIL_SECTION = 'Секция потолка'
}
export type ParamsType = keyof typeof ParamsTypeEnum
export interface BoqSectionBase {
  material?: Material | null;
  materialReplacement: boolean;
  materialPreservation: boolean;
}
export interface BoqSectionBaseUpdateRequest {
  materialId: number | undefined | null,
  materialReplacement: boolean,
  materialPreservation: boolean,
}
export interface BoqFloorSection extends BoqSectionBase {
  screedLeveling?: boolean;
}


export type BoqFloor = {
  id?: number,
  baseboardReplacement:boolean,
  baseboardPreservation: boolean
}

export interface BoqFloorSectionUpdateRequest extends BoqSectionBaseUpdateRequest {
  screedLeveling?: boolean | undefined
}

export type BoqCeil = {
  id?: number,
  moldingReplacement:boolean,
  moldingPreservation: boolean
}

export enum UnitOfMeasureEnum {
  SQUARE_METER = 'кв.метры',
  RUNNING_METER = 'погонные метры',
  PIECE = 'шт',
}
export type UnitOfMeasureType = keyof typeof UnitOfMeasureEnum
