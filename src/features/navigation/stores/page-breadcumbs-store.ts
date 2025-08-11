import { defineStore } from "pinia";
import { BreadcrumbProps } from "./types";
import { ref } from "vue";

export const usePageBreadcrumbsStore = defineStore('page-breadcrumbs', () => {
    const pageBreadcrumbs = ref<BreadcrumbProps[]>([])

    return {
        pageBreadcrumbs
    }
})