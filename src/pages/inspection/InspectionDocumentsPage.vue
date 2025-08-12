<template>
    <DocumentsComponent/>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import DocumentsComponent from 'src/features/documents/components/DocumentsComponent.vue';
import { useDocumentService } from 'src/features/documents/composables/documents';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { onMounted, watch } from 'vue';

const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const { requestDocuments } = useDocumentService()

watch(selectedInspectionId, async () => {
    await requestDocuments()
})

onMounted(async () => {
    await requestDocuments()
})
</script>