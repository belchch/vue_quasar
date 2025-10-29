import { api } from 'boot/axios'
import { FixedAssetMeasurement } from '../stores/types'
import { FixedAssetCreateRequest, FixedAssetUpdateRequest, SectionMeasurementUpdateRequest } from './types'

export const FixedAssetMeasurementApi = {
  getByInspectionId(inspectionId: number) {
    return api.get<FixedAssetMeasurement[]>(`/api/fixed-asset-measurements`, {
      params: {
        inspectionId,
      },
    })
  },
  create(request: FixedAssetCreateRequest) {
    return api.post<FixedAssetMeasurement>(`/api/fixed-asset-measurements`, request)
  },
  update(id: number, request: SectionMeasurementUpdateRequest) {
    return api.put<FixedAssetMeasurement>(`/api/fixed-asset-measurements/${id}`, request)
  },
  delete(id: number) {
    return api.delete(`/api/fixed-asset-measurements/${id}`)
  },
}
