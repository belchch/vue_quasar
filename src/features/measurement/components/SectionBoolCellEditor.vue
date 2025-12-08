<template>
  <div class="full-height flex items-center">
    {{ text }}
    <q-popup-edit
      v-if="canEdit && hasPermission(['measurement.update'])"
      v-model="localValue"
      buttons
      v-slot="scope"
      @update:model-value="updateValue"
    >
      <q-select
        dense
        outlined
        v-model="scope.value"
        emit-value
        map-options
        :options="optionItems"
      />
    </q-popup-edit>
    <q-icon name="edit" class="edit-icon" v-if="canEdit && hasPermission(['measurement.update'])" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import _ from 'lodash'
import { useUserStore } from 'src/features/user/stores/user-store'

const { hasPermission } = useUserStore()

const {
  field,
  value,
  row,
  canEdit = true,
  apiFn,
  text = '',
} = defineProps<{
  field: string
  value: boolean
  row: any
  apiFn: (id: number, updateRow: any) => Promise<void>
  canEdit?: boolean
  text?: string
}>()

const localValue = ref(value)
const optionItems = ref([
  {
    label: 'Да',
    value: true,
  },
  {
    label: 'Нет',
    value: false,
  },
])
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
