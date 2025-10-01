<template>
  <q-dialog v-model="openModal">
    <q-card style="width: 100%;max-width: 500px;">
      <q-card-section class="row items-center">
        <div class="text-h6">Выбор локации</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="q-mb-md">{{ editingNode?.label }}</div>
        <q-select dense outlined v-model="locationModel" :options="optionItems" label="Локация" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Сохранить" color="primary" v-close-popup @click="onSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useInspectionSpotStore } from "src/features/inspection/store/inspection-spot-store";
import { usePlanTreeService } from "../../composables/plan-tree";
import { storeToRefs } from "pinia";
import { usePlanTreeStore } from "../../stores/plan-tree-store";
import { buildInspectionSpotOptions } from "src/features/inspection/composables/inspection-spot";
const openModal = defineModel<boolean>({ default: false });

const { inspectionSpots } = storeToRefs(useInspectionSpotStore())
const { editingNode } = storeToRefs(usePlanTreeStore())
const locationModel = ref<{ label: string, value: string } | undefined>(undefined)
const { savePlanTree } = usePlanTreeService()

const inspectionSpotOptions = computed(() => {
  return buildInspectionSpotOptions(inspectionSpots.value)
})

const onSave = async () => {
  const inspectionSpot = inspectionSpotOptions.value.find(item => item?.id == locationModel.value?.value)
  editingNode.value!.rawData.roomId = inspectionSpot?.spot.id
  editingNode.value!.rawData.roomNum = inspectionSpot?.spotNum
  await savePlanTree()
}

type SpotOption = {
  label: string,
  value: string
}
const optionItems = computed(() => {
  const items: SpotOption[] = [];
  inspectionSpotOptions.value.forEach((item) => {
    items.push({
      label: item.name,
      value: item.id
    });
  });
  return items;
})
watch(openModal, (newValue) => {
  if (newValue) {
    if (editingNode.value) {
      let locationId = editingNode.value.rawData.roomId;
      if (editingNode.value.rawData.roomNum) locationId += `_${editingNode.value.rawData.roomNum}`
      locationModel.value = optionItems.value.find(item => item.value == locationId)
    }
  }
}, { immediate: true })
</script>

<style scoped></style>
