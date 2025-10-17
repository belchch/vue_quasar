<template>
  {{ value }}
  <q-popup-edit v-if="canEdit" v-model="localValue" buttons v-slot="scope" @update:model-value="updateValue">
    <q-input v-if="type === 'number'" type="number" v-model="scope.value" dense autofocus />
    <q-input v-else type="text" v-model="scope.value" dense autofocus />
  </q-popup-edit>
  <q-icon name="edit" class="edit-icon" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { FloorSectionMeasurement, FixedAssetMeasurament, OpeningMeasurement, CeilSectionMeasurement, WallSectionMeasurement } from '../stores/types';
import _ from 'lodash';

type RowsType = FloorSectionMeasurement | OpeningMeasurement | FixedAssetMeasurament | CeilSectionMeasurement | WallSectionMeasurement

const { field, value = 0, row, canEdit = true, type = 'number', apiFn } = defineProps<{
  field: string,
  value: number | string | undefined,
  type?: 'number' | 'string',
  row: RowsType,
  apiFn: (id: number, updateRow: any) => Promise<void>,
  canEdit?: boolean
}>()

const localValue = ref(value)

const updateValue = async () => {
  const update = _.cloneDeep(row) as any
  update[field] = localValue.value
  await apiFn(row.id, update)
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
