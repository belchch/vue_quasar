<template>
  <q-popup-edit v-if="canEdit" v-model="localValue" buttons v-slot="scope" @update:model-value="updateValue">
    <q-select dense outlined v-model="scope.value" emit-value map-options :options="optionItems" label="Материал" />
  </q-popup-edit>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { FloorSectionMeasurement } from '../stores/types';
import { useMeasurementService } from '../composables/measurement';
import _ from 'lodash';
import { useMaterialStore } from "src/features/lookup/material/stores/material-store";

const { updateFloorSectionMeasurement, updateCeilSectionMeasurement, updateWallSectionMeasurement } = useMeasurementService()
const materialStore = useMaterialStore()


const { value, row, canEdit = true, block, } = defineProps<{
    value: string | number | undefined,
    block: 'floor_section' | 'ceil_section' | 'wall_section',
    row: FloorSectionMeasurement,
    canEdit?: boolean
}>()
const localValue = ref(value)
const material = ref(value)

const optionItems = computed(() => {
  return materialStore.items.map(item => ({
    label: item.name,
    value: item.id!
  }))
})

const updateValue = async () => {
    const update = _.cloneDeep(row) as any
    update.material.id = localValue.value
    if(block === 'floor_section'){
      await updateFloorSectionMeasurement(update as FloorSectionMeasurement)
    }
    if(block === 'ceil_section'){
      await updateCeilSectionMeasurement(row.id,{
        ['materialId']: localValue.value as number
      })
    }
    if(block === 'wall_section'){
      await updateWallSectionMeasurement(row.id,{
        ['materialId']: localValue.value as number
      })
    }
}
</script>
