import { defineStore } from 'pinia'
import { ConsumerPriceIndexApi as api } from './api'
import { ConsumerPriceIndexItem, ConsumerPriceIndexItemRequest } from './types'
import _ from 'lodash'
import { ref, computed } from 'vue'

// TODO: remove
interface MonthlyData {
  id: number
  year: number
  month: number
  value: number
  isArchived: boolean
}

interface TableRow {
  year: number
  [month: number]: MonthlyData | null
}

export const useConsumerPriceIndexStore = defineStore('consumer-price-index-store', () => {
  const items = ref<ConsumerPriceIndexItem[]>([])
  const loading = ref(false)

  const fetchItems = async () => {
    loading.value = true
    items.value = await api.getLookup()
    loading.value = false
  }

  // Преобразование данных для таблицы
  const tableRows = computed(() => {
    const rows: TableRow[] = []
    const yearData = _.groupBy(items.value, 'year')
    // Для каждого года
    Object.keys(yearData).forEach((yearKey) => {
      const year = parseInt(yearKey)
      const monthData = yearData[yearKey]

      const row: TableRow = { year }

      // Инициализируем все месяцы как null
      for (let month = 1; month <= 12; month++) {
        row[month] = null
      }

      // Заполняем данные для существующих месяцев
      if (monthData?.length) {
        monthData.forEach((data) => {
          row[data.month] = data
        })
      }

      rows.push(row)
    })

    // Сортируем по году
    return rows.sort((a, b) => a.year - b.year)
  })

  const addItem = async (item: ConsumerPriceIndexItemRequest) => {
    const newItem = await api.addItem(item)
    if (newItem) {
      items.value.push(newItem)
    }
  }
  const deleteItem = async (id: number) => {
    try {
      await api.deleteItem(id)
      items.value = items.value.filter((item) => item.id !== id)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
  const updateItem = async (id: number, item: ConsumerPriceIndexItemRequest) => {
    try {
      const updatedItem = await api.updateItem(id, item)
      items.value = items.value.map((i) => (i.id === id ? updatedItem : i))
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  const restoreItem = async (id: number) => {
    try {
      await api.restoreItem(id)
      items.value = items.value.map((item) =>
        item.id === id ? { ...item, isArchived: false } : item,
      )
    } catch (error) {
      console.error('Error restoring item:', error)
    }
  }

  return { fetchItems, addItem, updateItem, restoreItem, deleteItem, items, loading, tableRows }
})
