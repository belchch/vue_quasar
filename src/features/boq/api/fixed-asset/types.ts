import { Material } from "src/features/lookup/material/stores/types"
import { StructElem } from "src/features/lookup/struct-elem/stores/types"

export type BoqFixedAssetModel = {
    id: number,
    height: number,
    perimeter: number,
    surfaceArea: number,
    material: Material,
    replacement: boolean,
    painting: boolean,
    plaster: boolean,
    structElems: StructElem[]
}

export type BoqFixedAssetUpdateRequest = {
    id: number,
    height: number,
    perimeter: number,
    material: Material,
    replacement: boolean,
    painting: boolean,
    plaster: boolean
}

export const toFixedAssetUpdateRequest = (fixedAsset: BoqFixedAssetModel): BoqFixedAssetUpdateRequest => {
    return {
        id: fixedAsset.id,
        height: fixedAsset.height,
        perimeter: fixedAsset.perimeter,
        material: fixedAsset.material,
        replacement: fixedAsset.replacement,
        painting: fixedAsset.painting,
        plaster: fixedAsset.plaster
    }
}