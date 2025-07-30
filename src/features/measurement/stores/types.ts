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

export type TreeItem = {
  id: number,
  header: string,
  type: string,
  label: string,
  rawData: any,
  children: any[]
}

export type Room = {
  id: number,
  header: 'room',
  type: 'room',
  label: string,
  rawData: any,
  children: any[]
}

export type Wall = {
  id: number,
  index: number,
  header: string,
  type: string,
  label: string,
  rawData: object,
  children: any[]
}

export type Walls = {
  id: number,
  header: string,
  type: string,
  label: string,
  rawData: object,
  children: any[]
}

export type PlanOpening = {
  id: number,
  type: 'opening',
  label: string,
  rawData: object
}

export type PlanTreeCommonNode = {
    label: string,
    rawData: any
}