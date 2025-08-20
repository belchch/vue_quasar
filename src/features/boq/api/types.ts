import { Spot } from "src/features/lookup/spot/stores/types"
import { Rate } from "src/features/rate/stores/types"
import { BoqFloor } from "./floor/types"
import { BoqCeil } from "./ceil/types"

export type BoqLocation = {
    id: number,
    room: Spot,
    boqId: number,
    roomNum?: number,
    area?: number,
    perimeter?: number,
    height?: number,
    floor: BoqFloor,
    ceil: BoqCeil
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