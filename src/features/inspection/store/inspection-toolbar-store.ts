import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInspectionToolbarStore = defineStore('inspectionToolbar', () => {
  const isGrouped = ref(false)
  const isGroupedBy = ref('')
  const imageSize = ref(320)
  const photoDocCollapsed = ref(false)
  const gridStyle = ref({
    display: 'grid',
    'grid-template-columns': `repeat(auto-fill, minmax(${imageSize.value}px, 1fr))`,
    gap: '16px',
  })

  const updateGrid = () => {
    gridStyle.value['grid-template-columns'] =
      `repeat(auto-fill, minmax(${imageSize.value}px, 1fr))`
  }
  const processGrid = () => {
    gridStyle.value['grid-template-columns'] = `repeat(auto-fill, ${imageSize.value}px)`
  }

  return {
    isGrouped,
    isGroupedBy,
    imageSize,
    photoDocCollapsed,
    updateGrid,
    processGrid,
    gridStyle,
  }
})
