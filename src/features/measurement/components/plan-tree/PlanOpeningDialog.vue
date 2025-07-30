<template>
  <q-dialog v-model="openModal">
    <q-card style="width: 100%;max-width: 500px;">
      <q-card-section class="row items-center">
        <div class="text-h6">Выбор материала</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="q-mb-md">{{ editingNode?.label }}</div>
        <q-select dense outlined v-model="material" :options="materialItems" label="Материал" />
      </q-card-section>
      <q-card-section class="q-pt-none">        
        <q-select dense outlined v-model="opening" :options="openingItems" label="Проем" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Сохранить" color="primary" v-close-popup @click="onSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { usePlanTreeService } from "../../composables/plan-tree";
import { storeToRefs } from "pinia";
import { usePlanTreeStore } from "../../stores/plan-tree-store";
import { useMaterialStore } from "src/features/lookup/material/stores/material-store";
import { useOpeningStore } from "src/features/lookup/opening/opening-store";
const openModal = defineModel<boolean>('open', { default: false });

const { editingNode } = storeToRefs(usePlanTreeStore())
const material = ref<{ label: string, value: number }>()
const opening = ref<{ label: string, value: number }>()
const { savePlanTree } = usePlanTreeService()
const materialStore = useMaterialStore()
const openingStore = useOpeningStore()

const onSave = async () => {
  const data = editingNode.value!.rawData
  data.materialId = material.value?.value
  data.openingId = opening.value?.value
  await savePlanTree()
}

const materialItems = computed(() => {
  return materialStore.items.map(item => ({
    label: item.name,
    value: item.id!
  }))
})

const openingItems = computed(() => {
  return openingStore.items.map(item => ({
    label: item.name,
    value: item.id!
  }))
})


onMounted(async () => {
  await openingStore.requestLookup()
})
</script>

<style scoped></style>
