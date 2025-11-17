import { defineStore, storeToRefs } from 'pinia'
import { api } from 'boot/axios'
import { Rate } from './types'
import { ref, computed } from 'vue'
import _ from 'lodash'

export const useRateStore = defineStore('rates-store', () => {
  const rates = ref<Rate[]>([])
  const loading = ref<boolean>(true)

  const requestLookup = async (withArchived: boolean = false) => {
    loading.value = true
    const response = await api.get<Rate[]>('api/rates', { params: { all: withArchived } })
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
    const response = await api.put<Rate>(`api/rates/${rate.id}`, rate)
    updateItemInStore(response.data)
  }
  const updateRatePrice = async (rate: Rate) => {
    if (rate.boqWorkParams) {
      delete rate['boqWorkParams']
    }
    const response = await api.put<Rate>(`api/rates/${rate.id}`, rate)
    updateItemInStore(response.data)
  }

  const updateItemInStore = (rate: Rate) => {
    const find = rates.value.findIndex((r) => r.id == rate.id)
    if (find >= 0) rates.value[find] = { ...rate }
  }
  const deleteRate = async (id: number) => {
    await api.delete(`api/rates/${id}`)
    rates.value = rates.value.filter((rate) => {
      return rate.id != id
    })
  }
  const restoreRate = async (id: number) => {
    await api.put(`api/rates/${id}/restore`)
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
    updateRatePrice,
    restoreRate,
  }
})
