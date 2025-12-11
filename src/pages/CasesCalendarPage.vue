<template>
  <div class="q-py-sm q-px-md q-mt-md flex column" style="height: calc(100vh - 120px)">
    <CasesCalendar />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useCases } from 'src/features/case/composables/case'
import { useCasesStore } from 'src/features/case/stores/case-store'
import { useCourtStore } from 'src/features/lookup/court/stores/court-store'
import { useJudgeStore } from 'src/features/lookup/judge/stores/judge-store'
import { useRegionStore } from 'src/features/lookup/region/stores/region-store'
import { useCompanyStore } from 'src/features/lookup/company/stores/compay-store'
import { storeToRefs } from 'pinia'
import CasesCalendar from 'src/features/calendar/CasesCalendar.vue'

const courtStore = useCourtStore()
const judgeStore = useJudgeStore()
const regionStore = useRegionStore()
const companyStore = useCompanyStore()

const caseService = useCases()
const { cases } = storeToRefs(useCasesStore())

onMounted(async () => {
  if (!cases.value?.length) {
    await caseService.requestCases({})
  }
  if (!courtStore.items.length) {
    await courtStore.requestLookup()
  }
  if (!judgeStore.items.length) {
    await judgeStore.requestLookup()
  }
  if (!regionStore.items.length) {
    await regionStore.requestLookup()
  }
  if (!companyStore.items.length) {
    await companyStore.requestLookup()
  }
})
</script>
