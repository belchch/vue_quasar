import {api} from "boot/axios";
import {Inspection, PhotoDoc} from "src/features/inspection/store/types";
import {PhotoDocSearchRequest, PhotoDocUpdateRequest} from "src/features/inspection/api/types";

export const InspectionApi = {
  async getInspections(caseId?: number) {
    return api.get<Inspection[]>(`/api/inspections`, {
      params: {
        caseId
      }
    })
  },

  async searchPhotoDocs(inspectionId: number, searchRequest?: PhotoDocSearchRequest) {
    return api.get<PhotoDoc[]>(`/api/inspections/${inspectionId}/photo-docs`, {
      params: searchRequest
    })
  },

  async createPhotoDoc(inspectionId: number, photoDoc: PhotoDoc) {
    return api.post<PhotoDoc>(`/api/inspections/${inspectionId}/photo-docs`, photoDoc)
  },

  async updatePhotoDoc(inspectionId: number, photoDoc: PhotoDocUpdateRequest) {
    return api.put<PhotoDoc>(`/api/inspections/${inspectionId}/photo-docs/${photoDoc.id}`, photoDoc)
  },

  async deletePhotoDoc(inspectionId: number, photoDocId: number) {
    return api.delete(`/api/inspections/${inspectionId}/photo-docs/${photoDocId}`)
  },

  async generatePresignedUrls(inspectionId: number) {
    return api.post(`/api/inspections/${inspectionId}/photo-docs/generate-presigned-urls`)
  },

  async groupPhotoDocs(inspectionId: number, targetId: number, otherIds: number[]) {
    return api.post(`/api/inspections/${inspectionId}/photo-docs/group`, {
      targetId,
      otherIds
    })
  },

  async ungroupPhotoDoc(inspectionId: number, photoDocId: number) {
    return api.post(`/api/inspections/${inspectionId}/photo-docs/${photoDocId}/ungroup`)
  }
}
