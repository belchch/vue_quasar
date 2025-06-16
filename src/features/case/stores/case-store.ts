import {defineStore} from "pinia";
import {ref} from "vue";
import type {Case} from "src/features/case/stores/types";

export const useCasesStore = defineStore('cases', () => {
  const cases = ref<Case[]>()

  const setCases = (value: Case[]) => {
    cases.value = value
  }

  return {cases, setCases}
})
