import { storeToRefs } from 'pinia'
import { useBoqStore } from 'src/features/boq/stores/boq-store'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'
import { SalvageableMaterialApi as api } from './api'
import { BoqApi } from 'src/features/boq/api/boq-api'
import { useSalvageableMaterialStore } from './store'
import { ConsumerPriceIndexItem } from 'src/features/lookup/consumer-price-index/types'
import { SalvageableMaterialUpdate } from './types'

export const useSalvageableService = () => {
  const { boq } = storeToRefs(useBoqStore())
  const { selectedInspectionId } = storeToRefs(useInspectionsStore())
  const { salvageableMaterials, smId, salvageableMaterialsObject, isInitialized } = storeToRefs(
    useSalvageableMaterialStore(),
  )

  const requestSalvageable = async () => {
    const response = await api.getSalvageableMaterialObject(selectedInspectionId.value!!)
    if (response === null || !response) {
      isInitialized.value = false
      smId.value = 0
      salvageableMaterialsObject.value = null
      // const response = await api.createSalvageableMaterial(selectedInspectionId.value!!)
      // smId.value = response.id
      // salvageableMaterialsObject.value = response
    } else {
      smId.value = response.id
      salvageableMaterialsObject.value = response
      isInitialized.value = true
    }
  }

  const setConsumerPriceIndex = async (item: ConsumerPriceIndexItem) => {
    if (!salvageableMaterialsObject.value?.id) {
      await requestSalvageable()
    }
    if (!salvageableMaterialsObject.value?.id) return
    const result = await api.putSalvageableMaterial(salvageableMaterialsObject.value?.id, item.id)
    if (result) {
      salvageableMaterialsObject.value = result
    } else salvageableMaterialsObject.value = null
  }

  const updateSalvageableMaterialRaw = async (id: number, item: SalvageableMaterialUpdate) => {
    const result = await api.updateSalvageableMaterialById(id, item)
    if (result && salvageableMaterials.value) {
      const findIndex = salvageableMaterials.value?.findIndex((sm) => sm.id === id)
      if (findIndex !== undefined && findIndex >= 0) {
        salvageableMaterials.value[findIndex] = result
        await requestSalvageable()
      }
    }
  }

  const requestSalvageableMaterials = async () => {
    try {
      if (salvageableMaterialsObject.value == null) {
        await requestSalvageable()
      }
      if (salvageableMaterialsObject.value !== null) {
        salvageableMaterials.value = await api.getSalvageableMaterialById(
          salvageableMaterialsObject.value.id,
        )
      }
    } catch (error) {
      console.error('Error fetching salvageable materials:', error)
      salvageableMaterials.value = null
    }
  }

  const initSalvageableMaterials = async (cpi: ConsumerPriceIndexItem) => {
    try {
      // if (!boq.value?.id) {
      //   const response = await BoqApi.getBoq(selectedInspectionId.value!)
      //   boq.value = response.data
      // }
      // if (salvageableMaterialsObject.value === null) {
      //   await requestSalvageable()
      // }
      const result = await api.initSalvageableMaterial(selectedInspectionId.value!, cpi.id)
      salvageableMaterials.value = result
      await requestSalvageable()
    } catch (error) {
      console.error('Error initializing salvageable materials:', error)
    }
  }

  return {
    requestSalvageable,
    requestSalvageableMaterials,
    initSalvageableMaterials,
    setConsumerPriceIndex,
    updateSalvageableMaterialRaw,
  }
}
