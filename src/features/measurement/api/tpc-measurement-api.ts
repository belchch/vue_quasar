import { api } from 'boot/axios'
import { Room } from './types'

export const tpcMeasurementApi = {
  getTpcMeasurements(inspectionId: number) {
    return api.get(`api/tpc/projects/${inspectionId}/measurements`)
  }
}
