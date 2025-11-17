import { api } from 'boot/axios'

export const lookupApi = <Response, Request>(lookupName: string) => ({
  async getAllItems(withArchived = false) {
    return api.get<Response[]>(`/api/${lookupName}`, { params: { all: withArchived } })
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
  async restoreItem(id: number) {
    return api.put(`/api/${lookupName}/${id}/restore`)
  },
})
