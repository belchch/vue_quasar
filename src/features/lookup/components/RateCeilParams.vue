<template>
  <div>
    <q-card-section class="q-pt-none">
      <q-select clearable dense outlined v-model="materialID" @update:model-value="changeMaterial"
        :options="materialStore.items" option-value="id" option-label="name" map-options label="Материал плинтуса" />
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.moldingReplacement" label="Замена потолочного плинтуса" />
      <span v-if="params.moldingReplacement === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-toggle toggle-indeterminate v-model="params.moldingPreservation" label="Замена плинтуса с сохранением" />
      <span v-if="params.moldingPreservation === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { BoqCeil } from 'src/features/lookup/rate/types';
import { useMaterialStore } from '../material/stores/material-store';
import { Material } from '../material/stores/types';
import { onMounted, ref } from 'vue';
const params = defineModel<BoqCeil>({ default: null });

const materialStore = useMaterialStore()
const materialID = ref<Material | null>(null)

function changeMaterial(val: Material) {
  params.value.moldingMaterial = val;
}

onMounted(async () => {
  if (params.value.moldingMaterial) materialID.value = params.value.moldingMaterial
  else materialID.value = null;
  await materialStore.requestLookup()
})
</script>

<style scoped>

</style>
