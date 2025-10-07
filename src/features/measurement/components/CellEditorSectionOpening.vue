<template>
  <q-popup-edit v-if="canEdit" v-model="localValue" buttons v-slot="scope" @update:model-value="updateValue">
    <q-select dense outlined v-model="scope.value" emit-value map-options :options="optionItems" label="Проем" />
  </q-popup-edit>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { OpeningMeasurement } from '../stores/types';
import { useMeasurementService } from '../composables/measurement';
import _ from 'lodash';
import { useOpeningStore } from 'src/features/lookup/opening/opening-store';

const { updateOpeningMeasurement } = useMeasurementService()
const openingStore = useOpeningStore()


const { value, row, canEdit = true, } = defineProps<{
    value: string | number | undefined,
    row: OpeningMeasurement,
    canEdit?: boolean
}>()
const localValue = ref(value)

const optionItems = computed(() => {
  return openingStore.items.map(item => ({
    label: item.name,
    value: item.id!
  }))
})

const updateValue = async () => {
    const update = _.cloneDeep(row) as any
    update.opening.id = localValue.value
    await updateOpeningMeasurement(row.id,update);
}
</script>
