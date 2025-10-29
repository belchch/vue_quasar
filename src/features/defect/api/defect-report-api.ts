import { api } from 'boot/axios'
import {
  DefectReportPhotoModel,
  DefectMovableReportModel,
} from 'src/features/defect/stores/defect-report-types'
import { FileInfo } from './types'

export const DefectReportApi = {
  async buildReport(inspectionId: number, useTechnicalReport: boolean) {
    return api.post(
      `/api/defect-report/build`,
      {},
      {
        params: {
          inspectionId,
          useTechnicalReport,
        },
      },
    )
  },

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

  async getReport(inspectionId: number) {
    return api.get<any>(`/api/defect-report`, {
      params: {
        inspectionId,
      },
    })
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

  async moveSpot(spotId: number, fromIndex: number, toIndex: number) {
    return api.post(
      '/api/defect-report/move-spot',
      {},
      {
        params: {
          spotId,
          fromIndex,
          toIndex,
        },
      },
    )
  },

  async moveStructElem(structElemId: number, fromIndex: number, toIndex: number) {
    return api.post(
      '/api/defect-report/move-struct-elem',
      {},
      {
        params: {
          structElemId,
          fromIndex,
          toIndex,
        },
      },
    )
  },

  async moveRow(rowId: number, fromIndex: number, toIndex: number) {
    return api.post(
      '/api/defect-report/move-row',
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
    return api.post<DefectReportPhotoModel[]>(
      '/api/defect-report/use-photo',
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
      `/api/defect-report/build-docx`,
      {},
      {
        params: {
          inspectionId,
        },
      },
    )
  },

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
