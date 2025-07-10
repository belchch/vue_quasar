import { api } from "src/boot/axios"
import { FileInfo } from "src/common/types"

export const ReportApi = {
    downloadReport(caseId: number) {
        return api.post<FileInfo>(`/api/common-report/build-docx`, {}, {
            params: {
                caseId
            }
        })
    }
}