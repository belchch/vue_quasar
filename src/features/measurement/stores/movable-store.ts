import { defineStore, storeToRefs } from "pinia"
import _ from "lodash"
import { Movable, RoomMovable } from "./types"
import { computed, ref } from "vue"
import { useInspectionSpotStore } from "src/features/inspection/store/inspection-spot-store"
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"

export const useMovableStore = defineStore('movable-store', () => {
    const { inspectionSpots } = storeToRefs(useInspectionSpotStore())
    const { selectedInspectionId } = storeToRefs(useInspectionsStore())
    const movables = ref<Movable[]>([])
    
    const addItem = (item: Movable) => {
      movables.value.push(item);
    }
    const removeItemById = (id: number) => {
      movables.value = movables.value.filter(item => {
        return item.id != id;
      });
    }
    const groupedByRoom = computed(() => {
      const grouped = _.groupBy(movables.value, item => {
        return item.room.name;
      });
      return grouped
    })
    return { movables, addItem, groupedByRoom, removeItemById }
});
