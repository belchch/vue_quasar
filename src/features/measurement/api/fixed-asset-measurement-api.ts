import { api } from 'boot/axios'
import { FixedAssetMeasurament } from '../stores/types'
import { FixedAssetCreateRequest, FixedAssetUpdateRequest } from './types'

export const FicedAssetMeasurementApi = {
  getByInspectionId(inspectionId: number) {
      return api.get<FixedAssetMeasurament[]>(`/api/fixed-asset-measurements`, {
          params: {
              inspectionId
          }
      })
  },
  create(request: FixedAssetCreateRequest) {
    return api.post<FixedAssetMeasurament>(`/api/fixed-asset-measurements`, request);
  },
  update(id: number, request: FixedAssetUpdateRequest) {
    return api.put<FixedAssetMeasurament>(`/api/fixed-asset-measurements/${id}`, request)
  },
  delete(id: number) {
    return api.delete(`/api/fixed-asset-measurements/${id}`);
  },

}
