import { Inspection } from "src/features/inspection/store/types"
import { Material } from "src/features/lookup/material/stores/types"
import { Opening } from "src/features/lookup/opening/types"
import { Spot } from "src/features/lookup/spot/stores/types"

export type RoomMeasurement = {
    id?: number,
    roomNum?: number | null,
    inspectionId: number,
    room: Spot,
    width?: number,
    height?: number,
    length?: number,
    area?: number,
    perimeter?: number,
    declaredArea?: number,
    doorArea?: number,
    windowArea?: number,
    floorArea?:number,
    ceilArea?:number,
    wallMaterial?:Material,
    floorMaterial?:Material,
    ceilMaterial?:Material,
}

export type OpeningMeasurement = {
    id: number,
    room: Spot,
    roomNum?: number,
    inspectionId: number,
    material?: Material,
    width: number,
    height: number,
    area: number,
    hasTrims: boolean,
    trimWidth: boolean,
    opening: Opening
}

export type FloorSectionMeasurement = {
    id: number,
    room: Spot,
    roomNum?: number,
    material?: Material,
    width: number,
    length: number,
    area: number,
    perimeter: number,
}

export type CeilSectionMeasurement = {
    id: number,
    room: Spot,
    roomNum?: number,
    material?: Material,
    width: number,
    length: number,
    area: number,
    perimeter: number,
}

export type WallSectionMeasurement = {
    id: number,
    room: Spot,
    roomNum?: number,
    material?: Material,
    width: number,
    height: number,
    area: number,
    perimeter: number,
}

export type TreeItem = {
  id: number,
  header: string,
  type: string,
  label: string,
  rawData: any,
  children: any[],
  roomNodeId?: number | undefined
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
  children: any[],
  roomNodeId: number
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

export interface Movable {
  id: number;
  name: string;
  width: number;
  length: number;
  height: number;
  heightFromFloor: number;
  perimeter: number;
  area: number;
  hasCustomShape: boolean;
  sources: string[];
  urls: string[];
  room: RoomMovable;
  inspectionId: number;
}

export interface RoomMovable {
  id: number;
  name: string;
}
