import { Material } from "src/features/lookup/material/stores/types"
import { Spot } from "src/features/lookup/spot/stores/types"
import { StructElem } from "src/features/lookup/struct-elem/stores/types"
import { Rate } from "src/features/rate/stores/types"

export type BoqLocation = {
    id: number,
    room: Spot,
    boqId: number,
    roomNum?: number,
    area?: number,
    perimeter?: number,
    height?: number,
    floor: BoqFloor
}

export type Boq = {
    id: number,
}

export type BoqLocationUpdateRequest = {
    id: number,
    roomId: number,
    roomNum?: number | undefined,
    area?: number | undefined,
    perimeter?: number | undefined,
    height?: number | undefined
}

export const toLocationUpdateRequest = (location: BoqLocation) => {
    return {
        id: location.id,
        roomId: location.room.id!,
        roomNum: location.roomNum,
        boqId: location.boqId,
        area: location.area,
        perimeter: location.perimeter,
        height: location.height
    }
}

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

export type BoqWork = {
    id: number,
    locationId: number,
    rate: Rate,
    volume: number,
    disabled: boolean
}

export type BoqWorkUpdateRequest = {
    id: number,
    volume: number,
    disabled: boolean
}

export const toWorkUpdateRequest = (work: BoqWork): BoqWorkUpdateRequest => {
    return {
        id: work.id,
        volume: work.volume,
        disabled: work.disabled
    }
}