import { defineLookupStore } from 'src/features/lookup/base/store/lookup-store'
import {Spot} from "src/features/lookup/spot/stores/types";
import {StructElem} from "src/features/lookup/struct-elem/stores/types";

export const useStructElemStore = defineLookupStore<StructElem>('struct-elems')
