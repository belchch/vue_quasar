import {api} from 'boot/axios'
import { RoomMeasurement } from '../stores/types'
import { RoomMeasurementUpdateRequest } from './types'

export const RoomMeasurementApi = {
    getByInspectionId(inspectionId: number) {
        return api.get<RoomMeasurement[]>(`/api/room-measurements`, {
            params: {
                inspectionId
            }
        })
    },

    create(request: RoomMeasurementUpdateRequest)  {
        return api.post<RoomMeasurement>(`/api/room-measurements`, request)
    },

    update(id: number, request: RoomMeasurementUpdateRequest) {
        return api.put<RoomMeasurement>(`/api/room-measurements/${id}`, request)
    }
}