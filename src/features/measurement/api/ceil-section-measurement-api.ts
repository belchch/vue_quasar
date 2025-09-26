import {api} from 'boot/axios'
import { CeilSectionMeasurement,SectionMeasurementCreate } from '../stores/types'



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
    create(request: SectionMeasurementCreate) {
      return api.post<CeilSectionMeasurement>(`/api/ceil-section-measurement`, request);
    },
    delete(id: number) {
        return api.delete(`/api/ceil-section-measurement/${id}`)
    }
}
