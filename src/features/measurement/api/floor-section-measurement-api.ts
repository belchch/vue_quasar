import {api} from 'boot/axios'
import { FloorSectionMeasurement } from '../stores/types'



export const FloorSectionsMeasurementApi = {
    getByInspectionId(inspectionId: number, roomId:number) {
        return api.get<FloorSectionMeasurement[]>(`/api/floor-section-measurement`, {
            params: {
                inspectionId,
                roomId
            }
        })
    },
    delete(id: number) {
        return api.delete(`/api/floor-section-measurement/${id}`)
    }
}
