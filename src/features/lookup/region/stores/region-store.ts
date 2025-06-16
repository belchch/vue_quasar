import {defineLookupStore} from "src/features/lookup/base/store/lookup-store";
import {Spot} from "src/features/lookup/spot/stores/types";
import {Region} from "src/features/lookup/region/stores/types";

export const useRegionStore = defineLookupStore<Region>('regions')
