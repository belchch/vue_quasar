<template>
  <q-popup-edit v-if="canEdit" v-model="localValue" buttons v-slot="scope" @update:model-value="updateValue">
    <q-select dense outlined v-model="scope.value" emit-value map-options :options="optionItems" label="Материал" />
  </q-popup-edit>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { OpeningMeasurement } from '../stores/types';
import { useMeasurementService } from '../composables/measurement';
import _ from 'lodash';

const { updateOpeningMeasurement } = useMeasurementService()

const { field, value = 0, row, canEdit = true } = defineProps<{
    field: string,
    value: number | string | undefined ,
    row: OpeningMeasurement,
    canEdit?: boolean
}>()

const localValue = ref(value)
const optionItems = ref([{
  label: "Да",
  value: true,
},
{
  label: "Нет",
  value: false,
}
])
const updateValue = async () => {
    const update = _.cloneDeep(row) as any
    update[field] = localValue.value
    await updateOpeningMeasurement(row.id,update)
}
</script>
