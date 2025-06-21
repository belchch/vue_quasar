import { api } from 'boot/axios'
import { GeneralViewReport, GeneralViewReportGalleryGroup } from '../store/types'
import { FileInfo } from 'src/common/types'

export const GeneralViewReportApi = {
    buildReport: (inspectionId: number) => {
        return api.post(`/api/general-view-report/build`, {}, {
            params: {
                inspectionId
            }
        })
    },

    updateReport(request: GeneralViewReport) {
        return api.put<GeneralViewReport>(`/api/general-view-report`, request)
    },

    getReport(inspectionId: number) {
        return api.get<GeneralViewReport>(`/api/general-view-report`, {
            params: {
                inspectionId
            }
        })
    },

    getGallery(inspectionId: number) {
        return api.get<GeneralViewReportGalleryGroup[]>(`/api/general-view-report/gallery`, {
            params: {
                inspectionId
            }
        })
    },

    buildDocx(inspectionId: number) {
        return api.post<FileInfo>(`/api/general-view-report/build-docx`, {}, {
            params: {
                inspectionId
            }
        })
    }
}