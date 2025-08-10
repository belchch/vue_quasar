<template>
  <CaseLayout v-if="selectedCase" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSelectedCaseService } from 'src/features/case/composables/selected-case';
import { useSelectedCaseStore } from 'src/features/case/stores/selected-case-store';
import { useInspectionPageService } from 'src/features/inspection/composables/inspection-page';
import CaseLayout from 'src/layouts/CaseLayout.vue';
import { onBeforeUnmount, onMounted } from 'vue';

const props = defineProps<{
  caseId: number
}>()

const { selectedCase } = storeToRefs(useSelectedCaseStore())
const { selectCase, cleanCase } = useSelectedCaseService()
const inspectionPageService = useInspectionPageService()

onMounted(async () => {
  await selectCase(props.caseId)
})

onBeforeUnmount(() => {  
  cleanCase()  
  inspectionPageService.cleanPageStore()
})
</script>