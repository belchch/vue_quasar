import { defineLookupStore } from 'src/features/lookup/base/store/lookup-store'
import {Spot} from "src/features/lookup/spot/stores/types";
import {StructElem, StructElemUpdateRequest} from "src/features/lookup/struct-elem/stores/types";

const requestMappingFn = (item: StructElem): StructElemUpdateRequest => {
    return {
        id: item.id!!,
        name: item.name,
        materialIds: item.materials.map(item => item.id!!)
    }
}

export const useStructElemStore = defineLookupStore<StructElem, StructElemUpdateRequest>('struct-elems', requestMappingFn)
