<template>
  <div>
    <q-card-section class="q-pt-none">
      <q-select dense outlined v-model="materialID" @update:model-value="changeMaterial" :options="materialStore.items"
        option-value="id" option-label="name" map-options label="Материал" />
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle v-model="params.materialReplacement" label="Замена материала" />
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle v-model="params.materialPreservation" label="Замена материала с сохранением" />
    </q-card-section>
    <q-card-section class="q-pt-none q-pb-none">
      <q-toggle v-model="params.screedLeveling" label="Выравнивание стяжки" />
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { BoqFloorSection } from 'src/features/lookup/rate/types';
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import { Material } from 'src/features/lookup/material/stores/types'
const materialStore = useMaterialStore()
const params = defineModel<BoqFloorSection>({ default: null });
const materialID = ref<Material | null>(null)

function changeMaterial(val:Material){
  console.log(val)
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
