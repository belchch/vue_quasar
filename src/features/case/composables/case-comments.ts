import { CaseCommentApi } from "../api/case-comments-api";
import { storeToRefs } from "pinia"
import { useSelectedCaseStore } from "../stores/selected-case-store"
import { CaseComment } from "../stores/types"

export const useCaseCommentService = () => {
  const {selectedCase} = storeToRefs(useSelectedCaseStore())

  const requestCaseComments = async () => {
    const response = await CaseCommentApi.getCaseComments(selectedCase.value!.id!)
    return response.data;
  }

  const addCaseComment = async (commentText: string) => {
    const response = await CaseCommentApi.addCaseComment({
      text: commentText,
      caseId: selectedCase.value!.id!
    });
    return response.data;
  }
  const saveCaseComment = async (comment: CaseComment) => {
      const response = await CaseCommentApi.saveCaseComment(comment);
      return response.data;
  }
  const deleteCaseComment = async (id: number) => {
      const response = await CaseCommentApi.deleteCaseComment(id);
      return response.data;
  }
  return { requestCaseComments, addCaseComment, saveCaseComment, deleteCaseComment };
}
