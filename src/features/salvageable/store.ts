import { defineStore } from 'pinia'
import {
  SalvageableMaterialType,
  SalvageableMaterialUpdate,
  SalvageableMaterialObjectType,
} from './types'
import { ref, computed } from 'vue'

export const useSalvageableMaterialStore = defineStore('salvageable-materials-store', () => {
  const isInitialized = ref<boolean>(false)
  const salvageableMaterials = ref<SalvageableMaterialType[] | null>(null)
  const smId = ref<number | undefined>(undefined)
  const salvageableMaterialsObject = ref<SalvageableMaterialObjectType | null>(null)

  const usedSalvageableMaterials = computed(() => {
    if (salvageableMaterials.value) {
      return salvageableMaterials.value.filter((sm) => sm.isUse)
    } else {
      return []
    }
  })

  const unUsedSalvageableMaterials = computed(() => {
    if (salvageableMaterials.value) {
      return salvageableMaterials.value.filter((sm) => !sm.isUse)
    } else {
      return []
    }
  })

  return {
    salvageableMaterialsObject,
    salvageableMaterials,
    usedSalvageableMaterials,
    unUsedSalvageableMaterials,
    smId,
    isInitialized,
  }
})
