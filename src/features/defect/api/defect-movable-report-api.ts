import { api } from 'boot/axios'
import { DefectReportPhotoModel } from 'src/features/defect/stores/defect-report-types'
import { DefectMovableReportModel } from 'src/features/defect/stores/defect-movable-report-types'
import { FileInfo } from './types'

export const DefectMovableReportApi = {
  async buildMovableReport(inspectionId: number) {
    return api.post(
      `/api/movable-report/build`,
      {},
      {
        params: {
          inspectionId,
        },
      },
    )
  },

  async getMovableReport(inspectionId: number) {
    return api.get<DefectMovableReportModel>(`/api/movable-report`, {
      params: {
        inspectionId,
      },
    })
  },

  async moveMovable(objectId: number, fromIndex: number, toIndex: number) {
    return api.post(
      '/api/movable-report/move-object',
      {},
      {
        params: {
          objectId,
          fromIndex,
          toIndex,
        },
      },
    )
  },

  async moveMovableRow(rowId: number, fromIndex: number, toIndex: number) {
    return api.post(
      '/api/movable-report/move-row',
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
      '/api/movable-report/use-photo',
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

  // TODO: refactor
  buildMovableDocx(inspectionId: number) {
    return api.post<FileInfo>(
      `/api/movable-report/build-docx`,
      {},
      {
        params: {
          inspectionId,
        },
      },
    )
  },
}
