<template>
    {{ value }}
    <q-popup-edit v-if="canEdit" v-model="localValue" buttons v-slot="scope" @update:model-value="updateValue">
        <q-input v-if="type==='number'" type="number" v-model="scope.value" dense autofocus />
        <q-input v-else type="text" v-model="scope.value" dense autofocus />
    </q-popup-edit>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RoomMeasurement, FloorSectionMeasurement, FixedAssetMeasurament } from '../stores/types';
import { useMeasurementService } from '../composables/measurement';
import _ from 'lodash';

const { updateFloorSectionMeasurement, updateFixedAssetMeasurement, updateCeilSectionMeasurement } = useMeasurementService()

const { field, value = 0, row, canEdit = true, block, type = 'number' } = defineProps<{
    field: string,
    value: number | string | undefined ,
    type?: 'number' | 'string',
    block: 'fixed' | 'floor_section' | 'ceil_section'
    row: FloorSectionMeasurement | FixedAssetMeasurament,
    canEdit?: boolean
}>()

const localValue = ref(value)

const updateValue = async () => {
    const update = _.cloneDeep(row) as any
    update[field] = localValue.value
    if(block === 'fixed'){
      await updateFixedAssetMeasurement(row.id,{
        ...row,
        [field]: localValue.value
      })
    }
    if(block === 'floor_section'){
      await updateFloorSectionMeasurement({
        ...row,
        [field]: localValue.value
      } as FloorSectionMeasurement)
    }
    if(block === 'ceil_section'){
      await updateCeilSectionMeasurement(row.id,{
        [field]: localValue.value
      })
    }
    // await updateFloorSectionMeasurement(update)
}
</script>
