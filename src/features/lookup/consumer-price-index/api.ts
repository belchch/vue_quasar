import { api } from 'src/boot/axios'
import { ConsumerPriceIndexItem, ConsumerPriceIndexItemRequest } from './types'
const LOOKUP_PATH = '/api/consumer-price-index'
export const ConsumerPriceIndexApi = {
  async getLookup() {
    const response = await api.get<ConsumerPriceIndexItem[]>(`${LOOKUP_PATH}`)
    return response.data
  },
  async getItemById(id: number) {
    try {
      const response = await api.get<ConsumerPriceIndexItem>(`${LOOKUP_PATH}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching item by ID:', error)
      throw error
    }
  },
  async addItem(item: ConsumerPriceIndexItemRequest) {
    try {
      const response = await api.post<ConsumerPriceIndexItem>(`${LOOKUP_PATH}`, item)
      return response.data
    } catch (error) {
      console.error('Error adding item:', error)
      throw error
    }
  },

  async deleteItem(id: number) {
    await api.delete(`${LOOKUP_PATH}/${id}`)
  },
  async updateItem(id: number, item: ConsumerPriceIndexItemRequest) {
    const response = await api.put<ConsumerPriceIndexItem>(`${LOOKUP_PATH}/${id}`, item)
    return response.data
  },
  async restoreItem(id: number) {
    try {
      await api.put(`${LOOKUP_PATH}/${id}/restore`)
    } catch (error) {
      console.error('Error restoring item:', error)
      throw error
    }
  },
}
