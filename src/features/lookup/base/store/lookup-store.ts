import { defineStore } from 'pinia'
import { lookupApi } from 'src/features/lookup/base/api/lookup-api'
import { ref } from 'vue'

export const defineLookupStore = <Item, Request>(
  name: string,
  requestMappingFn: (item: Item) => Request | Item = (item: Item) => item,
) =>
  defineStore(name, () => {
    const items = ref<Item[]>([])
    const api = lookupApi<Item, Request>(name)

    const requestLookup = async (requestWithArchived: boolean = false) => {
      const response = await api.getAllItems(requestWithArchived)
      items.value = response.data
    }

    const deleteItem = async (id: number, requestWithArchived = false) => {
      await api.deleteItem(id)
      await requestLookup(requestWithArchived)
    }

    const addItem = async (item: Item, requestWithArchived = false) => {
      const request = requestMappingFn(item)
      await api.createItem(request)
      await requestLookup(requestWithArchived)
    }

    const updateItem = async (id: number, item: Item, requestWithArchived = false) => {
      const request = requestMappingFn(item)
      await api.updateItem(id, request)
      await requestLookup(requestWithArchived)
    }

    const restoreItem = async (id: number, requestWithArchived: boolean = false) => {
      await api.restoreItem(id)
      await requestLookup(requestWithArchived)
    }

    return { items, requestLookup, deleteItem, addItem, updateItem, restoreItem }
  })
