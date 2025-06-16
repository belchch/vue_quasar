import {api} from 'boot/axios'
import {DefectSearchRequest, DefectSearchResponse} from "src/features/inspection/api/types";

export const DefectSearchApi = {
  async search(request: DefectSearchRequest) {
    return api.post<DefectSearchResponse>(`/api/defects/search`, request)
  }
}
