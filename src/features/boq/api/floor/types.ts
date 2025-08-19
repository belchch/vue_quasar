import { Material } from "src/features/lookup/material/stores/types"
import { StructElem } from "src/features/lookup/struct-elem/stores/types"

export type BoqFloor = {
    id: number,
    baseboardLength: number,
    baseboardReplacement: boolean,
    baseboardPreservation: boolean,
    sections: BoqFloorSection[],
    structElems: StructElem[]
}

export type BoqFloorSection = {
    id: number,
    material: Material,
    area: number,
    materialReplacement: boolean,
    materialPreservation: boolean,
    screedLeveling: boolean
}

export type BoqFloorUpdateRequest = {
    id: number,
    baseboardLength: number,
    baseboardReplacement: boolean,
    baseboardPreservation: boolean
}

export type BoqFloorSectionUpdateRequest = {
    id: number,
    materialId?: number | undefined,
    area: number,
    materialReplacement: boolean,
    materialPreservation: boolean,
    screedLeveling: boolean
}

export const toFloorUpdateRequest = (boqFloor: BoqFloor): BoqFloorUpdateRequest => {
    return {
        id: boqFloor.id,
        baseboardLength: boqFloor.baseboardLength,
        baseboardReplacement: boqFloor.baseboardReplacement,
        baseboardPreservation: boqFloor.baseboardPreservation
    }
}

export const toFloorSectionUpdateRequest = (floorSection: BoqFloorSection): BoqFloorSectionUpdateRequest => {
    return {
        id: floorSection.id,
        materialId: floorSection.material.id,
        area: floorSection.area,
        materialReplacement: floorSection.materialReplacement,
        materialPreservation: floorSection.materialPreservation,
        screedLeveling: floorSection.screedLeveling
    }
}