import {defineLookupStore} from "src/features/lookup/base/store/lookup-store";
import {Standard} from "src/features/lookup/standard/stores/types";

export const useStandardStore = defineLookupStore<Standard, Standard>('standards')
