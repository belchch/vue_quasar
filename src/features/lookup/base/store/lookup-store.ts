import { defineStore } from 'pinia'
import { lookupApi } from 'src/features/lookup/base/api/lookup-api'
import { ref } from 'vue'

export const defineLookupStore = <T>(name: string) =>
  defineStore(name, () => {
    const items = ref<T[]>([])
    const api = lookupApi<T>(name)

    const requestLookup = async () => {
      const response = await api.getAllItems()
      items.value = response.data
    }

    const deleteItem = async (id: number) => {
      await api.deleteItem(id)
      await requestLookup()
    }

    const addItem = async (item: T) => {
      await api.createItem(item)
      await requestLookup()
    }

    const updateItem = async (id: number, item: T) => {
      await api.updateItem(id, item)
      await requestLookup()
    }

    return { items, requestLookup, deleteItem, addItem, updateItem }
  })
