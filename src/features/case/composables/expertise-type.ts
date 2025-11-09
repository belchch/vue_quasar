import { PhotoDocType } from "src/features/inspection/store/types"
import { useSelectedCaseStore } from "../stores/selected-case-store"
import { computed } from "vue"

export const useExpertiseTypeService = () => {
    const sharedEquityPhotoDocTypes = ['GENERAL_VIEW', 'DEFECT']
    const floodDamagePhotoDocTypes = ['GENERAL_VIEW', 'MOVABLE', 'FINISHING']

    const { selectedCase } = useSelectedCaseStore()

    const photoDocTypes = () => {
        switch(selectedCase?.expertiseType) {
            case 'SHARED_EQUITY': return sharedEquityPhotoDocTypes;
            case 'FLOOD_DAMAGE': return floodDamagePhotoDocTypes;
            default: return []
        }
    }

    const showDefects = computed(() => selectedCase?.expertiseType == 'SHARED_EQUITY')
    const showDefectsReport = computed(() => selectedCase?.expertiseType == 'SHARED_EQUITY')
    const showTechnicalReport = computed(() => selectedCase?.expertiseType == 'SHARED_EQUITY')
    const showMovableReport = computed(() => selectedCase?.expertiseType == 'FLOOD_DAMAGE')
    const showFinishingReport = computed(() => selectedCase?.expertiseType == 'FLOOD_DAMAGE')

    return {
        photoDocTypes,
        showDefects,
        showDefectsReport,
        showTechnicalReport,
        showMovableReport,
        showFinishingReport
    }
}