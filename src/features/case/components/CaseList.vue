<template>
  <q-list class="row q-gutter-y-md list shadow_custom rounded-borders" bordered>
    <CaseItem v-for="item in caseStore.cases" :key="item.id!!" :case="item" @select="selectCase(item)" />
  </q-list>
</template>
<script setup lang="ts">
import CaseItem from 'src/features/case/components/case-item/CaseItem.vue'
import { Case } from 'src/features/case/stores/types'
import { ref } from 'vue'
import { useCasesStore } from "src/features/case/stores/case-store";
import { useRouter } from "vue-router";
const caseStore = useCasesStore()
const router = useRouter()

const selectCase = async (cse: Case) => {
  await router.push(`/cases/${cse.id}/information`)
}

</script>
