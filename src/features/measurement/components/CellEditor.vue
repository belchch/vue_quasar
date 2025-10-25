<template>
  {{ value }}
  <q-popup-edit v-if="canEdit" v-model="localValue" buttons v-slot="scope" @update:model-value="updateValue">
    <q-input type="number" v-model="scope.value" dense autofocus />
  </q-popup-edit>
  <q-icon v-if="canEdit" name="edit" class="edit-icon" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RoomMeasurement } from '../stores/types';
import { useMeasurementService } from '../composables/measurement';
import _ from 'lodash';

const { updateRoomMeasurement } = useMeasurementService()

const { field, value, row, canEdit = true } = defineProps<{
  field: string,
  value: number,
  row: RoomMeasurement,
  canEdit?: boolean
}>()

const localValue = ref(value)

const updateValue = async () => {
  const update = _.cloneDeep(row) as any
  update[field] = localValue.value
  await updateRoomMeasurement(update as RoomMeasurement)
}
</script>
<style scoped>
.edit-icon {
  opacity: var(--e-opacity-edit-icon);
  position: absolute;
  top: 2px;
  right: 2px;
}
</style>
