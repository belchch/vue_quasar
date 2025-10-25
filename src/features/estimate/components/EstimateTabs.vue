<template>
  <div class="q-pt-sm">
    <q-card>
      <q-tabs v-model="tab" no-caps active-color="primary" align="left">
        <q-tab name="works" label="Смета работ" />
        <q-tab name="materials" label="Смета материалов" />
      </q-tabs>
      <q-tab-panels v-model="tab">
        <q-tab-panel name="works" class="q-pa-none">
          <EstimateWorksTable />
        </q-tab-panel>
        <q-tab-panel name="materials" class="q-pa-none">
          <EstimateMaterialsTable />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EstimateWorksTable from './EstimateWorksTable.vue'
import EstimateMaterialsTable from './EstimateMaterialsTable.vue'
import { onMounted } from 'vue'
import { useEstimateService } from 'src/features/estimate/composables/estimate-service'

const tab = ref('works')
const estimateService = useEstimateService()

onMounted(async () => {
  await estimateService.getEstimate()
})
</script>

<style scoped></style>
