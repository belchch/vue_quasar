import { api } from 'boot/axios'

export const lookupApi = <Response, Request>(lookupName: string) => ({
  async getAllItems() {
    return api.get<Response[]>(`/api/${lookupName}`)
  },

  async updateItem(id: number, item: Request | Response) {
    return api.put<Response>(`/api/${lookupName}/${id}`, item)
  },

  async createItem(item: Request | Response) {
    return api.post<Response>(`/api/${lookupName}`, item)
  },

  async deleteItem(id: number) {
    return api.delete(`/api/${lookupName}/${id}`)
  },
})
