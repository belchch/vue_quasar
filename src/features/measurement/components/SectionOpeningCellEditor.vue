<template>
  <div class="full-height flex items-center">
    {{ name }}
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
        label="Проем"
      />
    </q-popup-edit>
    <q-icon name="edit" class="edit-icon" v-if="canEdit && hasPermission(['measurement.update'])" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import _ from 'lodash'
import { useOpeningStore } from 'src/features/lookup/opening/opening-store'
import { useUserStore } from 'src/features/user/stores/user-store'

const { hasPermission } = useUserStore()

const openingStore = useOpeningStore()

const {
  value,
  row,
  canEdit = true,
  apiFn,
  name = '',
} = defineProps<{
  value: string | number | undefined
  row: any
  apiFn: (id: number, updateRow: any) => Promise<void>
  canEdit?: boolean
  name?: string
}>()
const localValue = ref(value)

const optionItems = computed(() => {
  return openingStore.items.map((item) => ({
    label: item.name,
    value: item.id!,
  }))
})

const updateValue = async () => {
  const update = _.cloneDeep(row) as any
  update.opening.id = localValue.value
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
