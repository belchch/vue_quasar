<template>
  <q-popup-edit v-if="canEdit" v-model="localValue" buttons v-slot="scope" @update:model-value="updateValue">
    <q-select dense outlined v-model="scope.value" emit-value map-options :options="optionItems" />
  </q-popup-edit>
  <q-icon name="edit" class="edit-icon" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import _ from 'lodash';

const { field, value, row, canEdit = true, apiFn } = defineProps<{
  field: string,
  value: boolean,
  row: any,
  apiFn: (id: number, updateRow: any) => Promise<void>,
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
  await apiFn(row.id, update)
}
</script>
<style scoped>
.edit-icon {
  opacity: .5;
  position: absolute;
  top: 2px;
  right: 2px;
}
</style>
