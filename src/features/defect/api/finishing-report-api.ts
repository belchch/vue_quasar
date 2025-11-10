import { api } from 'boot/axios'
import {
  DefectReportPhotoModel,
  DefectReportModel,
} from 'src/features/defect/stores/defect-report-types'
// import { DefectMovableReportModel } from 'src/features/defect/stores/defect-movable-report-types'
import { FileInfo } from './types'

export const FinishingReportApi = {
  async buildFinishingReport(inspectionId: number) {
    return api.post(
      `/api/finishing-report/build`,
      {},
      {
        params: {
          inspectionId,
        },
      },
    )
  },

  async getFinishingReport(inspectionId: number) {
    return api.get<DefectReportModel>(`/api/finishing-report`, {
      params: {
        inspectionId,
      },
    })
  },

  async moveSpot(objectId: number, fromIndex: number, toIndex: number) {
    return api.post(
      '/api/finishing-report/move-spot',
      {},
      {
        params: {
          spotId: objectId,
          fromIndex,
          toIndex,
        },
      },
    )
  },

  async moveStructElem(objectId: number, fromIndex: number, toIndex: number) {
    return api.post(
      '/api/finishing-report/move-struct-elem',
      {},
      {
        params: {
          structElemId: objectId,
          fromIndex,
          toIndex,
        },
      },
    )
  },

  async moveRow(rowId: number, fromIndex: number, toIndex: number) {
    return api.post(
      '/api/finishing-report/move-row',
      {},
      {
        params: {
          rowId,
          fromIndex,
          toIndex,
        },
      },
    )
  },

  async usePhoto(photoId: number, use: boolean, scope: number) {
    return await api.post<DefectReportPhotoModel[]>(
      '/api/finishing-report/use-photo',
      {},
      {
        params: {
          photoId,
          use,
          scope,
        },
      },
    )
  },

  buildDocx(inspectionId: number) {
    return api.post<FileInfo>(
      `/api/finishing-report/build-docx`,
      {},
      {
        params: {
          inspectionId,
        },
      },
    )
  },
}
