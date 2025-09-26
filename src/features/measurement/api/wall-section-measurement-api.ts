import {api} from 'boot/axios'
import { WallSectionMeasurement,SectionMeasurementCreate } from '../stores/types'



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
    create(request: SectionMeasurementCreate) {
      return api.post<WallSectionMeasurement>(`/api/wall-section-measurement`, request);
    },
    delete(id: number) {
        return api.delete(`/api/wall-section-measurement/${id}`)
    }
}
