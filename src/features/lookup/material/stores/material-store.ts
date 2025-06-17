import { defineLookupStore } from 'src/features/lookup/base/store/lookup-store'
import {Material} from "src/features/lookup/material/stores/types";

export const useMaterialStore = defineLookupStore<Material, Material>('materials')
