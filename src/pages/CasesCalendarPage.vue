<template>
  <div class="q-py-sm q-px-md q-mt-md flex column" style="height: calc(100vh - 120px)">
    <CasesCalendar />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useCases } from 'src/features/case/composables/case'
import { useCasesStore } from 'src/features/case/stores/case-store'
import { storeToRefs } from 'pinia'
import CasesCalendar from 'src/features/calendar/CasesCalendar.vue'

const caseService = useCases()
const { cases } = storeToRefs(useCasesStore())

onMounted(async () => {
  if (!cases.value?.length) {
    await caseService.requestCases({})
  }
})
</script>
