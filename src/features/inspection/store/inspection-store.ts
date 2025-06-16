import {defineStore} from "pinia";
import {Inspection} from "src/features/inspection/store/types";
import {computed, ref, watch} from "vue";

export const useInspectionsStore = defineStore('inspections', () => {
  const inspections = ref<Inspection[]>([])
  const selectedInspectionId = ref<number | undefined>()

  const setInspections = (value: Inspection[]) => {
    inspections.value = value
  }

  const setSelectedInspectionId = (value: number | undefined) => {
    selectedInspectionId.value = value
  }

  const selectedInspection = computed(() => {
    return inspections.value.find(inspection => inspection.id == selectedInspectionId.value)
  })

  return {inspections, selectedInspectionId, selectedInspection, setInspections, setSelectedInspectionId}
})
