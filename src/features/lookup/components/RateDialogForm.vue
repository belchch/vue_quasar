<template>
  <q-dialog v-model="openModal">
    <q-card style="width: 100%; max-width: 850px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ isEditMode ? 'Редактирование' : 'Добавление' }} работы</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <div class="q-mb-sm text-subtitle1">Общие параметры</div>
            <div class="text-caption text-grey-8 q-mb-md">
              Средняя цена: <span class="text-black">{{ rate?.averagePrice || '-' }}</span>
            </div>
            <q-input outlined dense v-model="formData.name" label="Наименование" />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-select
              dense
              outlined
              v-model="formData.unitOfMeasure"
              :options="unitOfMeasureOptions"
              option-value="value"
              option-label="label"
              emit-value
              map-options
              label="Еденицы измерени"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              dense
              v-model="formData.factor"
              label="Коэффициент"
              :rules="[numberOrEmptyRule]"
            />
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section class="q-pt-none">
            <div class="q-mb-md text-subtitle1">Параметры ВОР</div>
            <q-select
              @update:model-value="changeParamsType"
              dense
              outlined
              v-model="formData.boqWorkParamsType"
              :options="typeParamsOptions"
              option-value="value"
              option-label="label"
              emit-value
              map-options
              label="Тип"
            />
          </q-card-section>
          <rate-floor-params v-if="formData.boqWorkParamsType == 'FLOOR'" v-model="floorParams" />
          <rate-floor-section-params
            v-if="formData.boqWorkParamsType == 'FLOOR_SECTION'"
            v-model="floorSectionParams"
          />
          <rate-ceil-params v-if="formData.boqWorkParamsType == 'CEIL'" v-model="ceilParams" />
          <rate-ceil-section-params
            v-if="formData.boqWorkParamsType == 'CEIL_SECTION'"
            v-model="ceilSectionParams"
          />
          <rate-door-params v-if="formData.boqWorkParamsType == 'DOOR'" v-model="doorParams" />
          <rate-window-params
            v-if="formData.boqWorkParamsType == 'WINDOW'"
            v-model="windowParams"
          />
          <rate-wall-section-params
            v-if="formData.boqWorkParamsType == 'WALL_SECTION'"
            v-model="wallSectionParams"
          />
          <rate-fixed-asset-params
            v-if="formData.boqWorkParamsType == 'FIXED_ASSET'"
            v-model="fixedAssetParams"
          />
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn flat label="Сохранить" color="primary" :loading="loading" @click="onSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  Rate,
  UnitOfMeasureType,
  UnitOfMeasureEnum,
  ParamsTypeEnum,
  ParamsType,
  BoqFloor,
  BoqFloorSection,
  BoqFloorSectionUpdateRequest,
  BoqCeil,
  BoqSectionBase,
  BoqDoor,
  BoqWindow,
  BoqWallSection,
  BoqFixedAssetParams,
} from 'src/features/lookup/rate/types'
import RateFloorParams from './RateFloorParams.vue'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import RateFloorSectionParams from './RateFloorSectionParams.vue'
import RateCeilParams from './RateCeilParams.vue'
import RateCeilSectionParams from './RateCeilSectionParams.vue'
import RateDoorParams from './RateDoorParams.vue'
import RateWindowParams from './RateWindowParams.vue'
import RateWallSectionParams from './RateWallSectionParams.vue'
import RateFixedAssetParams from './RateFixedAssetParams.vue'
const rateStore = useRateStore()
const openModal = defineModel<boolean>({ default: false })
const { rate } = defineProps<{
  rate: Rate | null
}>()
const defautObj: Rate = {
  name: '',
  sourceUrl: '',
  price: 0,
  unitOfMeasure: 'SQUARE_METER',
  boqWorkParamsType: null,
  factor: null,
}
const loading = ref(false)
const defaultFloorSectionParams: BoqFloorSection = {
  material: null,
  materialReplacement: null,
  materialPreservation: null,
  screedLeveling: null,
}
const defaultCeilSectionParams: BoqSectionBase = {
  material: null,
  materialReplacement: null,
  materialPreservation: null,
}
const defaultDoorParams: BoqDoor = {
  type: 'INTERIOR',
  hasSlopes: null,
  trimsReplacement: null,
  replacement: null,
  preservation: null,
  dimension: 'AREA',
}
const defaultWindowParams: BoqWindow = {
  hasSlopes: null,
  replacement: null,
  preservation: null,
  dimension: 'AREA',
}
const defaultWallSectionParams: BoqWallSection = {
  material: null,
  replacement: null,
  painting: null,
  plaster: null,
}

