import { api } from 'boot/axios'
import { Room } from './types'

export const tpcMeasurementApi = {
  getTpcMeasurements(inspectionId: number) {
    return api.get(`api/tpc/projects/${inspectionId}/measurements`)  
  },

  saveTpcMeasurements(inspectionId: number, measurements: any) {
    return api.post(`/api/tpc/projects/${inspectionId}/measurements`, measurements)
  },

  propagateTpcMeasurements(inspectionId: number) {
    return api.post(`/api/tpc/projects/${inspectionId}/measurements/propagate`)
  }
}
