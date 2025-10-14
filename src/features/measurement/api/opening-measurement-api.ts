import {api} from 'boot/axios'
import { OpeningMeasurement } from '../stores/types'
import { OpeningMeasurementUpdateRequest } from './types'


export const OpeningMeasurementApi = {
    getByInspectionId(inspectionId: number) {
        return api.get<OpeningMeasurement[]>(`/api/opening-measurements`, {
            params: {
                inspectionId
            }
        })
    },

    create(request: OpeningMeasurementUpdateRequest)  {
        return api.post<OpeningMeasurement>(`/api/opening-measurements`, request)
    },

    update(id: number, request: OpeningMeasurementUpdateRequest) {
        return api.put<OpeningMeasurement>(`/api/opening-measurements/${id}`, request)
    },

    delete(id: number) {
        return api.delete(`/api/opening-measurements/${id}`)
    }
}
