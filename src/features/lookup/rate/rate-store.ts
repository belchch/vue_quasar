import { defineStore, storeToRefs } from 'pinia'
import { api } from 'boot/axios'
import { Rate } from './types'
import { ref, computed } from 'vue'
import _ from 'lodash'

export const useRateStore = defineStore('rates-store', () => {
  const rates = ref<Rate[]>([])
  const loading = ref<boolean>(true)

  const requestLookup = async () => {
    loading.value = true
    const response = await api.get<Rate[]>('api/rates')
    if (response.status === 200) {
      rates.value = response.data
    }
    loading.value = false
  }
  const createRate = async (rate: Rate) => {
    const response = await api.post<Rate>('api/rates', rate)
    if (response.status === 200) {
      rates.value.push(response.data)
    }
  }
  const updateRate = async (rate: Rate) => {
    if (rate.boqWorkParams) {
      delete rate['boqWorkParams']
    }
    const response = await api.put<Rate>(`api/rates/${rate.id}`, rate)
    const find = rates.value.findIndex((r) => r.id == response.data.id)
    if (find >= 0) rates.value[find] = { ...response.data }
  }
  const deleteRate = async (id: number) => {
    await api.delete(`api/rates/${id}`)
    rates.value = rates.value.filter((rate) => {
      return rate.id != id
    })
    // await requestLookup();
  }
  const groupedByType = computed(() => {
    const grouped = _.groupBy(rates.value, 'boqWorkParamsType')
    return grouped
  })
  return {
    rates,
    groupedByType,
    loading,
    requestLookup,
    deleteRate,
    createRate,
    updateRate,
  }
})
