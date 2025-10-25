<template>
  <GenericCrudTable
    title="Заливы"
    :columns="columns"
    :items="floodDamageStore.items"
    :formFields="formFields"
    :store="floodDamageStore"
    :edit-permission="hasPermission(['lookup.update'])"
    :add-permission="hasPermission(['lookup.update'])"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFloodDamageStore } from 'src/features/lookup/flood-damage/flood-damage-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'
import { useUserStore } from 'src/features/user/stores/user-store'

const floodDamageStore = useFloodDamageStore()
const { hasPermission } = useUserStore()

const columns = [
  {
    name: 'name',
    field: 'name',
    label: 'Описание',
    editable: true,
  },
]

const formFields = ref<Field[]>([
  {
    name: 'name',
    label: 'Описание',
    type: 'textarea' as const,
    required: true,
  },
])

onMounted(async () => {
  await floodDamageStore.requestLookup()
})
</script>
