<template>
  <div>
    <q-card-section class="q-pt-none">
      <q-select clearable dense outlined v-model="materialID" @update:model-value="changeMaterial"
        :options="materialStore.items" option-value="id" option-label="name" map-options label="Материал" />
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.replacement" label="Замена материала" />
      <span v-if="params.replacement ===null" class="text-blue-grey text-caption"> Не
        используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.painting" label="Окраска" />
      <span v-if="params.painting ===null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle toggle-indeterminate v-model="params.plaster" label="Штукатурка" />
      <span v-if="params.plaster === null" class="text-blue-grey text-caption"> Не используется</span>
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { BoqWallSection } from 'src/features/lookup/rate/types';
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import { Material } from 'src/features/lookup/material/stores/types'
const materialStore = useMaterialStore()
const params = defineModel<BoqWallSection>({ required: true });
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