const defaultFixedAssetParams: BoqFixedAssetParams = {
  material: null,
  replacement: null,
  painting: null,
  plaster: null,
}

const floorSectionParams = ref<BoqFloorSection>(defaultFloorSectionParams)
const ceilSectionParams = ref<BoqSectionBase>({ ...defaultCeilSectionParams })
const doorParams = ref<BoqDoor>({ ...defaultDoorParams })
const windowParams = ref<BoqWindow>({ ...defaultWindowParams })
const wallSectionParams = ref<BoqWallSection>({ ...defaultWallSectionParams })
const floorSectionParamsUpdate = ref<BoqFloorSectionUpdateRequest>({
  materialId: undefined,
  materialReplacement: null,
  materialPreservation: null,
  screedLeveling: null,
})

const fixedAssetParams = ref<BoqFixedAssetParams>({ ...defaultFixedAssetParams })

const unitOfMeasureOptions = computed(() => {
  return Object.keys(UnitOfMeasureEnum).map((key) => ({
    value: key as UnitOfMeasureType,
    label: UnitOfMeasureEnum[key as UnitOfMeasureType],
  }))
})
const numberOrEmptyRule = (val: any) => {
  console.log(val)
  if (val === '' || val === null || val === undefined) return true
  return !isNaN(Number(val)) || 'Введите число или оставьте поле пустым'
}
const typeParamsOptions = computed(() => {
  const options: any = Object.keys(ParamsTypeEnum).map((key) => ({
    value: key as ParamsType,
    label: ParamsTypeEnum[key as ParamsType],
  }))
  options.unshift({
    value: null,
    label: 'Без параметров',
  })
  return options
})

const isEditMode = computed(() => !!rate?.id)
const formData = ref<Rate>({ ...defautObj })

const defaultFloorParams: BoqFloor = {
  baseboardReplacement: null,
  baseboardPreservation: null,
}
const defaultCeilParams: BoqCeil = {
  moldingPreservation: null,
  moldingReplacement: null,
}
const floorParams = ref<BoqFloor>(defaultFloorParams)
const ceilParams = ref<BoqCeil>({ ...defaultCeilParams })

