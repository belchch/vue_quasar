import { api } from 'src/boot/axios'
import {
  SalvageableMaterialType,
  SalvageableMaterialUpdate,
  SalvageableMaterialObjectType,
} from './types'
const PATH_API = '/api/salvageable-material/raw-materials'

export const SalvageableMaterialApi = {
  async createSalvageableMaterial(inspectionId: number) {
    const response = await api.post<SalvageableMaterialObjectType>(
      `/api/salvageable-material?inspectionId=${inspectionId}`,
    )
    return response.data
  },
  async getSalvageableMaterial(inspectionId: number) {
    try {
      const result = await api.get<SalvageableMaterialType[]>(`/api/salvageable-material`, {
        params: { inspectionId },
      })
      return result.data
    } catch (error) {
      console.error('Error fetching salvageable material:', error)
    }
  },
  async putSalvageableMaterial(id: number, consumerPriceIndex: number) {
    try {
      const result = await api.put<SalvageableMaterialObjectType>(
        `/api/salvageable-material/${id}`,
        {
          id,
          consumerPriceIndex,
        },
      )
      return result.data
    } catch (error) {
      console.error('Error fetching salvageable material:', error)
    }
  },
  async getSalvageableMaterialObject(inspectionId: number) {
    try {
      const result = await api.get<SalvageableMaterialObjectType>(`/api/salvageable-material`, {
        params: { inspectionId },
      })
      return result.data
    } catch (error) {
      console.error('Error fetching salvageable material:', error)
      throw error
    }
  },
  async getSalvageableMaterialById(id: number) {
    const result = await api.get<SalvageableMaterialType[]>(`${PATH_API}`, { params: { smId: id } })
    return result.data
  },
  async updateSalvageableMaterialById(id: number, data: SalvageableMaterialUpdate) {
    try {
      const result = await api.put<SalvageableMaterialType>(`${PATH_API}/${id}`, data)
      return result.data
    } catch (error) {
      console.error('Error updating salvageable material:', error)
      throw error
    }
  },
  async initSalvageableMaterial(boqId: number, smId: number, inspectionId: number) {
    try {
      const result = await api.get<SalvageableMaterialType[]>(`${PATH_API}/init`, {
        params: { boqId, smId },
      })
      return result.data
    } catch (error) {
      console.error('Error initializing salvageable material:', error)
      throw error
    }
  },
}
