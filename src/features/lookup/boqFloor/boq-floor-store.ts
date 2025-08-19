import { defineLookupStore } from "../base/store/lookup-store";
import { BoqFloor } from "./types";

export const useBoqFloorStore = defineLookupStore<BoqFloor,BoqFloor>('boq/floor')
