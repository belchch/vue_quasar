import { storeToRefs } from "pinia"
import { CaseQuestionApi } from "../api/case-questions-api"
import { useCaseQuestionsStore } from "../stores/case-questions-store"
import { useSelectedCaseStore } from "../stores/selected-case-store"
import { CaseQuestion } from "../stores/types"

export const useCaseQuestionService = () => {
    const {selectedCase} = storeToRefs(useSelectedCaseStore())
    const {caseQuestions} = storeToRefs(useCaseQuestionsStore())

    const requestCaseQuestions = async () => {
        const response = await CaseQuestionApi.getCaseQuestions(selectedCase.value!.id!)
        caseQuestions.value = response.data
    }

    const saveCaseQuestion = async (caseQuestion: CaseQuestion) => {
        await CaseQuestionApi.saveCaseQuestion(caseQuestion)
        await requestCaseQuestions()
    }

    const deleteCaseQuestion = async (id: number) => {
        await CaseQuestionApi.deleteCaseQuestion(id)
        await requestCaseQuestions()
    }

    return {requestCaseQuestions, saveCaseQuestion, deleteCaseQuestion}
}