<template>
  <div>
    <q-card-section class="q-pt-none">
      <q-select dense outlined v-model="params.dimension" :options="calcOptions" option-value="value"
        option-label="label" emit-value map-options label="Измерение для расчета" />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-select clearable dense outlined v-model="materialID" @update:model-value="changeMaterial"
        :options="materialStore.items" option-value="id" option-label="name" map-options label="Материал" />
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.hasSlopes" label="Наличие откосов" />
      <span v-if="params.hasSlopes === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.replacement" label="Замена окна" />
      <span v-if="params.replacement === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-toggle toggle-indeterminate v-model="params.preservation" label="Замена окна с сохранением" />
      <span v-if="params.preservation === null" class="text-blue-grey text-caption"> Не используется</span>    
    </q-card-section>  
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { DimensionType, DimensionEnum } from 'src/features/lookup/rate/types';
import { BoqWindow } from 'src/features/lookup/rate/types';
import { Material } from '../material/stores/types';
import { useMaterialStore } from '../material/stores/material-store';

const params = defineModel<BoqWindow>({ required: true });
const materialStore = useMaterialStore()

const calcOptions = computed(() => {
  return Object.keys(DimensionEnum).map(key => ({
    value: key as DimensionType,
    label: DimensionEnum[key as DimensionType]
  }));
});

const materialID = ref<Material | null>(null)

function changeMaterial(val:Material){
  params.value.material = val;
}

onMounted(async () => {
  if(params.value.material) materialID.value = params.value.material
  else materialID.value = null;
  await materialStore.requestLookup()
})
</script>

<style scoped>

</style>
