import { defineStore } from "pinia";
import { ref } from "vue";
import { Room, TreeItem } from "./types";

export const usePlanTreeStore = defineStore('plan-tree', () => {
    const planMeasurements = ref<any>()
    const treeData = ref<object[]>([])
    const editingNode = ref<TreeItem>()

    return {
        editingNode,
        treeData,
        planMeasurements
    }
})