import {api} from 'boot/axios'
import { WallSectionMeasurement,SectionMeasurementCreateRequest } from '../stores/types'
import { SectionMeasurementUpdateRequest } from './types'



export const WallSectionsMeasurementApi = {
    getByInspectionId(inspectionId: number) {
        return api.get<WallSectionMeasurement[]>(`/api/wall-section-measurement`, {
            params: {
                inspectionId,
            }
        })
    },
    getByRoomId(inspectionId: number, roomId:number) {
        return api.get<WallSectionMeasurement[]>(`/api/wall-section-measurement`, {
            params: {
                inspectionId,
                roomId
            }
        })
    },
    create(request: SectionMeasurementCreateRequest) {
      return api.post<WallSectionMeasurement>(`/api/wall-section-measurement`, request);
    },
    update(id:number,request: SectionMeasurementUpdateRequest) {
      return api.put<WallSectionMeasurement>(`/api/wall-section-measurement/${id}`, request);
    },
    delete(id: number) {
        return api.delete(`/api/wall-section-measurement/${id}`)
    }
}
