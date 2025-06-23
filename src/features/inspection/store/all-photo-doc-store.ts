import { defineStore } from "pinia";
import { PhotoDoc } from "./types";
import { ref } from "vue";

export const useAllPhotoDocStore = defineStore('all-photo-docs', () => {
    const allPhotoDocs = ref<PhotoDoc[]>([])
    
    return {
        allPhotoDocs
    }
})