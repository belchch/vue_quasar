import {defineLookupStore} from "src/features/lookup/base/store/lookup-store";
import {Flaw} from "src/features/defect/flaw/stores/types";

export const useFlawStore = defineLookupStore<Flaw, Flaw>('flaws')
