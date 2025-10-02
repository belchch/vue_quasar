import {api} from 'boot/axios'
import { FloorSectionMeasurement, SectionMeasurementCreate } from '../stores/types'
import { SectionMeasurementUpdateRequest } from './types'



export const FloorSectionsMeasurementApi = {
    getByInspectionId(inspectionId: number) {
        return api.get<FloorSectionMeasurement[]>(`/api/floor-section-measurement`, {
            params: {
                inspectionId
            }
        })
    },

    getByRoomId(inspectionId: number, roomId:number) {
        return api.get<FloorSectionMeasurement[]>(`/api/floor-section-measurement`, {
            params: {
                inspectionId,
                roomId
            }
        })
    },

    create(request: SectionMeasurementCreate) {
      return api.post<FloorSectionMeasurement>(`/api/floor-section-measurement`, request);
    },

    update(id: number, request: SectionMeasurementUpdateRequest) {
      return api.put<FloorSectionMeasurement>(`/api/floor-section-measurement/${id}`, request);
    },

    delete(id: number) {
        return api.delete(`/api/floor-section-measurement/${id}`)
    }
}
