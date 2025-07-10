import { api } from "src/boot/axios"
import { CaseQuestion } from "../stores/types"
import { FileInfo } from "src/common/types"

export const CaseQuestionApi = {
    getCaseQuestions(caseId: number) {
        return api.get<CaseQuestion[]>(`/api/case/questions`, {
            params: {
                caseId
            }
        })
    },

    saveCaseQuestion(caseQuestion: CaseQuestion) {
        return api.post<CaseQuestion>(`/api/case/questions`, caseQuestion)
    },

    deleteCaseQuestion(id: number) {
        return api.delete(`/api/case/questions/${id}`)
    },

    downloadReport(caseId: number) {
        return api.post<FileInfo>(`/api/questions/build-docx`, {}, {
            params: {
                caseId
            }
        })
    }
}