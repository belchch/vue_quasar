export type RoomMeasurementUpdateRequest = {
    inspectionId: number,
    roomId: number,
    width?: number,
    height?: number,
    length?: number,
    declaredArea?: number
}

export type OpeningMeasurementUpdateRequest = {
    roomId: number,
    inspectionId: number,
    materialId?: number | undefined,
    width: number,
    height: number,
    openingId: number
}

interface Opening {
  type: "window" | "door" | "doorway";
  hasCustomShape: boolean;
  width: number;
  height: number;
  heightFromFloor: number;
  area: number;
  perimeter: number;
  comment: string;
  hasSlopes?: boolean;
  slopesWidth?: number;
  hasTrims?: boolean;
  trimsWidth?: number;
}

interface Section {
  length: number;
  width?: number;
  height?: number;
  perimeter: number;
  area: number;
  hasCustomShape: boolean;
  comment: string;
  heightFromFloor?: number;
  perimeterExcludingOpenings?: number;
  openings?: Opening[];
}

interface Wall {
  length: number;
  height: number;
  perimeter: number;
  area: number;
  hasCustomShape: boolean;
  comment: string;
  sections: Section[];
  openings: Opening[];
}

interface Floor {
  perimeter: number;
  perimeterExcludingOpenings: number;
  area: number;
  comment: string;
  hasCustomShape: boolean;
  sections: Section[];
  baseboardLength: number;
}

interface Ceiling {
  length: number;
  width: number;
  perimeter: number;
  area: number;
  hasCustomShape: boolean;
  comment: string;
  sections: Section[];
  moldingLength: number;
}

export interface Room {
  comment: string;
  height: number;
  walls: Wall[];
  floor: Floor;
  ceiling: Ceiling;
}

export type MovableCreateRequest = {
  width: number;
  length: number;
  height: number;
  name: string;
  inspectionId: number;
  roomId: number;
  roomNum?: number | undefined;
}

export type MovableUpdateRequest = {
  width?: number;
  length?: number;
  height?: number;
  name?: string;
}
