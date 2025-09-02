import { storeToRefs } from "pinia"
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import { RoomMeasurementApi } from "../api/room-measurement-api"
import { OpeningMeasurementApi } from "../api/opening-measurement-api"
import { CeilSectionsMeasurementApi } from "../api/ceil-section-measurement-api"
import { FloorSectionsMeasurementApi } from "../api/floor-section-measurement-api"
import { WallSectionsMeasurementApi } from "../api/wall-section-measurement-api"
import { useMeasurementStore } from "../stores/measurement-store"
import { OpeningMeasurement, RoomMeasurement } from "../stores/types"
import { OpeningMeasurementUpdateRequest, RoomMeasurementUpdateRequest } from "../api/types"

export const
useMeasurementService = () => {
    const {roomMeasurements, openingMeasurements, ceilSectionMeasurements, floorSectionMeasurements, wallSectionMeasurements} = storeToRefs(useMeasurementStore())
    const {selectedInspectionId} = storeToRefs(useInspectionsStore())

    const requestAllMeasurements = async () => {
        await requestRoomMeasurements()
        await requestOpeningMeasurements()
        // await requestCeilSectionMeasurements()
        // await requestFloorSectionMeasurements()
        // await requestWallSectionMeasurements()
    }

    const requestRoomMeasurements = async () => {
        const response = await RoomMeasurementApi.getByInspectionId(selectedInspectionId.value!!)
        roomMeasurements.value = response.data
    }

    const requestOpeningMeasurements = async () => {
        const response = await OpeningMeasurementApi.getByInspectionId(selectedInspectionId.value!!)
        openingMeasurements.value = response.data
    }
    const requestCeilSectionMeasurements = async (roomId:number) => {
        const response = await CeilSectionsMeasurementApi.getByInspectionId(selectedInspectionId.value!!, roomId)
        ceilSectionMeasurements.value = response.data
    }
    const requestFloorSectionMeasurements = async (roomId:number) => {
        const response = await FloorSectionsMeasurementApi.getByInspectionId(selectedInspectionId.value!!,roomId)
        floorSectionMeasurements.value = response.data
    }
    const requestWallSectionMeasurements = async (roomId:number) => {
        const response = await WallSectionsMeasurementApi.getByInspectionId(selectedInspectionId.value!!,roomId)
        wallSectionMeasurements.value = response.data
    }
    const requestMeasurements = async () => {
        await requestRoomMeasurements()
        await requestOpeningMeasurements()
    }

    const createOpeningMeasurement = async (request: OpeningMeasurementUpdateRequest) => {
        await OpeningMeasurementApi.create(request)
        await requestMeasurements()
    }

    const deleteOpeningMeasurement = async (id: number) => {
        await OpeningMeasurementApi.delete(id)
        await requestMeasurements()
    }

    const deleteCeilSectionMeasurement = async (id: number) => {
        await CeilSectionsMeasurementApi.delete(id)
        //TODO: обновить стор
    }

    const deleteFloorSectionMeasurement = async (id: number) => {
        await FloorSectionsMeasurementApi.delete(id)
        //TODO: обновить стор
    }

    const deleteWallSectionMeasurement = async (id: number) => {
        await WallSectionsMeasurementApi.delete(id)
        //TODO: обновить стор
    }

    const updateRoomMeasurement = async (roomMeasurement: RoomMeasurement) => {
        const request = toRoomUpdateRequest(roomMeasurement)

        if (roomMeasurement.id) {
            await RoomMeasurementApi.update(roomMeasurement.id, request)
        } else {
            await RoomMeasurementApi.create(request)
        }

        await requestMeasurements()
    }

    return {
        requestAllMeasurements,
        deleteOpeningMeasurement,
        requestMeasurements,
        updateRoomMeasurement,
        createOpeningMeasurement,
        requestCeilSectionMeasurements,
        requestFloorSectionMeasurements,
        requestWallSectionMeasurements,
        deleteCeilSectionMeasurement,
        deleteFloorSectionMeasurement,
        deleteWallSectionMeasurement
    }
}

const toRoomUpdateRequest = (roomMeasurement: RoomMeasurement): RoomMeasurementUpdateRequest => {
    return {
        ...roomMeasurement,
        inspectionId: roomMeasurement.inspectionId,
        roomId: roomMeasurement.room.id!,
    }
}

const toOpeningUpdateRequest = (opening: OpeningMeasurement): OpeningMeasurementUpdateRequest => {
    return {
        ...opening,
        roomId: opening.room.id!,
        openingId: opening.opening.id,
        materialId: opening.material?.id,
    }
}
