import { api } from 'boot/axios'
import { TechnicalReport } from 'src/features/defect/stores/types'
import {
  TechnicalReportCreateRequest,
  TechnicalReportUpdateRequest,
} from 'src/features/defect/api/types'

export const TechnicalReportApi = {
  async getTechnicalReport(inspectionId: number) {
    return api.get<TechnicalReport | undefined>(`/api/inspections/${inspectionId}/technical-report`)
  },

  async createTechnicalReport(inspectionId: number, request: TechnicalReportCreateRequest) {
    return api.post<TechnicalReport>(`/api/inspections/${inspectionId}/technical-report`, request)
  },

  async updateTechnicalReport(inspectionId: number, request: TechnicalReportUpdateRequest) {
    return api.put<TechnicalReport>(`/api/inspections/${inspectionId}/technical-report`, request)
  },

  async deleteTechnicalReport(inspectionId: number) {
    return api.delete(`/api/inspections/${inspectionId}/technical-report`)
  }
}
