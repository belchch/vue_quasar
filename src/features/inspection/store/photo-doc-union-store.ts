import { defineStore } from 'pinia'
import { PhotoDoc } from 'src/features/inspection/store/types'
import { ref } from 'vue'

export const usePhotoDocsUnionStore = defineStore('photoDocsUnion', () => {
  const mainPhotoDoc = ref<PhotoDoc>()
  const isUnionMode = ref(false)
  const selectedIds = ref<number[]>([])

  const setMainPhotoDoc = (doc: PhotoDoc) => {
    mainPhotoDoc.value = doc
  }
  const isSelected = (doc: PhotoDoc) => {
    return selectedIds.value.includes(doc.id!)
  }
  const toggleSelect = (doc: PhotoDoc) => {
    console.log(2)
    const index = selectedIds.value.indexOf(doc.id!)
    if (index > -1) {
      selectedIds.value.splice(index, 1) // Удаляем если есть
    } else {
      selectedIds.value.push(doc.id!) // Добавляем если нет
    }
  }
  const resetUnion = () => {
    isUnionMode.value = false
    selectedIds.value = []
    mainPhotoDoc.value = undefined
  }

  return {
    mainPhotoDoc,
    isUnionMode,
    selectedIds,
    setMainPhotoDoc,
    isSelected,
    toggleSelect,
    resetUnion,
  }
})
