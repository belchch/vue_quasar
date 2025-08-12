import { defineStore } from "pinia";
import { ref } from "vue";

export const useDocumentStore = defineStore('documents', () => {
    const actDocuments = ref<any[]>([])

    return {
        actDocuments
    }
})