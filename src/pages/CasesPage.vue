<template>
  <div class="q-py-sm q-px-none q-mt-md">
    <CaseSearchPanel />
  </div>
</template>
<script setup lang="ts">
import CaseSearchPanel from "src/features/case/components/CaseSearch.vue";
import { onMounted } from "vue";
import { useCases } from "src/features/case/composables/case";

const caseService = useCases()

onMounted(async () => {
  await caseService.requestCases({})
})
</script>
