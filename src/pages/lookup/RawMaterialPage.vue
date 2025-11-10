<template>
  <div class="text-center q-mt-md" v-if="rawMaterialStore.loading">
    <q-spinner color="primary" size="3em" :thickness="2" />
    <div class="q-mt-md">Загрузка...</div>
  </div>
  <div v-else class="q-pa-md">
    <q-tabs v-model="tab" no-caps active-color="primary" align="left">
      <q-tab name="materials" label="Стройматериалы" />
      <q-tab name="prices" label="Работы и цены" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="materials">
        <RawMaterialTable />
      </q-tab-panel>
      <q-tab-panel name="prices">
        <RawMaterialEditTable />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRawMaterialStore } from 'src/features/lookup/raw-material/raw-material-store'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import { useUserStore } from 'src/features/user/stores/user-store'
import RawMaterialTable from 'src/features/lookup/components/raw-materials/RawMaterialTable.vue'
import RawMaterialEditTable from 'src/features/lookup/components/raw-materials/RawMaterialEditTable.vue'

const tab = ref('materials')
const rateStore = useRateStore()
const rawMaterialStore = useRawMaterialStore()
const { hasPermission } = useUserStore()

onMounted(async () => {
  await rawMaterialStore.requestLookup()
  await rateStore.requestLookup()
})
</script>
