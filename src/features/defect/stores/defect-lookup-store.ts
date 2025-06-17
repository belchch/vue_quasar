import { defineLookupStore } from 'src/features/lookup/base/store/lookup-store'
import { Defect, DefectUpdateRequest } from '../flaw/stores/types'

const requestMappingFn = (item: Defect): DefectUpdateRequest => {
    return {
        id: item.id!,
        template: item.template,
        structElemId: item.structElem.id!,
        materialId: item.material?.id,
        flawId: item.flaw?.id,
        standardId: item.standard?.id,
        hasValue: item.hasValue,
        hasCause: item.hasCause
    }
}

export const useDefectLookupStore = defineLookupStore<Defect, DefectUpdateRequest>('defects', requestMappingFn)
