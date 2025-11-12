import { computed } from "vue"
import { useSelectedCaseStore } from "../stores/selected-case-store"

export const useExpertiseTypeService = () => {
    const sharedEquityPhotoDocTypes = ['GENERAL_VIEW', 'DEFECT']
    const floodDamagePhotoDocTypes = ['GENERAL_VIEW', 'MOVABLE', 'FINISHING']

    const { selectedCase } = useSelectedCaseStore()

    const photoDocTypes = () => {
        switch(selectedCase?.expertiseType) {
            case 'SHARED_EQUITY': return sharedEquityPhotoDocTypes; 
            case 'CONSTRUCTION': return sharedEquityPhotoDocTypes; 
            case 'FLOOD_DAMAGE': return floodDamagePhotoDocTypes;
            default: return []
        }
    }

    const checkGroup1 = (value: string | undefined) => {
        return value == 'SHARED_EQUITY' || value == 'CONSTRUCTION'
    }

    const showDefects = computed(() => checkGroup1(selectedCase?.expertiseType))
    const showDefectsReport = computed(() => checkGroup1(selectedCase?.expertiseType))
    const showTechnicalReport = computed(() => checkGroup1(selectedCase?.expertiseType))
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