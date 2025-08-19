<template>
  <GenericCrudTable title="Секции" :columns="columns" :items="rateStore.items" :formFields="formFields"
    :store="rateStore" :edit-permission="hasPermission(['lookup.update'])"
    :add-permission="hasPermission(['lookup.update'])" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStructElemStore } from 'src/features/lookup/struct-elem/stores/struct-elem-store'
import { useMaterialStore } from 'src/features/lookup/material/stores/material-store'
import GenericCrudTable from 'src/features/lookup/components/GenericCrudTable.vue'
import { Field } from 'src/features/lookup/base/store/types'
import { useBoqFloorStore } from 'src/features/lookup/boqFloor/boq-floor-store'
import { useUserStore } from "src/features/user/stores/user-store";

const rateStore = useBoqFloorStore()
const { hasPermission } = useUserStore()


const columns = [
  {
    name: 'baseboardReplacement',
    field: 'baseboardReplacement',
    label: 'Замена',
    editable: true
  },
];
const unitOptions = [
  { id: 'SQUARE_METER', name: 'SQUARE_METER' },
  { id: 'RUNNING_METER', name: 'RUNNING_METER' },
  { id: 'PIECE', name: 'PIECE' },
]
const formFields = computed((): Field[] => [
  {
    name: 'name',
    label: 'Название',
    type: 'text' as const,
    required: true,
  },
  {
    name: 'price',
    label: 'Цена',
    type: 'decimal' as const,
    required: true
  },
  {
    name: 'sourceUrl',
    label: 'Ссылка',
    type: 'text' as const,
    required: true
  },
  {
    name: 'unitOfMeasure',
    label: 'Ед.измерения',
    type: 'select' as const,
    required: true,
    options: unitOptions,
    selectValueField: 'id'
  },
])

const onAdd = () => {

}

const onUpdate = () => {

}

onMounted(async () => {
  await rateStore.requestLookup()
})
</script>
