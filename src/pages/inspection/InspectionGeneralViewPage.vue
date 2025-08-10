<template>
    <GeneralViewComponent/>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import GeneralViewComponent from 'src/features/general-view/components/GeneralViewComponent.vue';
import { useGeneralViewGalleryService } from 'src/features/general-view/composables/gallery';
import { useGeneralViewReportService } from 'src/features/general-view/composables/general-view';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { watch } from 'vue';

const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { requestGeneralViewReport } = useGeneralViewReportService()
const { requestGallery } = useGeneralViewGalleryService()

watch(selectedInspectionId, async () => {
    await requestGeneralViewReport()
    await requestGallery()
})
</script>