import { ParamsType } from "src/features/lookup/rate/types"

export type Rate = {
    id: number,
    name: string,
    boqWorkParamsType: ParamsType,
    unitOfMeasure: UnitOfMeasure
}

export type UnitOfMeasure = 'SQUARE_METER' | 'PIECE' | 'RUNNING_METER'

export const uomDescription = (uom: UnitOfMeasure) => {
    switch (uom) {
        case 'SQUARE_METER': return 'м²'
        case 'PIECE': return 'шт'
        case 'RUNNING_METER': return 'м.п.'
    }
}