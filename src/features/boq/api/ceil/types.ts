import { Material } from "src/features/lookup/material/stores/types"
import { StructElem } from "src/features/lookup/struct-elem/stores/types"

export type BoqCeil = {
    id: number,
    moldingLength: number,
    moldingReplacement: boolean,
    moldingPreservation: boolean,
    sections: BoqCeilSection[],
    structElems: StructElem[]
}

export type BoqCeilSection = {
    id: number,
    material: Material,
    area: number,
    materialReplacement: boolean,
    materialPreservation: boolean
}

export type BoqCeilUpdateRequest = {
    id: number,
    moldingLength: number,
    moldingReplacement: boolean,
    moldingPreservation: boolean
}

export type BoqCeilSectionUpdateRequest = {
    id: number,
    materialId?: number | undefined,
    area: number,
    materialReplacement: boolean,
    materialPreservation: boolean
}

export const toCeilUpdateRequest = (boqCeil: BoqCeil): BoqCeilUpdateRequest => {
    return {
        id: boqCeil.id,
        moldingLength: boqCeil.moldingLength,
        moldingReplacement: boqCeil.moldingReplacement,
        moldingPreservation: boqCeil.moldingPreservation
    }
}

export const toCeilSectionUpdateRequest = (ceilSection: BoqCeilSection): BoqCeilSectionUpdateRequest => {
    return {
        id: ceilSection.id,
        materialId: ceilSection.material.id,
        area: ceilSection.area,
        materialReplacement: ceilSection.materialReplacement,
        materialPreservation: ceilSection.materialPreservation        
    }
}