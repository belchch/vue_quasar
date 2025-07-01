import { storeToRefs } from "pinia"
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import { RoomMeasurementApi } from "../api/room-measurement-api"
import { OpeningMeasurementApi } from "../api/opening-measurement-api"
import { useMeasurementStore } from "../stores/measurement-store"
import { OpeningMeasurement, RoomMeasurement } from "../stores/types"
import { OpeningMeasurementUpdateRequest, RoomMeasurementUpdateRequest } from "../api/types"

export const 
useMeasurementService = () => {
    const {roomMeasurements, openingMeasurements} = storeToRefs(useMeasurementStore())
    const {selectedInspectionId} = storeToRefs(useInspectionsStore())

    const requestRoomMeasurements = async () => {
        const response = await RoomMeasurementApi.getByInspectionId(selectedInspectionId.value!!)
        roomMeasurements.value = response.data
    }

    const requestOpeningMeasurements = async () => {
        const response = await OpeningMeasurementApi.getByInspectionId(selectedInspectionId.value!!)
        openingMeasurements.value = response.data
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
        deleteOpeningMeasurement,
        requestMeasurements,
        updateRoomMeasurement,
        createOpeningMeasurement
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