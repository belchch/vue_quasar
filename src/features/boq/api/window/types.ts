import { StructElem } from "src/features/lookup/struct-elem/stores/types"

export type BoqWindowModel = {
    id: number,
    width: number,
    height: number,
    area: number,
    perimeter: number,
    hasSlopes: boolean,
    replacement: boolean,
    preservation: boolean,
    structElems: StructElem[]
}

export type BoqWindowUpdateRequest = {
    id: number,
    width: number,
    height: number,
    hasSlopes: boolean,    
    replacement: boolean,
    preservation: boolean,
}

export const toWindowUpdateRequest = (interiorDoor: BoqWindowModel): BoqWindowUpdateRequest => {
    return {
        id: interiorDoor.id,
        width: interiorDoor.width,
        height: interiorDoor.height,
        hasSlopes: interiorDoor.hasSlopes,
        replacement: interiorDoor.replacement,
        preservation: interiorDoor.preservation,
    }
}