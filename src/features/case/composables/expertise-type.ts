import { computed } from "vue"
import { useSelectedCaseStore } from "../stores/selected-case-store"

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
    const showFloods = computed(() => selectedCase?.expertiseType == 'FLOOD_DAMAGE')
    const showMovableReport = computed(() => selectedCase?.expertiseType == 'FLOOD_DAMAGE')
    const showFinishingReport = computed(() => selectedCase?.expertiseType == 'FLOOD_DAMAGE')

    return {
        photoDocTypes,
        showDefects,
        showFloods,
        showDefectsReport,
        showTechnicalReport,
        showMovableReport,
        showFinishingReport
    }
}