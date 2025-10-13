import { api } from 'src/boot/axios'
import { Estimate, EstimateMaterial } from './types'

export const EstimateApi = {
  getEstimate: (inspectionId: number) => {
    return api.get<Estimate>('/api/estimate-report', {
      params: {
        inspectionId: inspectionId,
      },
    })
  },
  getEstimateMaterial: (inspectionId: number) => {
    return api.get<EstimateMaterial>('/api/stock-report', {
      params: {
        inspectionId: inspectionId,
      },
    })
  },
}
