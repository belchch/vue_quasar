import { api } from 'boot/axios'
import {DefectReportPhotoModel} from "src/features/defect/stores/defect-report-types";

export const DefectReportApi = {
  async buildReport(inspectionId: number, useTechnicalReport: boolean) {
    return api.post(`/api/defect-report/build`, {}, {
      params: {
        inspectionId, useTechnicalReport
      }
    })
  },

  async getReport(inspectionId: number) {
    return api.get<any>(`/api/defect-report`, {
      params: {
        inspectionId
      }
    })
  },

  async moveSpot(spotId: number, fromIndex: number, toIndex: number) {
    return api.post('/api/defect-report/move-spot', {}, {
      params: {
        spotId, fromIndex, toIndex
      }
    })
  },

  async moveStructElem(structElemId: number, fromIndex: number, toIndex: number) {
    return api.post('/api/defect-report/move-struct-elem', {}, {
      params: {
        structElemId, fromIndex, toIndex
      }
    })
  },

  async moveRow(rowId: number, fromIndex: number, toIndex: number) {
    return api.post('/api/defect-report/move-row', {}, {
      params: {
        rowId, fromIndex, toIndex
      }
    })
  },

  async usePhoto(photoId: number, use: boolean, scope: number) {
    return api.post<DefectReportPhotoModel[]>('/api/defect-report/use-photo', {}, {
      params: {
        photoId, use, scope
      }
    })
  }
}
