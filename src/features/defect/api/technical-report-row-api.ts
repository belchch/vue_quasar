import { api } from 'boot/axios'
import { TechnicalReport, TechnicalReportRow } from 'src/features/defect/stores/types'
import { TechnicalReportRowUpdateRequest } from 'src/features/defect/api/types'

export const TechnicalReportRowApi = {
  async createTechnicalReportRow(inspectionId: number, request: TechnicalReportRowUpdateRequest) {
    return api.post<TechnicalReportRow>(`/api/inspections/${inspectionId}/technical-report-rows`, request)
  },

  async updateTechnicalReportRow(inspectionId: number, request: TechnicalReportRowUpdateRequest) {
    return api.put<TechnicalReport>(`/api/inspections/${inspectionId}/technical-report-rows/${request.id}`, request)
  },

  async deleteTechnicalReportRow(inspectionId: number, id: number) {
    return api.delete(`/api/inspections/${inspectionId}/technical-report-rows/${id}`)
  },
}
