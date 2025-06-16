import {defineStore} from "pinia";
import {Case} from "src/features/case/stores/types";
import {ref} from "vue";

export const useSelectedCaseStore =  defineStore(`selected-case`, () => {
  const selectedCase = ref<Case>()
  const caseLoaded = ref(false)

  return {selectedCase, caseLoaded}
})
