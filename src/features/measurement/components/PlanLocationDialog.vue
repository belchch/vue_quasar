<template>
  <q-dialog v-model="openModal">
    <q-card style="width: 100%;max-width: 500px;">
      <q-card-section class="row items-center">
        <div class="text-h6">Выбор локации</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="q-mb-md">{{ roomItem.label }}</div>
        <q-select dense outlined v-model="locationModel" :options="optionItems" label="Локация" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Сохранить" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import { useInspectionSpotStore } from "src/features/inspection/store/inspection-spot-store";
const openModal = defineModel<boolean>('open', { default: false });
const props = defineProps<{
  roomItem: any
}>();
const { inspectionSpots } = useInspectionSpotStore()
const locationModel = ref<number | undefined>(undefined)
type SpotOption = {
  label: string,
  value: number | undefined
}
const optionItems = computed(() => {
  const items:SpotOption[] = [];
  inspectionSpots.forEach((spot) => {
    if(!spot.inUse) return
    items.push({
      label: spot.spot.name,
      value: spot.id
    });
  });
  return items;
})

</script>

<style scoped>

</style>
