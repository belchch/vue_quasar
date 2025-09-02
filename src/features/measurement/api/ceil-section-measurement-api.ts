import {api} from 'boot/axios'
import { CeilSectionMeasurement } from '../stores/types'



export const CeilSectionsMeasurementApi = {
    getByInspectionId(inspectionId: number, roomId:number) {
        return api.get<CeilSectionMeasurement[]>(`/api/ceil-section-measurement`, {
            params: {
                inspectionId,
                roomId
            }
        })
    },
    delete(id: number) {
        return api.delete(`/api/ceil-section-measurement/${id}`)
    }
}
