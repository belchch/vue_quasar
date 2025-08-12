import { api } from "src/boot/axios"
import { FileInfo } from "src/common/types"

export const ReportApi = {
    downloadReport(inspectionId: number) {
        return api.post<FileInfo>(`/api/common-report/build-docx`, {}, {
            params: {
                inspectionId
            }
        })
    }
}