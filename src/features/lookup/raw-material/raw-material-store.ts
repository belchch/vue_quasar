import { defineStore } from 'pinia'
import { lookupApi } from 'src/features/lookup/base/api/lookup-api'
import { RawMaterial, RawMaterialUpdateRequest } from './types'
import { ref } from 'vue'

export const useRawMaterialStore = defineStore('raw-materials-store', () => {
  const rawMaterials = ref<RawMaterial[]>([])
  const api = lookupApi<RawMaterial, RawMaterialUpdateRequest>('raw-materials')
  const loading = ref<boolean>(true)

  const requestLookup = async (withArchived: boolean = false) => {
    loading.value = true
    const response = await api.getAllItems(withArchived)
    if (response.status === 200) {
      rawMaterials.value = response.data
    }
    loading.value = false
  }
  const create = async (rawMaterial: RawMaterialUpdateRequest) => {
    const response = await api.createItem(rawMaterial)
    if (response.status === 200) {
      rawMaterials.value.push(response.data)
    }
  }
  const update = async (id: number, rawMaterial: RawMaterialUpdateRequest) => {
    const response = await api.updateItem(id, rawMaterial)
    const find = rawMaterials.value.findIndex((r) => r.id == response.data.id)
    if (find >= 0) rawMaterials.value[find] = { ...response.data }
  }
  const remove = async (id: number) => {
    await api.deleteItem(id)
    rawMaterials.value = rawMaterials.value.filter((item) => {
      return item.id != id
    })
  }

  const restoreItem = async (id: number) => {
    const response = await api.restoreItem(id)
    const find = rawMaterials.value.findIndex((r) => r.id == response.data.id)
    if (find >= 0) rawMaterials.value[find] = { ...response.data }
  }

  return {
    rawMaterials,
    loading,
    requestLookup,
    create,
    update,
    remove,
    restoreItem,
  }
})
