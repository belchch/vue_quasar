<template>
  <div>
    <q-card-section class="q-pt-none">
      <q-select clearable dense outlined v-model="materialID" @update:model-value="changeMaterial"
        :options="materialStore.items" option-value="id" option-label="name" map-options label="Материал плинтуса" />
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.baseboardReplacement" label="Замена напольного плинтуса" />
      <span v-if="params.baseboardReplacement === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-toggle toggle-indeterminate v-model="params.baseboardPreservation" label="Замена плинтуса с сохранением" />
      <span v-if="params.baseboardPreservation === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { BoqFloor } from 'src/features/lookup/rate/types';
import { onMounted, ref } from 'vue';
import { useMaterialStore } from '../material/stores/material-store';
import { Material } from '../material/stores/types';

const materialStore = useMaterialStore()
const params = defineModel<BoqFloor>({ default: null });
const materialID = ref<Material | null>(null)

function changeMaterial(val: Material) {
  params.value.baseboardMaterial = val;
}

onMounted(async () => {
  if (params.value.baseboardMaterial) materialID.value = params.value.baseboardMaterial
  else materialID.value = null;
  await materialStore.requestLookup()
})

</script>

<style scoped></style>
