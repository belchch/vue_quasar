import { defineStore } from "pinia"
import { Estimate } from "../api/types"
import { ref, computed } from "vue"
import _ from "lodash";

const sortOrder = {
    'WALL': 1,
    'FLOOR': 2,
    'CEIL': 3,
    'INTERIOR_DOOR': 4,
    'ENTRANCE_DOOR': 5,
    'WINDOW': 6,
    'LOCATION_SUPPORTING': 7,
    'SUPPORTING': 8,
};

export const useEstimateStore = defineStore('estimate-work', () => {
    const estimate = ref<Estimate>()

    const processedEstimateGroups = computed(() => {
      const sortedArray = _.sortBy(estimate.value?.groups, item => {
          return sortOrder[item.type] || 999;
      });
      const filteredEmpty = sortedArray.filter(group => group.works?.length > 0)
      return filteredEmpty;
    })

    return {
        estimate,
        processedEstimateGroups
    }
})
