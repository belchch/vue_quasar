<template>
  <div class="q-pa-md">
    <q-tabs v-model="tab" no-caps active-color="primary" align="left">
      <q-tab name="works" label="Работы" />
      <q-tab name="prices" label="Цены" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="works">
        <RateCommonTable />
      </q-tab-panel>
      <q-tab-panel name="prices">
        <RateTable :rates="rateStore.rates" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import { useUserStore } from 'src/features/user/stores/user-store'
import RateTable from './RateTable.vue'
import RateCommonTable from 'src/features/lookup/components/rate/RateCommonTable.vue'
const rateStore = useRateStore()
const { hasPermission } = useUserStore()
const tab = ref('works')
onMounted(async () => {
  await rateStore.requestLookup()
})
</script>
<style scoped></style>
