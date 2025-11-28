<template>
  <div>
    <q-dialog v-model="openDialog">
      <q-card style="width: 100%; max-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ room.name }}. {{ labelCaption }}</div>
          ROOM:{{ roomNum }}
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-form @submit.prevent="onConfirmClick" ref="formRef">
          <q-card-section v-if="sectionType == 'fixed_asset'" class="q-pt-none">
            <div class="text-subtitle1 q-mb-sm">Наименование</div>
            <q-input
              outlined
              dense
              v-model="objectForm.name"
              label="Наименование"
              :rules="nameRules"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1 q-mb-sm">Материал</div>
            <q-select
              use-input
              dense
              outlined
              v-model="objectForm.material"
              :options="materialStore.items"
              label="Материал"
              option-label="name"
              option-value="id"
              :rules="materialRules"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1 q-mb-sm">Ширина</div>
            <q-input
              outlined
              dense
              v-model.number="objectForm.width"
              label="Ширина"
              :rules="widthRules"
            />
          </q-card-section>
          <q-card-section v-if="sectionType != 'wall_section'" class="q-pt-none">
            <div class="text-subtitle1 q-mb-sm">Длина</div>
            <q-input
              outlined
              dense
              v-model.number="objectForm.length"
              label="Длина"
              :rules="lengthRules"
            />
          </q-card-section>
          <q-card-section
            v-if="sectionType == 'wall_section' || sectionType == 'fixed_asset'"
            class="q-pt-none"
          >
            <div class="text-subtitle1 q-mb-sm">Высота</div>
            <q-input
              outlined
              dense
              v-model.number="objectForm.height"
              label="Высота"
              :rules="heightRules"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              label="Отмена"
              type="button"
              color="primary"
              v-close-popup
              flat
              class="q-ml-sm"
            />
            <q-btn label="Добавить" type="submit" color="primary" :loading="loading" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-btn @click="onOpenClick" icon="add" :label="btnText" color="secondary" size="sm" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Spot } from 'src/features/lookup/spot/stores/types'
import { Material } from 'src/features/lookup/material/stores/types'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import { useMeasurementService } from 'src/features/measurement/composables/measurement'
import { SectionMeasurementCreateRequest } from 'src/features/measurement/stores/types'
import { useInspectionsStore } from 'src/features/inspection/store/inspection-store'

const { selectedInspectionId } = storeToRefs(useInspectionsStore())

type FormData = {
  material?: Material
  name: string
  height: number
  width: number
  length: number
}

const materialStore = useMaterialStore()
const measurementService = useMeasurementService()

const formRef = ref()
const loading = ref(false)
const openDialog = ref(false)
const initialFormData: FormData = {
  name: '',
  height: 0,
  width: 0,
  length: 0,
}
const objectForm = ref<FormData>({ ...initialFormData })

const {
  btnText = 'Добавить',
  room,
  sectionType,
  roomNum,
} = defineProps<{
  btnText?: string
  room: Spot
  sectionType: 'floor_section' | 'ceil_section' | 'wall_section' | 'fixed_asset'
  roomNum: number | null
}>()

const labelCaption = computed(() => {
  switch (sectionType) {
    case 'floor_section':
      return 'Новая секция пола'
    case 'ceil_section':
      return 'Новая секция потолка'
    case 'wall_section':
      return 'Новая секция стены'
    case 'fixed_asset':
      return 'Конструктив'
    default:
      return 'Новая секция'
  }
})

// Правила валидации
const nameRules = [
  (val: string) =>
    sectionType !== 'fixed_asset' ||
    (val && val.trim().length > 0) ||
    'Поле обязательно для заполнения',
]

const requaredRules = (v: any) =>
  (v !== null && v !== undefined && v !== '') || 'Поле обязательно для заполнения'
const positiveRules = (v: number) => (!isNaN(v) && v > 0) || 'Должно быть положительным числом'

const materialRules = [
  (val: Material) =>
    sectionType === 'fixed_asset' ||
    (val !== null && val !== undefined) ||
    'Поле обязательно для заполнения',
]

const widthRules = [(val: number) => requaredRules(val), (val: number) => positiveRules(val)]

const heightRules = [
  (val: number) =>
    (sectionType !== 'wall_section' && sectionType !== 'fixed_asset') || requaredRules(val),
  (val: number) =>
    (sectionType !== 'wall_section' && sectionType !== 'fixed_asset') || positiveRules(val),
]

const lengthRules = [
  (val: number) => sectionType === 'wall_section' || requaredRules(val),
  (val: number) => sectionType === 'wall_section' || positiveRules(val),
]

// Методы
const onOpenClick = () => {
  openDialog.value = true
}
const onConfirmClick = async () => {
  try {
    loading.value = true
    if (sectionType === 'fixed_asset') {
      await measurementService.createFixedAssetMeasurement({
        inspectionId: selectedInspectionId.value!!,
        roomId: room.id!!,
        roomNum: roomNum ? roomNum : null,
        name: objectForm.value.name,
        materialId: objectForm.value.material?.id || null,
        width: objectForm.value.width,
        height: objectForm.value.height,
        length: objectForm.value.length,
      })
    }
    const request: SectionMeasurementCreateRequest = {
      inspectionId: selectedInspectionId.value!!,
      roomId: room.id!!,
      roomNum: roomNum ? roomNum : null,
      materialId: objectForm.value.material?.id || 0,
      width: objectForm.value.width,
      length: objectForm.value.length,
      height: objectForm.value.height,
    }
    if (sectionType === 'floor_section')
      await measurementService.createFloorSectionMeasurement(request)
    if (sectionType === 'ceil_section')
      await measurementService.createCeilSectionMeasurement(request)
    if (sectionType === 'wall_section')
      await measurementService.createWallSectionMeasurement(request)
    loading.value = false
    objectForm.value = { ...initialFormData }
    openDialog.value = false
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
