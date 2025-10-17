<template>
  <div class="text-center q-mt-md" v-if="rawMaterialStore.loading">
    <q-spinner color="primary" size="3em" :thickness="2" />
    <div class="q-mt-md">Загрузка...</div>
  </div>
  <div v-else class="q-pa-md">
    <RawMaterialTable />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRawMaterialStore } from 'src/features/lookup/raw-material/raw-material-store'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import { useUserStore } from 'src/features/user/stores/user-store'
import RawMaterialTable from 'src/features/lookup/components/raw-materials/RawMaterialTable.vue'

const rateStore = useRateStore()
const rawMaterialStore = useRawMaterialStore()
const { hasPermission } = useUserStore()

onMounted(async () => {
  await rawMaterialStore.requestLookup()
  await rateStore.requestLookup()
})
</script>
