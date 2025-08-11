<template>
    <GeneralViewComponent />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import GeneralViewComponent from 'src/features/general-view/components/GeneralViewComponent.vue';
import { useGeneralViewGalleryService } from 'src/features/general-view/composables/gallery';
import { useGeneralViewReportService } from 'src/features/general-view/composables/general-view';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { onMounted, watch } from 'vue';

const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { requestGeneralViewReport } = useGeneralViewReportService()
const { requestGallery } = useGeneralViewGalleryService()

const requestData = async () => {
    await requestGeneralViewReport()
    await requestGallery()
}

watch(selectedInspectionId, async () => {
    await requestData()
})

onMounted(async () => {
    await requestData()
})
</script>