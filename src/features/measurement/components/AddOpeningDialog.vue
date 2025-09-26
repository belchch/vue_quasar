<template>
  <q-dialog v-model="open" style="width: 100%">
    <q-card class="q-pa-lg" style="width: 900px; max-width: 100%">
      <q-card-section>
        <q-form ref="formRef" class="q-gutter-sm" @submit="submit">
          <div class="text-h6">{{ room.name }}. Добавить проем</div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Проем</div>
            <q-select use-input dense outlined v-model="formValues.opening" lazy-rules :options="openingStore.items"
              label="Проем" option-label="name" option-value="id" @update:model-value="onSelectOpening"
              :rules="[(value) => !_.isEmpty(value) || 'Обязательное поле']" />
          </div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Проем</div>
            <q-select use-input dense outlined v-model="formValues.material" lazy-rules :options="materialStore.items"
              label="Материал" option-label="name" option-value="id" />
          </div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Ширина</div>
            <q-input dense outlined v-model="formValues.width" lazy-rules label="Ширина" type="number" />
          </div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Высота</div>
            <q-input dense outlined v-model="formValues.height" lazy-rules label="Высота" type="number" />
          </div>
          <div class="row justify-between items-end">
            <div>
              <q-btn label="Сохранить" type="submit" color="primary" />
              <q-btn label="Отмена" @click="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-btn @click="doOpen" icon="add" color="secondary" size="sm" label="Проем" />
</template>
<script setup lang="ts">
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store';
import { useOpeningStore } from 'src/features/lookup/opening/opening-store';
import { OpeningMeasurement } from '../stores/types';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Spot } from 'src/features/lookup/spot/stores/types';
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store';
import { storeToRefs } from 'pinia';
import { Material } from 'src/features/lookup/material/stores/types';
import { Opening } from 'src/features/lookup/opening/types';
import _ from 'lodash'
import { useMeasurementService } from '../composables/measurement';
import { QForm } from 'quasar';
import { nextTick } from 'vue';

const props = defineProps<{
    room: Spot
}>()

const formRef = ref<QForm | null>(null)

const openingStore = useOpeningStore()
const materialStore = useMaterialStore()
const {selectedInspectionId} = storeToRefs(useInspectionsStore())
const open = ref(false)
const {createOpeningMeasurement} = useMeasurementService()

const requestLookups = async () => {
    await openingStore.requestLookup()
    await materialStore.requestLookup()
}

const doOpen = async () => {
    await requestLookups()
    open.value = true
}

type FormValues = {
    opening?: Opening,
    material?: Material,
    width?: number,
    height?: number,
}

const onSelectOpening = () => {
    const selected = formValues.value.opening
    formValues.value.width = selected?.width as number
    formValues.value.height = selected?.height as number
}

const formValues = ref<FormValues>({})

const reset = () => {
    formValues.value = {}
    open.value = false
}

const submit = async () => {
    const data = formValues.value

    await createOpeningMeasurement({
        roomId: props.room.id!,
        inspectionId: selectedInspectionId.value!,
        materialId: data.material?.id,
        openingId: data.opening!.id!,
        width: data.width!,
        height: data.height!,
    })

    formValues.value = {}
    open.value = false
}

</script>
