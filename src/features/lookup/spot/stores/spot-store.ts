import { defineLookupStore } from 'src/features/lookup/base/store/lookup-store'
import {Spot} from "src/features/lookup/spot/stores/types";

export const useSpotStore = defineLookupStore<Spot>('spots')