watch(
  openModal,
  (newValue) => {
    formData.value = { ...defautObj }
    if (newValue) {
      if (rate) {
        Object.assign(formData.value, rate)
        switch (rate.boqWorkParamsType) {
          case 'FLOOR':
            Object.assign(floorParams.value, rate.boqWorkParams)
            break
          case 'CEIL':
            Object.assign(ceilParams.value, rate.boqWorkParams)
            break
          case 'FLOOR_SECTION':
            Object.assign(floorSectionParams.value, rate.boqWorkParams)
            break
          case 'CEIL_SECTION':
            Object.assign(ceilSectionParams.value, rate.boqWorkParams)
            break
          case 'DOOR':
            Object.assign(doorParams.value, rate.boqWorkParams)
            break
          case 'WINDOW':
            Object.assign(windowParams.value, rate.boqWorkParams)
            break
          case 'WALL_SECTION':
            Object.assign(wallSectionParams.value, rate.boqWorkParams)
            break
          case 'FIXED_ASSET':
            Object.assign(fixedAssetParams.value, rate.boqWorkParams)
            break
        }
      } else {
        Object.assign(formData.value, { ...defautObj })
        // Сбрасываем на дефолтные значения
        floorParams.value = { ...defaultFloorParams }
        ceilParams.value = { ...defaultCeilParams }
        floorSectionParams.value = { ...defaultFloorSectionParams }
        ceilSectionParams.value = { ...defaultCeilSectionParams }
        windowParams.value = { ...defaultWindowParams }
        wallSectionParams.value = { ...defaultWallSectionParams }
        fixedAssetParams.value = { ...defaultFixedAssetParams }
        if (formData.value.id) delete formData.value.id
      }
    }
  },
  { immediate: true },
)
function changeParamsType(v: any) {
  console.log(v)
  // if(v){
  //   formData.value.paramsType = v;
  // }
}
async function onSave() {
  if (!formData.value.factor) delete formData.value.factor
  switch (formData.value.boqWorkParamsType) {
    case 'FLOOR':
      formData.value.boqWorkParams = floorParams.value
      if (formData.value.boqWorkParams['id']) {
        delete formData.value.boqWorkParams.id
      }
      break
    case 'CEIL':
      formData.value.boqWorkParams = ceilParams.value
      if (formData.value.boqWorkParams['id']) {
        delete formData.value.boqWorkParams.id
      }
      break
    case 'FLOOR_SECTION':
      floorSectionParamsUpdate.value.materialReplacement =
        floorSectionParams.value.materialReplacement
      floorSectionParamsUpdate.value.materialPreservation =
        floorSectionParams.value.materialPreservation
      floorSectionParamsUpdate.value.screedLeveling = floorSectionParams.value.screedLeveling
      if (floorSectionParams.value.material) {
        floorSectionParamsUpdate.value.materialId = floorSectionParams.value.material.id
      } else {
        floorSectionParamsUpdate.value.materialId = null
      }
      formData.value.boqWorkParams = { ...floorSectionParamsUpdate.value }
      // console.log(formData.value.boqWorkParams)
      break
    case 'CEIL_SECTION':
      formData.value.boqWorkParams = {
        materialPreservation: ceilSectionParams.value.materialPreservation,
        materialReplacement: ceilSectionParams.value.materialReplacement,
        materialId: ceilSectionParams.value.material?.id || null,
      }
      break
    case 'DOOR':
      formData.value.boqWorkParams = {
        type: doorParams.value.type,
        hasSlopes: doorParams.value.hasSlopes,
        trimsReplacement: doorParams.value.trimsReplacement,
        replacement: doorParams.value.replacement,
        preservation: doorParams.value.preservation,
        dimension: doorParams.value.dimension,
      }
      break
    case 'WINDOW':
      formData.value.boqWorkParams = {
        hasSlopes: windowParams.value.hasSlopes,
        replacement: windowParams.value.replacement,
        preservation: windowParams.value.preservation,
        dimension: windowParams.value.dimension,
      }
      break
    case 'WALL_SECTION':
      formData.value.boqWorkParams = {
        materialId: wallSectionParams.value.material?.id || null,
        replacement: wallSectionParams.value.replacement,
        painting: wallSectionParams.value.painting,
        plaster: wallSectionParams.value.plaster,
      }
      break
    case 'FIXED_ASSET':
      formData.value.boqWorkParams = {
        materialId: fixedAssetParams.value.material?.id || null,
        replacement: fixedAssetParams.value.replacement,
        painting: fixedAssetParams.value.painting,
        plaster: fixedAssetParams.value.plaster,
      }
      break
    default:
      break
  }
  loading.value = true
  if (isEditMode.value) {
    try {
      await rateStore.updateRate(formData.value)
    } finally {
      loading.value = false
      openModal.value = false
    }
  } else {
    try {
      await rateStore.createRate(formData.value)
    } finally {
      loading.value = false
      openModal.value = false
    }
    // console.log(formData.value);
  }
}
</script>
