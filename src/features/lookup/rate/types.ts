import { Material } from 'src/features/lookup/material/stores/types'
export type Rate = {
    id?: number,
    name: string,
    sourceUrl : string,
    price: number,
    unitOfMeasure : UnitOfMeasureType,
    boqWorkParamsType?: ParamsType | '' | null,
    boqWorkParams?: BoqFloor | BoqFloorSection | BoqFloorSectionUpdateRequest,
    factor?: number | null
}

export enum ParamsTypeEnum {
  FLOOR = 'Пол',
  FLOOR_SECTION = 'Секция пола',
}
export type ParamsType = keyof typeof ParamsTypeEnum
export type BoqFloor = {
  id?: number,
  baseboardReplacement:boolean,
  baseboardPreservation: boolean
}

export type BoqFloorSection = {
  material?:Material | null,
  materialReplacement: boolean,
  materialPreservation: boolean,
  screedLeveling?: boolean
}
export type BoqFloorSectionUpdateRequest = {
  materialId: number | undefined | null,
  materialReplacement: boolean,
  materialPreservation: boolean,
  screedLeveling?: boolean | undefined
}

export enum UnitOfMeasureEnum {
  SQUARE_METER = 'кв.метры',
  RUNNING_METER = 'погонные метры',
  PIECE = 'шт',
}
export type UnitOfMeasureType = keyof typeof UnitOfMeasureEnum
