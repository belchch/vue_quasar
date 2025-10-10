import {api} from 'boot/axios'
import { CeilSectionMeasurement,SectionMeasurementCreateRequest } from '../stores/types'
import { SectionMeasurementUpdateRequest } from './types'



export const CeilSectionsMeasurementApi = {
    getByInspectionId(inspectionId: number) {
        return api.get<CeilSectionMeasurement[]>(`/api/ceil-section-measurement`, {
            params: {
                inspectionId
            }
        })
    },
    getByRoomId(inspectionId: number,roomId:number) {
        return api.get<CeilSectionMeasurement[]>(`/api/ceil-section-measurement`, {
            params: {
                inspectionId,
                roomId
            }
        })
    },
    create(request: SectionMeasurementCreateRequest) {
      return api.post<CeilSectionMeasurement>(`/api/ceil-section-measurement`, request);
    },
    update(id: number, request: SectionMeasurementUpdateRequest) {
      return api.put<CeilSectionMeasurement>(`/api/ceil-section-measurement/${id}`, request);
    },
    delete(id: number) {
        return api.delete(`/api/ceil-section-measurement/${id}`)
    }
}
