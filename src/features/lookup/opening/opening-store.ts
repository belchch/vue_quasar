import { defineLookupStore } from "../base/store/lookup-store";
import { Opening, OpeningTypeOption } from "./types";

const requestMappingFn = (opening: Opening) => {
    return {
        ...opening,
        type: typeof opening.type === 'string' ? opening.type : opening.type.id
    }
}

export const useOpeningStore = defineLookupStore('openings', requestMappingFn)