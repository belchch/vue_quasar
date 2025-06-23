<template>
  <div class="q-py-sm q-px-none q-mt-md">
    <CaseSearchPanel />
  </div>
</template>
<script setup lang="ts">
import CaseSearchPanel from "src/features/case/components/CaseSearch.vue";
import { onMounted } from "vue";
import { useCases } from "src/features/case/composables/case";
import { useCasesStore } from "src/features/case/stores/case-store";
import { storeToRefs } from "pinia";

const caseService = useCases()
const {cases} = storeToRefs(useCasesStore())

onMounted(async () => {
  if (!cases.value?.length) {
    await caseService.requestCases({})
  }
})
</script>
