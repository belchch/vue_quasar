<template>
    {{ props.value }}
    <q-popup-edit v-model="localValue" buttons v-slot="scope" @update:model-value="updateValue">
        <q-input type="number" v-model="scope.value" dense autofocus />
    </q-popup-edit>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RoomMeasurement } from '../stores/types';
import { useMeasurementService } from '../composables/measurement';
import _ from 'lodash';

const {updateRoomMeasurement} = useMeasurementService()

const props = defineProps<{
    field: string,
    value: number,
    row: RoomMeasurement
}>()

const localValue = ref(props.value)

const updateValue = async () => {
    const update = _.cloneDeep(props.row) as any
    update[props.field] = localValue.value
    await updateRoomMeasurement(update as RoomMeasurement)
}
</script>