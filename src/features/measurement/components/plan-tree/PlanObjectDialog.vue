<template>
  <q-dialog v-model="openModal" @show="onDialogShow">
    <q-card style="width: 100%; max-width: 500px">
      <q-card-section class="row items-center">
        <div class="text-h6">Редактирование</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="q-mb-md">{{ editingNode?.label }}</div>
        <q-input outlined dense v-model="objectName" label="Наименование" />
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="!editingNode?.rawData.movable">
        <q-select dense outlined v-model="material" :options="materialItems" label="Материал" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Сохранить" color="primary" v-close-popup @click="onSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePlanTreeService } from '../../composables/plan-tree'
import { storeToRefs } from 'pinia'
import { usePlanTreeStore } from '../../stores/plan-tree-store'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
const openModal = defineModel<boolean>({ default: false })

const { editingNode } = storeToRefs(usePlanTreeStore())
const objectName = ref('')
const { savePlanTree } = usePlanTreeService()
const materialStore = useMaterialStore()

const material = ref<{ label: string; value: number }>()

const materialItems = computed(() => {
  return materialStore.items.map((item) => ({
    label: item.name,
    value: item.id!,
  }))
})

const onDialogShow = () => {
  if (editingNode.value) {
    objectName.value = editingNode.value.label
    const materialId = editingNode.value.rawData.materialId
    material.value = materialItems.value.find((item) => item.value == materialId)
  }
}

const onSave = async () => {
  editingNode.value!.rawData.comment = objectName.value
  if (!editingNode.value?.rawData.movable) {
    editingNode.value!.rawData.materialId = material.value?.value || null
  }
  await savePlanTree()
}
</script>

<style scoped></style>
