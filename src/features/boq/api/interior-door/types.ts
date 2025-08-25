import { StructElem } from "src/features/lookup/struct-elem/stores/types"

export type BoqInteriorDoorModel = {
    id: number,
    width: number,
    height: number,
    area: number,
    perimeter: number,
    hasSlopes: boolean,
    trimsReplacement: boolean,
    replacement: boolean,
    preservation: boolean,
    structElems: StructElem[]
}

export type BoqInteriorDoorUpdateRequest = {
    id: number,
    width: number,
    height: number,
    hasSlopes: boolean,
    trimsReplacement: boolean,
    replacement: boolean,
    preservation: boolean,
}

export const toInteriorDoorUpdateRequest = (interiorDoor: BoqInteriorDoorModel): BoqInteriorDoorUpdateRequest => {
    return {
        id: interiorDoor.id,
        width: interiorDoor.width,
        height: interiorDoor.height,
        hasSlopes: interiorDoor.hasSlopes,
        trimsReplacement: interiorDoor.trimsReplacement,
        replacement: interiorDoor.replacement,
        preservation: interiorDoor.preservation
    }
}