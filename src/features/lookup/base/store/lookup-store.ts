import { defineStore } from 'pinia'
import { lookupApi } from 'src/features/lookup/base/api/lookup-api'
import { ref } from 'vue'

export const defineLookupStore = <Item, Request>(name: string, requestMappingFn: (item: Item) => Request | Item = (item: Item) => (item)) =>
  defineStore(name, () => {
    const items = ref<Item[]>([])
    const api = lookupApi<Item, Request>(name)

    const requestLookup = async () => {
      const response = await api.getAllItems()
      items.value = response.data
    }

    const deleteItem = async (id: number) => {
      await api.deleteItem(id)
      await requestLookup()
    }

    const addItem = async (item: Item) => {
      const request = requestMappingFn(item)
      await api.createItem(request)
      await requestLookup()
    }

    const updateItem = async (id: number, item: Item) => {
      const request = requestMappingFn(item)
      await api.updateItem(id, request)
      await requestLookup()
    }

    return { items, requestLookup, deleteItem, addItem, updateItem }
  })
