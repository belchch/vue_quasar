import { storeToRefs } from "pinia"
import { useCasesStore } from "src/features/case/stores/case-store"

export const useCommonService = () => {
    const { cases } = storeToRefs(useCasesStore())

    const cleanAll = () => {
        cases.value = undefined
    }

    return { cleanAll }
}