import {api} from 'boot/axios'
import { WallSectionMeasurement } from '../stores/types'



export const WallSectionsMeasurementApi = {
    getByInspectionId(inspectionId: number, roomId:number) {
        return api.get<WallSectionMeasurement[]>(`/api/wall-section-measurement`, {
            params: {
                inspectionId,
                roomId
            }
        })
    },
    delete(id: number) {
        return api.delete(`/api/wall-section-measurement/${id}`)
    }
}
