<template>
  <q-dialog v-model="openModal">
    <q-card style="width: 100%;max-width: 500px;">
      <q-card-section class="row items-center">
        <div class="text-h6">Наименование</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="q-mb-md">{{ editingNode?.label }}</div>
        <q-input outlined dense v-model="objectName" label="Наименование" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Сохранить" color="primary" v-close-popup @click="onSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { usePlanTreeService } from "../../composables/plan-tree";
import { storeToRefs } from "pinia";
import { usePlanTreeStore } from "../../stores/plan-tree-store";
const openModal = defineModel<boolean>({ default: false });

const { editingNode } = storeToRefs(usePlanTreeStore())
const objectName = ref('')
const { savePlanTree } = usePlanTreeService()

watch(openModal,(newValue) => {
  if(newValue){
    if(editingNode.value){
      objectName.value = editingNode.value!.label
    }
  }
},{immediate: true })

const onSave = async () => {
  editingNode.value!.rawData.comment = objectName.value;
  await savePlanTree()
}



</script>

<style scoped></style>
