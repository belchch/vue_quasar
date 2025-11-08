import { PhotoDocType } from "src/features/inspection/store/types"
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

    return {
        photoDocTypes
    }
}