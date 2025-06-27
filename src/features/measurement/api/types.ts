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