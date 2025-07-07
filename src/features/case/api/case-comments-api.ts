import { api } from "src/boot/axios"
import { CaseComment } from "../stores/types"

export const CaseCommentApi = {
  getCaseComments(caseId: number) {
    return api.get<CaseComment[]>(`/api/case/comments`, {
            params: {
                caseId
            }
          })
  },
  addCaseComment(caseComment: CaseComment) {
    return api.post<CaseComment>(`/api/case/comments`, {
        ...caseComment
    });
  },
  saveCaseComment(caseComment: CaseComment) {
      return api.put<CaseComment>(`/api/case/comments/${caseComment.id}`, caseComment)
  },

  deleteCaseComment(id: number) {
      return api.delete(`/api/case/comments/${id}`)
  }
}
