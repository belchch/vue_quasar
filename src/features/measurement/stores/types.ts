import { Inspection } from "src/features/inspection/store/types"
import { Material } from "src/features/lookup/material/stores/types"
import { Opening } from "src/features/lookup/opening/types"
import { Spot } from "src/features/lookup/spot/stores/types"

export type RoomMeasurement = {
    id?: number,
    inspectionId: number,
    room: Spot,
    width?: number,
    height?: number,
    length?: number,
    area?: number,
    perimeter?: number,
    declaredArea?: number,
    doorArea?: number,
    windowArea?: number
}

export type OpeningMeasurement = {
    id: number,
    room: Spot,
    inspectionId: number,
    material?: Material,
    width: number,
    height: number,
    area: number,
    opening: Opening
}