import { Material } from "src/features/lookup/material/stores/types"
import { StructElem } from "src/features/lookup/struct-elem/stores/types"

export type BoqWallSectionModel = {
    id: number,
    area: number,
    material: Material,
    replacement: boolean,
    painting: boolean,
    plaster: boolean,
    structElems: StructElem[]
}

export type BoqWallSectionUpdateRequest = {
    id: number,
    area: number,
    material: Material,
    replacement: boolean,
    painting: boolean,
    plaster: boolean
}

export const toWallSectionUpdateRequest = (wallSection: BoqWallSectionModel): BoqWallSectionUpdateRequest => {
    return {
        id: wallSection.id,
        area: wallSection.area,
        material: wallSection.material,
        replacement: wallSection.replacement,
        painting: wallSection.painting,
        plaster: wallSection.plaster
    }
}