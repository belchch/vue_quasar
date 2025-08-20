<template>
  <q-dialog v-model="openModal">
    <q-card style="width: 100%;max-width: 850px;">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ isEditMode ? 'Редактирование' : 'Добавление' }} работы</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="row">
        <div class="col">
          <q-card-section class="q-pt-none">
            <div class="q-mb-md text-subtitle1">Общие параметры</div>
            <q-input outlined dense v-model="formData.name" label="Наименование" />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input outlined dense v-model="formData.price" label="Цена" />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-select dense outlined v-model="formData.unitOfMeasure" :options="unitOfMeasureOptions"
              option-value="value" option-label="label" emit-value map-options label="Еденицы измерени" />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input outlined dense v-model="formData.sourceUrl" label="Ссылка" />
          </q-card-section>
        </div>
        <div class="col">
          <q-card-section class="q-pt-none">
            <div class="q-mb-md text-subtitle1">Параметры ВОР</div>
            <q-select @update:model-value="changeParamsType" dense outlined v-model="formData.boqWorkParamsType"
              :options="typeParamsOptions" option-value="value" option-label="label" emit-value map-options
              label="Тип" />
          </q-card-section>
          <rate-floor-params v-if="formData.boqWorkParamsType == 'FLOOR'" v-model="floorParams" />
          <rate-floor-section-params v-if="formData.boqWorkParamsType == 'FLOOR_SECTION'"
            v-model="floorSectionParams" />
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn flat label="Сохранить" color="primary" :loading="loading" @click="onSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { Rate, UnitOfMeasureType, UnitOfMeasureEnum, ParamsTypeEnum, ParamsType, BoqFloor, BoqFloorSection, BoqFloorSectionUpdateRequest } from 'src/features/lookup/rate/types';
import RateFloorParams from './RateFloorParams.vue'
import { useRateStore } from 'src/features/lookup/rate/rate-store'
import RateFloorSectionParams from './RateFloorSectionParams.vue'
const rateStore = useRateStore()
const openModal = defineModel<boolean>({ default: false });
const { rate } = defineProps<{
  rate: Rate | null,
}>();
const defautObj: Rate = {
  name: '',
  sourceUrl: '',
  price: 0,
  unitOfMeasure: "SQUARE_METER",
  boqWorkParamsType: null,
}
const loading = ref(false);
const defaultFloorSectionParams:BoqFloorSection = {
  material: null,
  materialReplacement: false,
  materialPreservation: false,
  screedLeveling: false
}
const floorSectionParams = ref<BoqFloorSection>(defaultFloorSectionParams);
const floorSectionParamsUpdate = ref<BoqFloorSectionUpdateRequest>({
  materialId: undefined,
  materialReplacement: false,
  materialPreservation: false,
  screedLeveling: false
});
const unitOfMeasureOptions = computed(() => {
  return Object.keys(UnitOfMeasureEnum).map(key => ({
    value: key as UnitOfMeasureType,
    label: UnitOfMeasureEnum[key as UnitOfMeasureType]
  }));
});

const typeParamsOptions = computed(() => {
  const options:any = Object.keys(ParamsTypeEnum).map(key => ({
    value: key as ParamsType,
    label: ParamsTypeEnum[key as ParamsType]
  }));
  options.unshift({
    value: null,
    label: 'Без параметров',
  });
  return options
});

const isEditMode = computed(() => !!rate?.id);
const formData = ref<Rate>({...defautObj})

const defaultFloorParams:BoqFloor = {
  baseboardReplacement: false,
  baseboardPreservation: false
}
const floorParams = ref<BoqFloor>(defaultFloorParams);

watch(openModal, (newValue) => {
  if (newValue) {
    if (rate) {
      Object.assign(formData.value, rate);
      switch (rate.boqWorkParamsType) {
        case 'FLOOR':
          Object.assign(floorParams.value, rate.boqWorkParams);
          break;
        case 'FLOOR_SECTION':
          Object.assign(floorSectionParams.value, rate.boqWorkParams);
          break;
      }
    } else {
      Object.assign(formData.value,{...defautObj});
      if (formData.value.id) delete formData.value.id;
    }
  }
}, { immediate: true })
function changeParamsType(v:any){
  console.log(v)
  // if(v){
  //   formData.value.paramsType = v;
  // }
}
async function onSave() {
  switch (formData.value.boqWorkParamsType) {
    case 'FLOOR':
      formData.value.boqWorkParams = floorParams.value;
      if(formData.value.boqWorkParams['id']){delete formData.value.boqWorkParams.id}
      break;
    case 'FLOOR_SECTION':
      floorSectionParamsUpdate.value.materialReplacement = floorSectionParams.value.materialReplacement;
      floorSectionParamsUpdate.value.materialPreservation = floorSectionParams.value.materialPreservation;
      floorSectionParamsUpdate.value.screedLeveling = floorSectionParams.value.screedLeveling;
      if(floorSectionParams.value.material){
        floorSectionParamsUpdate.value.materialId = floorSectionParams.value.material.id;
        // floorSectionParamsUpdate.value = {
        //   materialId: floorSectionParams.value.material?.id,
        //   materialReplacement: floorSectionParams.value.materialReplacement,
        //   materialPreservation: floorSectionParams.value.materialPreservation,
        //   screedLeveling: floorSectionParams.value.screedLeveling
        // }
      } else {
        floorSectionParamsUpdate.value.materialId = null;
      }
      formData.value.boqWorkParams = {...floorSectionParamsUpdate.value};
      // console.log(formData.value.boqWorkParams)
      break;
    default:
      break;
  }
  loading.value = true;
  if (isEditMode.value) {
    try{
      await rateStore.updateRate(formData.value);
    }finally{
      loading.value = false
      openModal.value = false;
    }

  } else {
    try{
      await rateStore.createRate(formData.value)
    } finally{
      loading.value = false;
      openModal.value = false;
    }
    // console.log(formData.value);
  }
}

</script>
