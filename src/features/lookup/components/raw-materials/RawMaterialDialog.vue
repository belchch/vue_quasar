<template>
  <q-dialog v-model="openModal">
    <q-card style="width: 100%; max-width: 1000px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ isEditMode ? 'Редактирование' : 'Добавление' }} материала</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1 q-pb-sm">Общие параметры</div>
            <q-input outlined dense v-model="formData.name" label="Наименование" />
          </q-card-section>
          <div class="row">
            <div class="col">
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
            </div>
            <div class="col">
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
          </div>
          <q-card-section class="q-pt-none">
            <RawMaterialLinksTable
              v-model:links="formData.sources"
              :rows="rawMaterial?.sources || []"
            />
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section class="q-pt-none">
            <RawMaterialRateTable v-model:rates="formData.rates" />
          </q-card-section>
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
import { UnitOfMeasureType, UnitOfMeasureEnum } from 'src/features/lookup/rate/types'
import { useRawMaterialStore } from 'src/features/lookup/raw-material/raw-material-store'
import { RawMaterial } from '../../raw-material/types'
import RawMaterialLinksTable from './RawMaterialLinksTable.vue'
import RawMaterialRateTable from './RawMaterialRateTable.vue'

const rawMaterialStore = useRawMaterialStore()
const openModal = defineModel<boolean>({ default: false })
const { rawMaterial } = defineProps<{
  rawMaterial: RawMaterial
}>()
const defautObj: RawMaterial = {
  name: '',
  rates: [],
  sources: [],
  unitOfMeasure: 'SQUARE_METER',
  factor: null,
}
const loading = ref(false)

const unitOfMeasureOptions = computed(() => {
  return Object.keys(UnitOfMeasureEnum).map((key) => ({
    value: key as UnitOfMeasureType,
    label: UnitOfMeasureEnum[key as UnitOfMeasureType],
  }))
})
const numberOrEmptyRule = (val: any) => {
  if (val === '' || val === null || val === undefined) return true
  return !isNaN(Number(val)) || 'Введите число или оставьте поле пустым'
}

const isEditMode = computed(() => !!rawMaterial?.id)
const formData = ref<RawMaterial>({ ...defautObj })

// watch(
//   openModal,
//   (newValue) => {
//     formData.value = { ...defautObj }
//     if (newValue) {
//       if (rawMaterial) {
//         Object.assign(formData.value, rawMaterial)
//       } else {
//         Object.assign(formData.value, { ...defautObj })
//         if (formData.value.id) delete formData.value.id
//       }
//     }
//   },
//   { immediate: true },
// )
watch(
  openModal,
  (newValue) => {
    if (newValue && rawMaterial) {
      Object.assign(formData.value, rawMaterial)
    }
  },
  { immediate: true },
)
async function onSave() {
  loading.value = true
  const request = {
    ...formData.value,
    rates: formData.value.rates.map((item) => item.id!) || [],
  }
  if (isEditMode.value && formData.value) {
    try {
      await rawMaterialStore.update(formData.value.id!, request)
    } finally {
      loading.value = false
      openModal.value = false
    }
  } else {
    try {
      await rawMaterialStore.create(request)
    } finally {
      loading.value = false
      openModal.value = false
    }
  }
}
</script>
