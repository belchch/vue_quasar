<template>
  <q-dialog v-model="openModal">
    <q-card style="width: 100%;max-width: 500px;">
      <q-card-section class="row items-center">
        <div class="text-h6">Новый объект</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-form @submit.prevent="onSubmit">
        <q-card-section class="q-pt-none">
          <div>Локация</div>
          <q-select dense outlined v-model="locationSelected" emit-value map-options option-label="name"
            option-value="id" :options="inspectionSpotOptions" label="Локация" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>Наименование</div>
          <q-input outlined dense label="Наименование" v-model.number="formObject.name" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>Высота</div>
          <q-input outlined dense label="Высота" v-model.number="formObject.height" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>Ширина</div>
          <q-input label="Ширина" outlined dense
            v-model.number="formObject.width" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>Длина</div>
          <q-input outlined dense label="Длина" v-model.number="formObject.length" />
        </q-card-section>
      </q-form>
      <q-card-actions align="right">
        <q-btn flat label="Добавить" color="primary" @click="onSubmit" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useInspectionSpotStore } from "src/features/inspection/store/inspection-spot-store";
import { buildInspectionSpotOptions } from "src/features/inspection/composables/inspection-spot";
import { useInspectionsStore } from "src/features/inspection/store/inspection-store"
import { useMovableSrvice } from '../../composables/movable';
import { MovableCreateRequest } from "../../api/types";
const openModal = defineModel<boolean>({ default: false });
const locationModel = ref<{ label: string, value: string } | undefined>(undefined)
const locationSelected = ref<string | undefined>('')
const formObject = ref<{ name:string, height: number | undefined, length: number | undefined, width: number | undefined}>({
  name: "",
  height: undefined,
  length: 0,
  width: undefined
})


const { inspectionSpots } = storeToRefs(useInspectionSpotStore())
const { createMovable } = useMovableSrvice()
const { selectedInspectionId } = storeToRefs(useInspectionsStore())
const inspectionSpotOptions = computed(() => {
  return buildInspectionSpotOptions(inspectionSpots.value)
})
const getSelectedLocation = () => {
  const selectedLocation = inspectionSpotOptions.value.find((location) => location.id === locationSelected.value)
  return selectedLocation
}
const onSubmit = async () => {
  const selectedLocation = getSelectedLocation();
  if (!selectedLocation) return;
  const request: MovableCreateRequest = {
    height: formObject.value.height!,
    length: formObject.value.length!,
    width: formObject.value.width!,
    roomId: selectedLocation.spot.id!,
    roomNum: selectedLocation.spotNum,
    inspectionId: selectedInspectionId.value!,
    name: formObject.value.name,
  }
  await createMovable(request);
}
</script>

<style scoped>

</style>
