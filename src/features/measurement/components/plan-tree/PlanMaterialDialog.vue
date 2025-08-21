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
        <q-select dense outlined v-model="material" :options="optionItems" label="Материал" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Сохранить" color="primary" v-close-popup @click="onSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { usePlanTreeService } from "../../composables/plan-tree";
import { storeToRefs } from "pinia";
import { usePlanTreeStore } from "../../stores/plan-tree-store";
import { useMaterialStore } from "src/features/lookup/material/stores/material-store";
const openModal = defineModel<boolean>({ default: false });

const { editingNode } = storeToRefs(usePlanTreeStore())
const material = ref<{ label: string, value: number } | undefined>(undefined)
const { savePlanTree } = usePlanTreeService()
const materialStore = useMaterialStore()

const onSave = async () => {
  editingNode.value!.rawData.materialId = material.value?.value
  await savePlanTree()
}

const optionItems = computed(() => {
  return materialStore.items.map(item => ({
    label: item.name,
    value: item.id!
  }))
})
watch(openModal, (newValue) => {
  if (newValue) {
    if (editingNode.value) {
      const id = editingNode.value.rawData.materialId;
      material.value = optionItems.value.find(item => item.value == id)
    }
  }
}, { immediate: true })
</script>

<style scoped></style>
