import { api } from 'boot/axios'

export const lookupApi = <T>(lookupName: string) => ({
  async getAllItems() {
    return api.get<T[]>(`/api/${lookupName}`)
  },

  async updateItem(id: number, item: T) {
    return api.put<T>(`/api/${lookupName}/${id}`, item)
  },

  async createItem(item: T) {
    return api.post<T>(`/api/${lookupName}`, item)
  },

  async deleteItem(id: number) {
    return api.delete(`/api/${lookupName}/${id}`)
  },
})
