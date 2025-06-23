import { defineStore } from "pinia";
import { CaseQuestion } from "./types";
import { ref } from "vue";

export const useCaseQuestionsStore = defineStore('case-questions', () => {
    const caseQuestions = ref<CaseQuestion[]>([])

    return {caseQuestions}
})