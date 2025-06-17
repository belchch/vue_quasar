import { api } from 'boot/axios'
import type { Case } from 'src/features/case/stores/types'
import { CaseCreateRequest, CaseFilterRequest, CaseUpdateRequest } from 'src/features/case/api/types'

export const CaseApi = {
  async searchCases(filter: CaseFilterRequest) {
    return api.get<Case[]>('/api/cases', {
      params: filter,
    })
  },

  async getCase(caseId: number) {
    return api.get<Case>(`/api/cases/${caseId}`)
  },

  async createCase(request: CaseCreateRequest) {
    return api.post(`/api/cases`, request)
  },

  async updateCase(request: CaseUpdateRequest) {
    return api.put<Case>(`/api/cases/${request.id}`, request)
  }
}
