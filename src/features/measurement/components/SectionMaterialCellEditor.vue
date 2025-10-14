<template>
  <q-popup-edit v-if="canEdit" v-model="localValue" buttons v-slot="scope" @update:model-value="updateValue">
    <q-select dense outlined v-model="scope.value" emit-value map-options :options="optionItems" label="Материал" />
  </q-popup-edit>
  <q-icon name="edit" class="edit-icon" />
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import _ from 'lodash';
import { useMaterialStore } from "src/features/lookup/material/stores/material-store";

const materialStore = useMaterialStore()


const { value, row, canEdit = true, apiFn } = defineProps<{
  value: string | number | undefined,
  row: any,
  apiFn: (id: number, updateRow: any) => Promise<void>,
  canEdit?: boolean
}>()
const localValue = ref(value)

const optionItems = computed(() => {
  return materialStore.items.map(item => ({
    label: item.name,
    value: item.id!
  }))
})

const updateValue = async () => {
  const update = _.cloneDeep(row) as any
  update.material.id = localValue.value
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
